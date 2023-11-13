const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/", async (req , res)=> {

    res.json({msg: "Funcionando!"})


});

module.exports = router;
