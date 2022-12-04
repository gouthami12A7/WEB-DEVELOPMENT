const request = require("request");
const express = require("express")
const app = express();
const port = 3000;

const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

const serviceAccount = require("./key.json")

initializeApp({
    credential: cert(serviceAccount)
});

const db=getFirestore();

app.set('view engine','ejs')
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.get('/register', (req, res) => {
    res.render("register");
  })
app.get('/registersubmit',(req,res)=>{
  const first_name=req.query.fn;
    const last_name=req.query.ln;
  const email=req.query.email;
    const password=req.query.pwd;

    db.collection('users').add({
      name:first_name + last_name,
      email:email,
      password:password
    }).then(() =>{
      res.render("login");
    })
});
  app.get('/login', (req, res) => {
    res.render("login");
  })
  app.get('/forgotpwd', (req, res) => {
    res.render("forgotpwd");
  })
  app.get('/links', (req, res) => {
    res.render("links");
  })
  app.get('/main', (req, res) => {
    res.render("main");
  })
  app.get('/loginfail',(req,res)=>{
    res.render("loginfail");
  })
app.get('/loginsubmit',(req,res) =>{
  const email=req.query.email;
    const password=req.query.pwd;
     db.collection("users")
     .where("email","==",email)
     .where("password","==",password)
     .get()
     .then((docs) =>{
      if(docs.size> 0){
        res.render("main1");
      }
      else{
        res.render("loginfail");
      }
     });
});

app.get('/getdatasubmit',(req,res) =>{
  const name = req.query.gds;
  console.log(name);

  
    });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});