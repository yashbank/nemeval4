const express = require("express")
const mongoose = require("mongoose")
const { PostModel } = require("../Model/posts.model")

const PostRoute = express.Router()

PostRoute.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const newpost = new PostModel(payload)
        newpost.save()
        res.send({ "msg": "Post Added Successfully" })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

PostRoute.get("/", async (req, res) => {
    const query = req.query
    try {
        const posts = await PostModel.find(query)
        res.send(posts)

    } catch (error) {
        res.send({ "msg": error.message })
    }
})

PostRoute.get("/top", async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ no_of_comments: -1 })
        res.send(posts[0])
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

PostRoute.patch("/update/:id", async (req, res) => {
    const Id = req.params.id
    const payload = req.body
    try {
        await PostModel.findByIdAndUpdate({ _id: Id }, payload)
        res.send({ "msg": "Updated Successfully" })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

PostRoute.delete("/delete/:id", async (req, res) => {
    const Id = req.params.id
    try {
        await PostModel.findByIdAndDelete({ _id: Id })
        res.send({ "msg": "Deleted Successfully" })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

module.exports = { PostRoute }