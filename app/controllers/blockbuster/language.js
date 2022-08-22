const LanguageModel = require("../../models/blockbuster/language.model");

exports.getAllLanguages = async (req, res) => {
    try {
        const languages = await LanguageModel.find();

        return res.send(languages);
    } catch (error) {
        console.log(error);
        return res.send("Error during fetching data");
    }
};

exports.addLanguages = async (req, res) => {
    const listOfLanguages = req.body.languages.map((language) => {
        return { ...language, last_update: Date.now() };
    });

    try {
        const savedLanguages = await LanguageModel.insertMany(listOfLanguages);
        console.log(savedLanguages);

        res.status(200).send("Success");
    } catch (error) {
        console.log(error);
        return res.send("Error during fetching data");
    }

    // res.send("This endpoint is temporarily unavailable");
};
