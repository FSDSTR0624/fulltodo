//its a middleware to verify logging (userrouting)
const middleWare = {
    logger: (req, next) => {
      console.log(`Calling to ${req.baseUrl}${req.url}, method: ${req.method}`);
      next(); 
      },
    logger2: (next) => {
      console.log("Logger 2");
      next();
      },  
};
  module.exports = {middleWare}