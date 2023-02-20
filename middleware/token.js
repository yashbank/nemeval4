const express = require("express")
const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    try {
        jwt.verify(token, "linked", function (err, decoded) {
            console.log(decoded)
            req.body.user = decoded.userId
            if (decoded) {
                next()
            }
            else {

                res.send({ "msg": "Please Login First" })
            }
        })
    } catch (error) {
        res.send({ "msg": "Please Verify Again" })
    }
}
module.exports = { authenticate }