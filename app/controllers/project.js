const ProjectModel = require("../models/project.model");

exports.getProjects = async (req, res) => {
    try {
        const listOfProjects = await ProjectModel.find();

        return res.send(listOfProjects);
    } catch (error) {
        return res.send(error);
    }
};

exports.saveProject = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const link = req.body.link;

    const newProject = new ProjectModel({
        title,
        content,
        link,
    });

    newProject.save((err) => {
        if (err) res.send("Error occurred while trying to save new project");
    });

    res.send("New project has been successfully saved");
};
