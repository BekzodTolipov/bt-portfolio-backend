require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const UserModel = require("./models/user.model");
const ProjectModel = require("./models/project.model");
const EducationModel = require("./models/education.model");
const verifyToken = require("./middleware/authJwt");

/* TODO: 
    - extract token from authentication header assuming its Bearer token
    - open new endpoints for the rest of the pages
    

*/

const salt = process.env.SALT;

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const sessionTimeout = 1000 * 60 * 60 * 24;

// Session configuration    -----------------
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { maxAge: sessionTimeout },
//     })
// );

// Session configuration    -----------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

// User signup/login
app.post("/user/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const cPassword = req.body.confirmPassword;

    if (password !== cPassword) {
        res.status(500).send({
            error: "Password and confirmed password does not match, please try again",
        });
    } else {
        const newUser = new UserModel({
            username,
            password,
        });

        console.log(newUser);
        // now we set user password to hashed password
        newUser.password = await bcrypt.hash(newUser.password, salt);

        const token = await jwt.sign(
            { id: newUser._id },
            process.env.SESSION_SECRET,
            {
                expiresIn: sessionTimeout,
            }
        );

        newUser.save().then((doc) =>
            res.status(201).send({
                userId: doc._id,
                accessToken: token,
            })
        );
    }
});

app.post("/user/login", async (req, res) => {
    // now we set user password to hashed password
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        const user = await UserModel.findOne({ username });

        if (user && user.password === password) {
            const token = await jwt.sign(
                { id: user._id },
                process.env.SESSION_SECRET,
                {
                    expiresIn: sessionTimeout,
                }
            );

            res.send({
                userId: user._id,
                accessToken: token,
            });
        } else if (user && user.password !== password) {
            res.status(400).send({
                message: "User found but password mismatch",
            });
        } else {
            res.status(400).send({ message: "No user found" });
        }
    } catch (error) {
        res.status(400).send({
            message: "Error occurred while fetching the data",
        });
    }
});

app.route("/projects")
    .get(async (req, res) => {
        try {
            const listOfProjects = await ProjectModel.find();

            return res.send(listOfProjects);
        } catch (error) {
            return res.send(error);
        }
    })
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const link = req.body.link;

        const newProject = new ProjectModel({
            title,
            content,
            link,
        });

        newProject.save((err) => {
            if (err)
                res.send("Error occurred while trying to save new project");
        });

        res.send("New project has been successfully saved");
    });

app.route("/education")
    .get(async (req, res) => {
        try {
            const listOfSchools = await EducationModel.find();

            return res.send(listOfSchools);
        } catch (error) {
            return res.send(error);
        }
    })
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;

        const newEducation = new EducationModel({
            title,
            content,
        });

        newEducation.save((err) => {
            if (err)
                res.send("Error occurred while trying to save new education");
        });

        res.send("New education has been successfully saved");
    });

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});
