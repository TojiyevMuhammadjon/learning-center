const express = require("express");
const cors = require("cors");
const routes = require("../api/routes");
const relation = require("../models/relations");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");

const modules = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());
  app.use(fileUpload());
  app.use(express.static(process.cwd() + "/uploads"));
  app.use(routes);
  relation();
};

module.exports = modules;
