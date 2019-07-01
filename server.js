const express=require('express');
const mongoose=require('mongoose');
const config=require('config');
const morgan = require("morgan");

const app=express();
//Bodyparser Middleware
app.use(express.json());

//DB Config
//const db=require('./config/keys').mongoURI;
const db=config.get('mongoURI');

//Connect to Mong
mongoose
  .connect(db,{
     useNewUrlParser:true,
     useCreateIndex:true 
  })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'))
//Use Routes
app.use('/product', require('./api/product'));



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port=process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server on port ${port}`));