const React = require('react');
const Link = require('react-router-dom').Link


const displayGrads= function() {
  return (
<div>
  <body class="displaygrads">
  <div class="content">
    <div class = "UC" >
       <h1><span id= "UC">UC</span>DAVIS</h1>
       <h2> Class of 2020 Yearbook</h2>
    </div>
  </div>
  
      <div class="search">
      <div class="search-container">

        <input type="text" placeholder="Search..." name="search"></input>
        <button type="submit">Filter <i class="fa fa-caret-down"></i></button>
   
      </div>
      </div>
  
  
  <div class="displayGrad-flexwrapper">  
    
    
    
    <div class="dot-container1">
    <span class="dot-outer1"></span>
    <span class="dot-inner1"></span>
    <div class="image">
      <img id="cardImg" src="#"/>     
    </div>
  </div>  
  <div class="display-component">
  </div>
    
    
    
    
    <div class="dot-container1">
    <span class="dot-outer1"></span>
    <span class="dot-inner1"></span>
    <div class="image">
      <img id="cardImg" src="#"/>     
    </div>
  </div>  
  <div class="display-component">
  </div>
    
    
    
    <div class="dot-container1">
    <span class="dot-outer1"></span>
    <span class="dot-inner1"></span>
    <div class="image">
      <img id="cardImg" src="#"/>     
    </div>
  </div>  
  <div class="display-component">
  </div>
    
    
    
    
    <div class="dot-container1">
    <span class="dot-outer1"></span>
    <span class="dot-inner1"></span>
    <div class="image">
      <img id="cardImg" src="#"/>     
    </div>
  </div>  
  <div class="display-component">
  </div>
    
    
    
    
    
    
  </div>
  
  </body>
</div>

  );
}

module.exports = displayGrads;