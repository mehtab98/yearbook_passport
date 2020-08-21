# YearBook Final Project

Christopher Morgan, Mehtab Randhawa, Srijana Manandhar

Overall Challenges: 
  -> We faced some downtime utilizing glitch, especially when we were developing during the night as the App status 
  would show high levels of CPU usage. Eventhough we weren't developing a lot. (SCREENSHOT OF ISSUE CAN BE 
  FOUND IN ASSESTS DIRECTORY)
  -> We kept getting "This project has received too many requests, please try again later." Which made it difficult 
  to see our development progress. (SCREENSHOT OF ISSUE CAN BE FOUND IN ASSESTS DIRECTORY)
  -> It was also difficult finding online resources relevant to our development especially for frontend development. 
  We decided as a group it would be best to implement code on Glitch's React-Router DOM project. However, the issue 
  with this project is that it implements a lot of .jsx files. There were no tutorials or online resources available 
  to help along with this file strucuture.
Frontend Development:
  Challenges:
    ->Since we implemented React's React-Router DOM project it was .jsx heavy and no online resources showcased 
    solutions that were relevant to our file structure. Due to time restricitons we had already dedicated so much 
    time to our HTML/CSS that it was little too late to find a clever solutions to make HTTP request. 
    -> "This project has received too many requests, please try again later" made it difficult to see how our HTML
    was rendering. 
  Completed Tasks:
    1) We were able to design the splash page to full functionality 
    2) we were able to produce routing for all the views 
    3) Provided proper css for web/mobile views 
  Un-Completed Tasks:
    1) We were unable to implement webhooks succesfully with .JSX code to call our restfulAPI's on the backend. 
    

Backend Development:
  Challenges:
    -> We faced a lot of challenges in learning how to implementing google-sign on and the code required significant
    time to implement this feature. This API had a huge learning curve and took significant time to implement. Halting 
    some of the time we could dedicate to the front-end. 
    -> We tried to fetch url to display the data but we faced some problem in using class so we have commented out the code we wrote.
    We would like to request the grader to consider this.The commented codebase in /GradPage uses jsx-loader with npm to parse jsx files which does not compile ES6 codes. The commented out section is the code for a React class component.
This code is using async await to call the userData API. The componentWillMount will call function callUserDate which does the API get call
As we are doing a API call, current functional component will need to be replaced by Class component.
By replacing the jsx-loader with babel and configuring the project to run ES6, this component will load
    
    
  Completed Tasks:
    1) we were able to utilize passport to create google-sign on 
    2) we were able to check and make sure only users with @ucdavis.edu can log in 
    3) we were able to create and save to our database 
    4) were able to create RESTFUL API routes to get graduates and upload to our database
    5) we were able to provide a ecs163 API to upload images and generate a link 
    
  Un-Completed Tasks:
    1) We were unable to create a RESTFUL POST to update a user's new profile picture because we couldnt 
      add HTTP request to our front-end and that is necessary inorder for this feature to be implemented. 
