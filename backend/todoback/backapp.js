const express = require("express");
const cors = require('cors');

const taskroutes = require('/routes/taskroute.js');
const userroutes = require('/routes/userroute.js');
/*const {middleWare: { logger }} = require("./middlewares/middle.js");*/
const app = express();
const port = 3000;

/*function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
*/


app.use(express.json());

app.use(cors());

app.use("/users", userroutes);
app.use("/tasks",taskroutes);


/*
//app.get("/user", logger,
//    (req, res, next) => {
//      next();
//    },
//    (req, res, next) => {
//      throw new Error("Metodo no permitido");
    }
  );
*/

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


/*module.exports = { app, server };*/
