const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const sse = require("easy-server-sent-events");

// DB
const MongoStore = require("connect-mongo")(session);
const settings = require("./config/settings.json");
const connectToDb = require("./config/db");

// Routes
const userRoutes = require("./api/userRoutes");
const loginRoutes = require("./api/loginRoutes");

// ACL
const aclRules = require("./config/acl-rules.json");
const acl = require("./middleware/acl");

//Cron
const cron = require("node-cron");
const Link = require("./schemas/Link");

connectToDb();

const app = express();

app.use(bodyParser.json());

global.salt = settings.salt;

app.use(
  session({
    secret: settings.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: global.db
    })
  })
);

const options = {
  endpoint: "/api/sse",
  script: "/sse.js"
};

const { SSE, send } = sse(options);
app.use(SSE);
global.sendSSE = send;

app.use(acl(aclRules));

app.use(userRoutes, loginRoutes);

cron.schedule("* * * * *", async function() {
  let allLinks = await Link.find();
  allLinks.map(link => {
    if (Date.now() - 3600000 > link.time && link.type === "reset") {
      link.delete();
    }
  });
});

app.listen(5000, () => console.log(`Examensarbete Server is on port 5000`));

// if on server serve static build files
if (__dirname === "/var/www/bokningssida-api") {
  app.use(express.static(path.resolve(__dirname, "../bokningssida/build")));
  app.get("/*", function(req, res) {
    res.sendFile(
      path.resolve(__dirname, "../bokningssida/build/index.html"),
      function(err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
  console.log("I am the server. I serve a static build!");
}
