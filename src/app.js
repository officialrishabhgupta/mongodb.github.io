const express = require("express");
require("../src/db/conn");

const orderRouter =require("./routers/orderRoutes")
const userRouter =require("./routers/userRoutes");
const menRouter = require("./routers/menRoutes");
const app = express();
const port = process.env.PORT || 3000;

// app.get("/",async(req,res)=>{
//     res.send("Hello");
// })
app.use(express.json());
app.use(menRouter);
app.use(userRouter);
app.use(orderRouter);




app.listen(port,()=> {
    console.log(`connection is live at port no. ${port}`);
})