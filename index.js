const express = require("express")
require("dotenv").config()

const { PostRoute } = require("./Routes/posts.route")
const { UserRoute } = require("./Routes/user.route")
const { authenticate } = require("./middleware/token")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/users", UserRoute)
app.use(authenticate)
app.use("/posts", PostRoute)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to DataBase");
    } catch (err
    ) {
        console.log(err);
    }
    console.log("Server is running on PORT 6000")
})