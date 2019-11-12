import React, { Component } from 'react'

import './App.css';
import axios from 'axios'

export default class App extends Component {
  App(props){

  }


  state={
    selectedFile:null,
    name:''
  }

  onNameChange=(e)=>{
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  fileSelectedHandler=(event)=>{
    event.preventDefault();
    this.setState({
      selectedFile:event.target.files[0]
    })
  }

  fileUploadHandler=(event)=>{
    event.preventDefault();

    if(this.state.selectedFile&&this.state.name){
      console.log("uploading")
      const fd=new FormData();
      fd.append('name',this.state.name);
      fd.append('imageUrl',this.state.selectedFile,this.state.selectedFile.name);
      axios
        .post('/product',fd,{
        onUploadProgress:ProgressEvent=>{
          console.log('Upload Progress'+Math.round(ProgressEvent.loaded/ProgressEvent.total*100)+'%')
        }
      })
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)})
    }else{
      console.log("invalid input")
    }
  }
  
  onGet=(event)=>{
    event.preventDefault();
    axios
    .get('/product')
      .then(res=>{console.log(res.data)})
      .catch(err=>{console.log(err)})

  }
  //Do not forget to set proxy at package file
  
  
  
  /*
  ==========
  Basic
  ==========
  
  state={
    selectedFile:null,
  }
  
  fileSelectedHandler = event = {
    this.setState({
      selectedFile:event.target.files[0]
    })
  }
 
  fileUploadHandler =()=>{
     const fd=new FormData();
     fd.append('imageUrl',this.state.selectedFile,this.state.selectedFile.name);
     axios
      .get('/product')
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)})
  }
  
  render(){
    return(
      <div>
        <input type = "file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
  */
  //

  render() {
    return (
      <div className="App">
        <h1>Upload Image</h1>
          <form>
            <label>Name</label>
            <input type="text" name="name" onChange={this.onNameChange} placeholder="Add Name" value={this.name}></input>
            <br></br>
            <input 
              style={{display:'none'}}
              type="file" 
              onChange={this.fileSelectedHandler}
              ref={fileInput=>this.fileInput2=fileInput}
            /> 
            <button onClick={(e)=>{e.preventDefault();this.fileInput2.click()} }>Hide Input Text</button>
            <br></br>
            <button onClick={this.fileUploadHandler}>Upload</button>
            <br></br>
            <div className="a"></div>
         
          </form>
            <button onClick={this.onGet}>GET</button>
            <div>
              <img src="/uploads/2019-07-02T06:05:36.907Zbycicle.png" alt="No Load"/>
            </div>
      </div>
    )
  }
}
