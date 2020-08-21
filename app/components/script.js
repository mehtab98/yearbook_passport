import React, {Component} from 'react'
import ReactDom from 'react-dom'

/*
class Layout extends Component{
  constructor(){
    super() 
    this.state = {
      cookie: 'cookiessssssss'
    }
  }
}
*/

let msg = document.getElementById("cookieMessage");
console.log("testing here");
msg.textContent = msg.textContent+" here"; 
//msg.textContent = msg.textContent+decodeURIComponent(document.cookie);





// UPLOAD IMAGE
document.querySelector('#imgUpload').addEventListener('change', () => {
  
    // get the file with the file dialog box
    const selectedFile = document.querySelector('#imgUpload').files[0];
    // store it in a FormData object
    const formData = new FormData();
    formData.append('newImage',selectedFile, selectedFile.name);
  
    let button = document.querySelector('.btn');


    // build an HTTP request data structure
  
    const xhr = new XMLHttpRequest();
    //const xhr2 = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
   
  // Get the server's response to the upload
  //xhr2.open("GET", "sendUploadToAPI");
    xhr.onloadend = function(e) {
        
        console.log(xhr.responseText);
        let newImage = document.querySelector("#cardImg");
        //newImage.src = "/images/"+selectedFile.name;
        newImage.src = "http://ecs162.org:3000/images/smanandhar/"+selectedFile.name;
        newImage.style.display = 'block';
        document.querySelector('.image').classList.remove('upload');
        button.textContent = 'Replace Image';
      
    }
  
    button.textContent = 'Uploading...';
    // actually send the request
    xhr.send(formData);
});

