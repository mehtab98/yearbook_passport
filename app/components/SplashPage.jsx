const React = require('react');
const Link = require('react-router-dom').Link
const GoogleLogin = require('react-google-login')


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
      <a href="auth/google">
         <div class="google-btn">
            <div class="google-icon-wrapper">
               <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p class="btn-text"><b>Sign in with Google</b></p>
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