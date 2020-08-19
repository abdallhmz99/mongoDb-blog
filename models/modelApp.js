const mongoose=require('mongoose');

let employessSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
url:{type:String,require:true},
title:{type:String,require:true},
date:{type:String}
});


const cards= mongoose.model('cards',employessSchema);

module.exports=cards;