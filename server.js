const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const AppRoutes = require('./routes/links.routes');
const multer = require('multer')
const app = express() ;

app.use(bodyParser.urlencoded({extended:false }));

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname,'assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));



var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'uploads')
    },
    filename: (req, file, cb)=> {
      cb(null,Date.now()+'-'+file.originalname)
    }
  })


  function fileFilter (req, file, cb) {
 
    if(file.mimetype==="image/png"||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg")
        {cb(null, true)}
    else
        {cb(null, false) }           
      }



  app.use(multer({dest:'uploads',storage}).single('url'))


app.use(AppRoutes);

mongoose.connect("mongodb+srv://abdalla:abdalla@abdalla-mongodb.jme2d.mongodb.net/blog",{useNewUrlParser:true,useUnifiedTopology:true});

app.listen( process.env.PORT || 3000 ) ;

// app.listen(3000,()=>{console.log("Welcome")});