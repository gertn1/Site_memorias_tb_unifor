// modulos 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes 
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");



//middlewares 
//config
const dbName = "partytimeb";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


// atrela rotas express

//conexão mongodb
mongoose.connect(
    `mongodb://localhost/${dbName}`,

);

app.get("/", (req, res) => {

    res.json({message:"Rota teste!"});

});
app.listen(port,() => {
    console.log(`Backend está rodando na porta ${port}`);
});