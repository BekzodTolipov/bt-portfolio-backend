const UserModel = require("../models/user.model");

exports.register = async (req, res) => {
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
        newUser.password = await bcrypt.hash(
            newUser.password,
            process.env.SALT
        );

        const token = await jwt.sign(
            { id: newUser._id },
            process.env.SESSION_SECRET,
            {
                expiresIn: "24h",
            }
        );

        newUser.save().then((doc) =>
            res.status(201).send({
                userId: doc._id,
                accessToken: token,
            })
        );
    }
};

exports.login = async (req, res) => {
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
};
