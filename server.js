// server.js 

const FormData = require("form-data");
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const assets = require('./assets');

//Google Sign-ON packages 
// and some new ones related to doing the login process
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 



/*
The following portion is the database initializing 
*/



//package for database 
const sqlite = require('sqlite3').verbose();

//initalize a graduate database 
var db = new sqlite.Database('graduate.db'); 

//command to choose graduation table
let table_int_cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='graduateTable' ";

db.get(table_int_cmd, function (err, val) {
    console.log(err, val);
  
    //If no database table found 
    if (val == undefined) {
        console.log("No database file - creating one");
         
        //command to create a database 
        let create_cmd = 'CREATE TABLE graduateTable(profileLink TEXT, email TEXT, name Text, photoLink TEXT, college TEXT, major TEXT, message TEXT, clubs TEXT, studySpot TEXT)';
        db.run(create_cmd, function(err, val) {
          if (err) {
            console.log("Database creation failure",err.message);
          } else {
            console.log("Created database command worked!");
          }
        });
      
    } else {
        //database table is found 
        console.log("Database file found");
    }
});








/*
The following portion of the code executes the Google Login. 
This consists of other features such as adding users to DB, 
checking @ucdavis.edu domain email, and the log-out feature.
*/





//Setup passport by utilizing Google Strategy 
console.log("running google strategy\n"); 

passport.use(new GoogleStrategy(
  //Passing in passport information and scope of data we want Google to give us. 
  // key.env file of our app contains these IDs 
  {
    
  // object containing data to be sent to Google to kick off the login process
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  //callback to our yearbook domain 
  callbackURL: 'https://yearbook-final.glitch.me/auth/accepted',  
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', // where to go for info
  scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
  
},
  // function profile is called to get info about our user into our Database 
  gotProfile));

console.log("setting up pipeline") 

//Takes HTTP message body and put it as a string into req.body
app.use(bodyParser.urlencoded({extended: true}));

// This Puts cookies into req.cookies
app.use(cookieParser());

// Pipeline stage that echos the url and shows the cookies, for debugging.
app.use("/", printIncomingRequest);


// expressSession handles decryption of cookes, storage of data about the session, 
// and deletes cookies when they expire
app.use(expressSession(
  { 
    secret:'bananaBread',  // a random string used for encryption of cookies
    maxAge: 6 * 60 * 60 * 1000, // Cookie time out - six hours in milliseconds
    // setting these to default values to prevent warning messages
    resave: true,
    saveUninitialized: false,
    // make a named session cookie; makes one called "connect.sid" as well
    name: "ecs162-session-cookie"
  }));


// Initializes request object for further handling by passport
app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/user/*', requireUser, requireLogin, express.static('.'));

//google auth routing 
app.get('/auth/google', passport.authenticate('google')); 
app.get('/auth/accepted', 
  passport.authenticate('google', 
    { successRedirect: '/setcookie', failureRedirect: '/' }
  )
);


app.get('/userData', requireUser,
  function(req, res) {
  
      console.log("Serving user data")
      console.log(req.user)
      if(req.user){
        res.send(req.user)
      }else{
        res.send("error")
      }
  }
);

// A cookie is set before redirecting to the protected homepage
// this route uses middleware functions requireUser, which makes sure req.user is defined
app.get('/setcookie', requireUser,
  function(req, res) {
    // if(req.get('Referrer') && req.get('Referrer').indexOf("google.com")!=-1){
      // mark the birth of this cookie
    
  
      // set a public cookie; the session cookie was already set by Passport
      res.cookie('google-passport-example', new Date());
      res.redirect('/GradPage');
    //} else {
    //   res.redirect('/');
    //}
  }
);


function printIncomingRequest (req, res, next) {
    console.log("Serving",req.url);
    if (req.cookies) {
      console.log("cookies",req.cookies)
    }
    next();
}


// using this route, we can clear the cookie and close the session
app.get('/user/logoff',
  function(req, res) {
    // clear both the public and the named session cookie
    res.clearCookie('google-passport-example');
    res.clearCookie('ecs162-session-cookie');
    console.log("user logs off...."); 
    res.redirect('/');
  }
);



//This function gets profile from Google DB and tries to find user in DB 
//IF no user is found the function will add a user into the graduateTable DB 
function gotProfile(accessToken, refreshToken, profile, done) {
    
    //Collect user email from 
    let user_email = profile.emails[0].value
    let name = profile.name.givenName + " " + profile.name.familyName
    let user_photo = profile.photos[0].value
    
    
    
    //check if @ucdavis.edu domain 
    var array = user_email.split("@")
    if(array[1] != "ucdavis.edu"){
      //if not in domain return a done == 0 which indicates a false value 
      done(null, 0);
    }
  
    
    let test = 0; 
    let cmd = "SELECT ROWID as rowid,* FROM graduateTable WHERE email = ?"; 
    
    db.get(cmd,[user_email], function(err,row){
      
     
      if(err){
        console.log("ran into a error");
        console.log(err); 
      }
      
      //IF user not in our DB
      if(row === undefined){
        console.log("unsuccesful in finding the graduate, so we'll add him to the database")
   
        let cmd = "INSERT INTO graduateTable(profileLink,email, name, photoLink, college, major, message,clubs,studySpot) VALUES(?,?,?,?,?,?,?,?,?)"; 
        
        //generate a randomKey for graduate 
        let gradID = Math.random().toString(36).substring(7);
        console.log('grad id is')
        console.log(gradID)
        //run cmd 
        db.run(cmd, gradID, user_email, name, user_photo, "college", "major", "message", "clubs", "studySpot", function(err){

            //unsuccesful in inserting user 
            if(err){

              console.log("We were unsuccesful in inserting the graduate into the yearbook!");
              console.log(err)
              done(null, 0);
              
            //Succesfully inserted user 
            }else{
              console.log("We were succesful in inserting the graduate into the yearbook!");
              console.log("user is row number: ")
              console.log(this.lastID)
              console.log(gradID)
              
              done(null, this.lastID)
              //done(null, this.gradID)
          }
      }) 
        
      //If user is found in our graduateTable DB 
      }else{
        console.log("succesful in finding the graduate!\n")
        console.log(row)
        console.log("User is row number:\n")
        console.log(row.rowid)
        console.log(row.profileLink)
        //profileLink
        //passing key for db Row for this user in DB table to serializeUser.
        done(null, row.rowid)
        //done(null, row.profileLink)
      }
    })
  

    
}




passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    //passing from SerializeUser back to deserializeUser 
    done(null, dbRowID);
});


passport.deserializeUser((dbRowID, done) => {
    
    console.log("In deserializeUser. The unique rowID is:", dbRowID);

    
    if(dbRowID){
      
      //command to look up user data in database using dbRowID.
      let cmd = "SELECT * FROM graduateTable WHERE ROWID = ?"; 
    
      console.log(cmd); 
      db.get(cmd,[dbRowID],(err, row) =>{
        
        if(err){
          
          console.log("unsuccesful in finding the graduate")
          done(null, -1);
          
        }else{
          
          console.log("succesful in finding the graduate in deserializeUser!")
          console.log(row)
          //let dbData = {profileLink: row.gradID, email: row.user_email, name: row.name, photoLink: row.user_photo, college: row.college, major: row.major, message: row.message, clubs: row.clubs, studySpot: row.studySpot};
          let userData = {userData: row};
          done(null, userData);
          //done(null, row)
          
        }
        
       })
    
    }
    
});

//Middlewear function called requireUser
function requireUser (req, res, next) {
  console.log("require user",req.user)
  if (!req.user) {
    res.redirect('/');
  } else {
    console.log("user is",req.user);
    next();
  }
};



//Middlewear function called requireLogin 
function requireLogin (req, res, next) {
  console.log("checking:",req.cookies);
  if (!req.cookies['ecs162-session-cookie']) {
    res.redirect('/');
  } else {
    next();
  }
};








/*
The Following are APIs designed to help update user profiles,
and filter through user profiles based on certain search preferences 
in the database 
*/


//http POST to update a users information given their ID. 
app.post('/updateUser', function (req,res) {
  
  //check if photochanged on the browser, if it did then call a post request to the third-party ecs162 
  //do this browser side so that we can make it neater?? 
  
  //DEBUGGING: IF NOT GRADID THEN LETS TRY ROWID 
  let inputData = [req.body.college, req.body.major, req.body.message, req.body.club, req.body.studySpot, req.body.gradID]; 
  
  //SQL command to update photoLink, message, club, and id if a request for update has been called 
  db.run("UPDATE graduateTable SET college=?, major=?, message=?, studySpot=?, club=?, id=?",inputData,function(err,rows){
      if(err){
          console.log("We were unsuccesful in updating the graduates profile!");
          res.end(err.message);
              
      }else{
        
          console.log("We were succesful in updating the graduates profile!");
          res.send(req.body.gradID); 
      }
  });
        
})



//http GET request that gets all user based on the .column command 
app.get('/filter', function(req,res){ 
  let filters = ['college', 'major', 'studySpot', 'club']
  
  let sqliteFilter = "*";
  
  var i;
  for( i = 0; i < 3; i++){
    if(filters[i] == req.body.command){
      sqliteFilter =  filters[i]
    }
  }
  
  let sqlite_filter_cmd = "SELECT * From graduateTable where "+ sqliteFilter + "= " + req.body.searchParamater; 
  
  let users = []
  
  db.each(sqlite_filter_cmd, (error,rows) =>{ 
      users.push(rows)
  })
  
  res.send(users)
  
})


//HTTP request to get a Graduate's Data if the user passes back the users rowID
app.get("/graduateData", function (request, response) {
  
  let rowID = request.query.rowID;
  
  if(rowID){
    
    let cmd = "SELECT * FROM graduateTable WHERE ROWID = ?"; 
    //+ id; 
    console.log(cmd); 
    db.get(cmd,[rowID],(err, row) =>{
      if(err){
        console.log("unsuccesful in finding the graduate")
        response.send(err.message);
      }else{
        console.log("succesful in finding the graduate!")
        response.send(row)
      }
    })
    
  }
  
});

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Multer set-up stolen from old version of image-upload
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  // keep the file's original name
  // the default behavior is to make up a random string
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})



/*
The Following portion of the Backend is implementing the ECS162.org image uploading api. 
It also includes a HTTP request that updates a users profile 
*/

let uploadMulter = multer({storage: storage});


// Serves files out of /public
app.use(express.static('public'));

// Next, serve images out of the /images directory
app.use("/images",express.static('images'));


// No route specified, server index.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Next, handle post request to upload an image
// by calling the "single" method of the object uploadMulter that we made above
app.post('/upload', uploadMulter.single('newImage'), function (request, response) {
  console.log("Recieved",request.file.originalname,request.file.size,"bytes")
  if(request.file){
    sendMediaStore(request.file.originalname, request, response);
     
  }
  else throw 'error';
});
 


const fs = require('fs');
// function called when the button is pushed
// handles the upload to the media storage API



function sendMediaStore(filename, serverRequest, serverResponse) {
  let apiKey = process.env.ECS162KEY;
  if (apiKey === undefined) {
    serverResponse.status(400);
    serverResponse.send("No API key provided");
  } else {
    // we'll send the image from the server in a FormData object
    let form = new FormData();
    
    // we can stick other stuff in there too, like the apiKey
    form.append("apiKey", apiKey);
    // stick the image into the formdata object
    form.append("storeImage", fs.createReadStream(__dirname + "/images/" + filename));
    // and send it off to this URL
    form.submit("http://ecs162.org:3000/fileUploadToAPI", function(err, APIres) {
      // did we get a response from the API server at all?
      if (APIres) {
        // OK we did
        console.log("API response status", APIres.statusCode);
        // the body arrives in chunks - how gruesome!
        // this is the kind stream handling that the body-parser 
        // module handles for us in Express.  
        let body = "";
        APIres.on("data", chunk => {
          body += chunk;
        });
        APIres.on("end", () => {
          // now we have the whole body
          if (APIres.statusCode != 200) {
            serverResponse.status(400); // bad request
            serverResponse.send(" Media server says: " + body);
          } else {
            serverResponse.status(200);
            serverResponse.send(body);
          }
          let path = __dirname + "/images/" + filename;
          fs.unlink(path);
        });
      } else 
      { 
        serverResponse.status(500); // internal server error
        serverResponse.send("Media server seems to be down.");
      }
    });
  }
}









// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
