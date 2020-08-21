const React = require('react');
const Link = require('react-router-dom').Link
const helmet = require('react-helmet')
const bodyParser = require('body-parser');
const useState = require('react').useState
const useEffect = require('react').useEffect



// The current codebase uses jsx-loader with npm to parse jsx files which does not compile ES6 codes. The commented out section is the code for a React class component.
// This code is using async await to call the userData API
// The componentWillMount will call function callUserDate which does the API get call
// As we are doing a API call, current functional component will need to be replaced by Class component
// By replacing the jsx-loader with babel and configuring the project to run ES6, this component will load
// export class GradPage extends React.Component {
//   constructor(props){
//     super(props);
//     this.callUserDate = this.callUserDate.bind(this);
//     this.state = {
//       userData:{}
//     };
//     //im going to comment this out so I can execute the web app keep working on it though 
//   }
  
//   componentWillMount() {  
//       this.callUserData()
//         .then(res => this.setState({userData: res.userData}))
//         .catch(err => console.log('UserDate not working!!!',err));
//     }
  
//    async callUserDate () {
//       const resp = await fetch('/userData');
//       const body = await resp.json();
//       return body;
//     }
    
//     render() {
//       return (
//             <div>{this.state.userData}</div>
//       )
//     }
// }






  


const GradPage = function()
{
  return (
<div>
  <div class="dot-container">
    <span class="dot-outer"></span>
    <span class="dot-inner"></span>
    <div class="image">
      <img id="cardImg" src= "https://lh4.googleusercontent.com/-tljWeAmrW_c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnD4pskMoz4VnroYFEPOINWss3oRg/photo.jpg"/>   
    
    </div>
  </div>  

      
  <div class="header">
    <a href = '/user/logoff'> 
      <div class="button1"> 
        <button class="logout" type="submit">logout</button>
      </div>
    </a>
    
    <div class="search2">
      <div class="search-container">
        <input type="text" placeholder="Search..." name="search"></input>
        <button type="submit">Filter <i class="fa fa-caret-down"></i></button>
      </div>
    </div>
  </div>
      
      
  <div class="body">
    
    <div class="gradflex">
    <div class="grad-text-wrapper"> 
      <p id= "message-text"></p>
    </div>
      <div class="button1"> 
      <button class="Edit" type="submit">Edit</button>
      </div>
    </div>
    
    
    
    
    <div class="lower">
      <ul>
        <li>Survey Profile:</li>
        <li>Studies:</li>
        <div class="surveyinput" id="studys-input">
          
          
         
       <div class="textflex-wrapper">
    <span class="text-wrapper"> 
      <p id= "college"></p>
    </span>
      
          
          
         <span class="text-wrapper"> 
         <p id="major"></p>
         </span>
          </div>
        
        </div>
        
        
        
        
        
        <li>Favorite Study Spots:</li>
        <div class="textflex-wrapper">
        <span class="text-wrapper"> 
        <p id= "study-spot">M.U</p>
        </span>
        </div>
        
        
        
        <li>Clubs:</li>
        <div class="textflex-wrapper">
        <span class="text-wrapper"> 
        <p id= "Clubs">Basket Weaving</p>
        </span>
        </div>
        
      </ul>
    </div>
  </div>
  
</div>

  );
}


module.exports = GradPage;

