const express = require("express");
const router = express.Router();
const multer = require('multer');
//Product Model
const Product=require('../model/Product');

/*
const upload=multer({dest:'uploads/'});
//@route POST api/product
router.post('/',upload.single('imageUrl'),(req,res)=>{
    console.log(req.file)
    const newProduct=new Product({
      name:req.body.name,
      imageUrl:req.body.imageUrl
    });
  
    newProduct
      .save()
      .then(product=>res.status(201).json(product))
      .catch(err=>res.status(500).json({error:err}))
});
/*
//req:How to use @postman
POST: localhost:5000/product  
Header (no need)
Body > form-data
Key:name      Value:Mobile Phone
Key:imageUrl  Value: Select File 

========================
//res @POSTMAN
{
    "_id": "5d1a07989320761875cc4146",
    "name": "Mobile Phone",
    "__v": 0
}
and a file in "uploads" folder
=======================
//in terminal console.log(req.file)
{ fieldname: 'imageUrl',
  originalname: 'a.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '3c5673396e1120b4c5b04cd2ce4eed1d',
  path: 'uploads/3c5673396e1120b4c5b04cd2ce4eed1d',
  size: 84201 }
========================
*/

//How we store (destination & filename)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // allow jpeg and png
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('message',false)); //not save
    }
};

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//@route POST api/product
router.post('/',upload.single('imageUrl'),(req,res)=>{
    let newProduct

    if(req.file){
        console.log(req.file)
            newProduct=new Product({
                name:req.body.name,
                imageUrl:req.file.path
            });
    }
    else{
            newProduct=new Product({
                name:req.body.name,
            });
    }
    newProduct
      .save()
      .then(product=>{
        console.log(product)
        res.status(201).json(product)
      })
      .catch(err=>res.status(500).json({error:err}))
});

/*
======================
//req:How to use @postman
POST: localhost:5000/product  
Header (no need)
Body > form-data
Key:name      Value:Mobile Phone
Key:imageUrl  Value: Select File 
======================
{
    "_id": "5d1a0cfe9a8b2a1b4c223634",
    "name": "Mobile Phone",
    "imageUrl": "uploads/2019-07-01T13:39:10.782Za.jpg",
    "__v": 0
}
=========================
//how to get photo at chrome

localhost:5000/uploads/2019-07-02T03:55:05.122Za.jpg
*/

// upload.single('imageUrl'),
//@route Get api/product

router.get('/',(req,res)=>{
  Product.find()
    .then(products=>res.status(201).json(products))
    .catch(err=>res.status(500).json({error:err}))
});

module.exports = router;
