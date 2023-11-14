const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/:id", async (req , res)=> {

const id = req.params.id;
try{

const user = await User.findOne({_id: id}, {password: 0});

res.json({error: null, user});

} catch (err){
    return res.status(404).json({ error: "O usuario nao existe"});
    }
});

router.put("/", async (req, res)=> {

});
module.exports = router;


