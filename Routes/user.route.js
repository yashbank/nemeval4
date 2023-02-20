const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../Model/user.model")
const UserRoute = express.Router()


UserRoute.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
        const alreadyPresent = await UserModel.findOne({ email })
        if (alreadyPresent) {
            res.send({ "msg": "Already Registered Please Login" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ "msg": "please enter valid details" })
                }
                else {
                    const newUser = UserModel({ name, email, gender, password, age, city })
                    newUser.save()
                    res.send({ "msg": "Registered Successfully" }
                    )
                }
            })
        }
    } catch (error) {
        res.send({ "msg": error.message })
    }
})


UserRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result === true) {
                    const token = jwt.sign({ userId: user[0]._id }, 'linked')
                    res.send({ "msg": "Login Successful", "token": token })
                } else {
                    res.send({ "msg": "Please Enter Correct Password" })
                }
            })
        } else {
            res.send({ "msg": "Enter Correct email id or Register to login" })
        }
    } catch (error) {
        res.send({ "msg": error.message })

    }
})
module.exports = { UserRoute }