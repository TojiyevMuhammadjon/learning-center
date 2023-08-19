const sequelize = require("../api/database");
const config = require("config");
const port = config.get("port")
// const bootstrap = async (app) => {
//   (async () => {
//     try {
//       await sequelize.authenticate();
//       sequelize
//         .sync({ logging: false, alter: true })
//         .then(() => {
//           console.log("Database synchronized successfully");
//         })
//         .catch((error) => {
//           console.error("Error synchronizing database:", error);
//         });

//       console.log(
//         "Connection to the database has been established successfully."
//       );
//       //   sequelize.
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   })();
//   app.listen(config.get("port"), () => {
//     console.log(config.get("port"));
//   });
// };

const bootstrap = async(app)=>{
  await sequelize.authenticate()
  await sequelize.sync({alter: true, logging: false})
  app.listen(port, ()=>{
    console.log(port)
  })
}
module.exports = bootstrap;
