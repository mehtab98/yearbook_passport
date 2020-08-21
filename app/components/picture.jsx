"use strict";
const React = require('react');
const UploadButton = require("./UploadButton")

const picture = function() {
  
  
  const [image, updateStateVarImage] = React.useState("");
  
 
  function updateMe (newPortrait) {
    updateStateVarImage(newPortrait);  
  }
  
  let contents = <UploadButton parentUpdate={updateMe}>Upload</UploadButton>
  if (image) {
    contents = <img src={image}/>
  }
  
  return (
    <main>
      <div id="portraitBox">
        {contents}
      </div>
    </main>
  );
}

module.exports = picture;

