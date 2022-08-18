const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./models");
const dbConfig = require("./config/db.config");
const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse request od content-type - application/json
app.use(bodyParser.json());
// parse request of content - application/x-www-form-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// simple route
app.get("/" , (request, response) => {
    response.json({message: "welcome to backend API's"})
})


const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        });
        new Role({
            name: "moderator"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'moderator' to roles collection");
        });
        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
        });
        }
    });
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log('server is runnung on' + PORT)
});