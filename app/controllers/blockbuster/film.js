const FilmModel = require("../../models/blockbuster/film.model");

exports.getAllFilms = async (req, res) => {
    try {
        const listOfFilms = await FilmModel.find();

        return res.send(listOfFilms);
    } catch (error) {
        return res.send("Error during fetching data");
    }
};

exports.addFilms = async (req, res) => {
    const listOfFilms = req.body.films;
    console.log(listOfFilms);
    try {
        const newFilms = await FilmModel.insertMany(listOfFilms);
        console.log(newFilms);

        return res.status(200).send(newFilms);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error during fetching data");
    }
};
