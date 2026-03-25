import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        })

        await newUser.save()

        res.json({ message: "User created successfully" });

    } catch (error) {
        res.json({ message: "Error creating user" });
    }

}

export async function loginUsers(req, res) {
    try{
        const user = await User.findOne({
            email: req.body.email,
        })
        if (user == null) {
            res.status(404).json({ message: "User not found" });

        } else if (bcrypt.compareSync(req.body.password, user.password)) {

            const payload = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                isBlocked: user.isBloclked,
                isEmailVerified: user.isEmailVerified,
                image : user.image
            }

            const token = jwt.sign(payload, "i-computers" , { expiresIn: "48 hours" });

            res.json({ token: token });

        } else {
            res.json({ message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
    }
}

export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }

    if (!req.user.isAdmin) {
        return false
    }
    return true;
}