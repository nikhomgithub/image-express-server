const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const ProductSchema=new Schema({
  name : {
    type:String,
    require:true
  },
  imageUrl :{
    type:String,
  }
});

module.exports=Item=mongoose.model('product',ProductSchema);