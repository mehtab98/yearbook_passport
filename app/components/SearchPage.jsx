const React = require('react');
const Link = require('react-router-dom').Link




const SplashPage = function() {
  const responseGoogle = (response) => {
  console.log(response)
}
  
  return (
    <div>
   <div class="content">
      <div class = "UC" >        
        
      <h1><span id= "UC">UC</span>DAVIS</h1>
        <h2> Class of 2020 Yearbook</h2>
    
     </div>
     
     <a href ='/user/logoff'>
       <div class="button1"> 
          <button class="logout" type="submit">logout</button>
        </div>
     </a>
     
     </div>
 
      
    <div class="search">
      <div class="search-container">

        <input type="text" placeholder="Search..." name="search"></input>
        <button type="submit">Filter <i class="fa fa-caret-down"></i></button>
   
      </div>
      </div>
      
      <div class="slideshow">
        <a href="https://imgur.com/JmNusD1"><img src="https://i.imgur.com/JmNusD1.jpg" title="source: imgur.com" /></a>
      </div>
    </div>
    

  );
}

module.exports = SplashPage;