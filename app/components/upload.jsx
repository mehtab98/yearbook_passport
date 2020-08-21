"use strict";

const React = require('react');


// React component for a component that gets a file name and uploads the image
const Upload = function(props) {
  
  // the function to call to do something with the image, passed in as a prop
  // from the parent component
  let updateMe = props.parentUpdate;
  // give function same name here as it has in parent function
  
  // global variable that will someday hold the name of the file the user chooses
  let fileInput = React.createRef(); // global within component
  
  // Function to upload an image to the server in a formdata object
  // basically stolen from the old version of uploadImage we used in Assn 2
  // When the image is recieved on the Server, it will put it into the /images directory
  // See server.js! 
  // Got to admit this old-style AJAX request looks like a dinosaur in a herd of cows. 
  // We'll work on that soon.
  function uploadFile(e) {
  
    const selectedFile = fileInput.current.files[0];
    const formData = new FormData();
    formData.append('newImage',selectedFile, selectedFile.name);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
        console.log("got",xhr.responseText);
        // old version...
        // let newImage = document.getElementById("serverImage");
        // newImage.src = "../images/"+selectedFile.name;
        //
        // replaced with call to parent React component to display image...
        updateMe("../images/"+selectedFile.name);
    }
    xhr.send(formData);
}
  

  // the return statement containing some virtual DOM elements
  // notice that the <input> element...
  // 1. Calls uploadFile when the user picks a file
  // 2. fileInput will contain the object indicating the file they chose
  return (
    <div>
      <label>
          {props.children}
          <input type="file" onChange={uploadFile} ref={fileInput} id="fileChooser" accept="image/png, .jpeg, .jpg, image/gif" />
      </label>
    </div>
  );
}

module.exports = Upload;