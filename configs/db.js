const mongoose = require("mongoose")
require("dotwnv").config()
mongoose.set('strictQuery', false)
const connection = mongoose.connect(process.env.mongoURL)

module.exports = { connection }