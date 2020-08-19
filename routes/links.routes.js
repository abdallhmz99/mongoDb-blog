const AppRoutes = require('express').Router();

const modelAppEmployee = require("../models/modelApp");
const { findOne, find } = require('../models/modelApp');


AppRoutes.get('/',async(req,res)=>{

    const cards = await modelAppEmployee.find({});

     res.render('user',{cards,activeAdd:false,activeAdmin:false,activeUser:true});
})

AppRoutes.get('/admin',async(req,res)=>{

    const cards = await modelAppEmployee.find({});

     res.render('admin-crud',{cards,activeAdd:false,activeAdmin:true,activeUser:false});
})

AppRoutes.get('/AddForm',async(req,res)=>{

     res.render('addForm',{activeAdd:true,activeAdmin:false,activeUser:false,comment:true});
})


AppRoutes.post('/Add', async(req,res)=>{
    
   if(req.file==undefined)
   {
    res.render('/addForm',{activeAdd:true,activeAdmin:false,activeUser:false,comment:false});
   }
   else
   {
    await  modelAppEmployee.insertMany({
        title: req.body.title ,
        url: req.file.path ,
        date:Date()
       });
   
   res.redirect('/admin');
   }



})

AppRoutes.get('/delete/:id',async(req,res)=>{

    await modelAppEmployee.findOneAndDelete({_id:req.params.id});

    res.redirect('/admin');
})

AppRoutes.get('/edit/:id',async(req,res)=>{

  const data =  await modelAppEmployee.findOne({_id:req.params.id});

    res.render('editForm',{data,activeAdd:false,activeAdmin:false,activeUser:false,comment:true});
})

AppRoutes.post('/handelEdit/:id',async(req,res)=>{

    if(req.file==undefined)
   {
     res.render('editForm',{data,activeAdd:false,activeAdmin:false,activeUser:false,comment:false});
   }
   else
   {
    await modelAppEmployee.findOneAndUpdate({_id:req.params.id},{
        title: req.body.title ,
        url: req.file.path,
        date:Date()
        });
        res.redirect('/amdin');      

    } 

     

})

AppRoutes.get('/one-item/:id',async(req,res)=>{

    const data =  await modelAppEmployee.findOne({_id:req.params.id});
  
      res.render('one_item',{data,activeAdd:false,activeAdmin:false,activeUser:false});
  })

  AppRoutes.get('/admin-one-item/:id',async(req,res)=>{

    const data =  await modelAppEmployee.findOne({_id:req.params.id});
  
      res.render('admin_one_item',{data,activeAdd:false,activeAdmin:false,activeUser:false});
  })

AppRoutes.post('/search',async (req,res)=>{

    const cards = await modelAppEmployee.find({title: { $regex:  req.body.searchKey  , $options : 'i' } })
         
         res.render('search',{cards,activeAdd:false,activeAdmin:false,activeUser:false})
    
          })


module.exports=AppRoutes;