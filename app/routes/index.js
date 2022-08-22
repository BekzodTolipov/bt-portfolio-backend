const express = require("express");
const app = express();

const UserRoute = require("./user");
const ProjectRoute = require("./project");
const EducationRoute = require("./education");

const FilmRoute = require("./blockbuster/film");
const LanguageRoute = require("./blockbuster/language");

app.use("/users/", UserRoute);
app.use("/projects/", ProjectRoute);
app.use("/educations/", EducationRoute);

// Movie Rental
app.use("/blockbuster/", FilmRoute);
app.use("/blockbuster/", LanguageRoute);

module.exports = app;
