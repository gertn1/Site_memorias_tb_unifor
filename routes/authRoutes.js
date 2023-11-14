const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

router.post("/register", async (req, res) => {
  
    const name = req.body.name;
    const email =  req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    
    if (name == null  || email == null  || password == null || confirmpassword == null){
    return res.status(400).json({error: "por favor, preencha todos os campos!"});
}

if(password != confirmpassword){
  return res.status(400).json({error: "As senhas nao conferem!!"});

}
const emailExists = await User.findOne({ email: email});

if(emailExists) {
    return res.status(400).json({ error: 'Email já cadastrado' });
}

const salt = await bcrypt.genSalt(12);
const passwordHash = await bcrypt.hash(password, salt);

const ser = new User({
  name: name,
  email: email,
  password: passwordHash 

});

try{

  const newUser = await user.save();

  const token = jwt.sign(

  {
    name: newUser.name,
    id: newUser._id
  },

  "nossosecret"

  );

  res.json({error: null, msg: "Você realizou o cadastro com sucesso", token: token, useId: newUser._id});



}catch(error){

  res.status(400).json({error});

}

});

router.post("/login", async(req,res) =>{

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email});
  if(!user){
    res.json(400).json({error: "Não ha usuario cadastrado."});
  }

const checkPassword = await bcrypt.compare(password,user.password);

if(!checkPassword){
  res.json(400).json({error: "Senha invalida."});
}
});
module.exports = router;
