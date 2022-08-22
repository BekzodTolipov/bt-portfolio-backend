const EducationModel = require("../models/education.model");

exports.getAllEducations = async (req, res) => {
    try {
        const listOfSchools = await EducationModel.find();

        return res.send(listOfSchools);
    } catch (error) {
        return res.send(error);
    }
};
