require('dotenv').config();
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express();
require("../src/db/conn");
const Register = require("./models/registers");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

const hbs = require("hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

console.log(process.env.SECRET_KEY);

app.get("/",auth,(req,res)=>{
    res.render("index");
});

app.get("/auth",auth,(req,res)=>{
    console.log(`This is the cookie page ${req.cookies.jwt}`);
    res.render("auth");
});

app.get("/logout", auth, async(req,res)=>{
    try{
        // req.user.tokens = req.user.tokens.filter((currEle)=>{
        //     return currEle.token !== req.token
        // });
        req.user.tokens = [];
        res.clearCookie("jwt");
        console.log("logout successfully");
        await req.user.save();
        res.render("login");
    } catch(err) {
        res.status(500).send(err);
    }
})

app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
})

//create a new user in our database
app.post("/register", async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                name: req.body.name,
                email:req.body.email,
                city:req.body.city,
                password:password,
                confirmpassword:cpassword
            });
            console.log("the success part" + registerEmployee);

            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token);

            //res.cookie() function is used to set the cookie name to value.
            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 6000),
                httpOnly:true
            })

            const registerUser = await registerEmployee.save();
            console.log("the token part" + registerUser)
            res.status(201).render("index");
        }else{
            res.send("enter same password in both fields")
        }
    } catch (err) {
        console.log(err, "the error part page");
        res.status(400).send(err);
    }
})



app.post("/login",async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);

        res.cookie("jwt", token, {
            expires:new Date(Date.now() + 60000),
            httpOnly:true
        });

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("invalid login/password Details");
        }
    } catch (err) {
        res.status(400).send("invalid login Details")
    }
})

// const createToken = async() =>{
//     const token = await jwt.sign({_id:"621a0d1cc59e5bf8cc75a066"},"mynameisrishabhguptaandiamadeveloper",{
//         expiresIn: '15min'
//     });
//     console.log(token);

//     const userVer = await jwt.verify(token, "mynameisrishabhguptaandiamadeveloper");
//     console.log(userVer);
// }
// createToken();



const orderRouter =require("./routers/orderRoutes")
const userRouter =require("./routers/userRoutes");
const menRouter = require("./routers/menRoutes");

app.use(menRouter);
app.use(userRouter);
app.use(orderRouter);

app.listen(port,()=> {
    console.log(`connection is live at port no. ${port}`);
})