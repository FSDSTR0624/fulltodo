const express = require("express");
const cors = require('cors');
const connectDB = require('./stack');
const taskroutes = require('./routes/taskroute.js'); // Ensure the path is correct
const userroutes = require('./routes/userroute.js'); // Ensure the path is correct
// const { middleWare: { logger } } = require("./middlewares/middle.js");

const app = express();
const port = 3000;
connectDB();

    // Function to simulate sleep (if needed)
    /*function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }*/
app.use(express.json());
app.use(cors());
app.use("/users", userroutes);
app.use("/tasks", taskroutes);

    // Uncomment and modify this section if needed
    /*app.get("/user", logger,
        (req, res, next) => {
          next();
        },
        (req, res, next) => {
          throw new Error("Metodo no permitido");
        }
    );*/
app.listen(port, () => {
console.log(`App listening on port ${port}`);
});

    //module.exports = { app, server };

