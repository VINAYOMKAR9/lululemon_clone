require("dotenv").config();
const express = require("express")
const {userRouter}=require("./routes/user.routes")
const {menRouter}=require("./routes/men.routes")
const {cartRouter} = require("./routes/cart.routes")
const {authenticate}= require("./middlewares/users.middleware")

const cors = require("cors");
const connectToDB = require("./db");
const app =express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRouter)
app.use("/mens",menRouter)
app.use(authenticate)
app.use("/carts",cartRouter)

app.listen(8080,async()=>{
    await connectToDB()
    
    console.log("connected to server 8080");
})