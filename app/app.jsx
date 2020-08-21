const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;


/* Import Components */
const SplashPage = require('./components/SplashPage.jsx');
const GradPage = require('./components/GradPage.jsx');
//const Googlelogin = require ('./components/Googlelogin.jsx');
const ProfileEditPage = require('./components/ProfileEditPage.jsx');
const SearchPage = require('./components/SearchPage.jsx');
const displayGrads = require('./components/displayGrads.jsx');

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path="/" component={SplashPage}/>
      <Route exact path="/GradPage" component={GradPage}/>
      <Route exact path="/ProfileEditPage" component={ProfileEditPage}/>
      <Route exact path="/SearchPage" component={SearchPage}/>
      <Route exact path="/displayGrads" component={displayGrads}/>
      

    </div>
  </BrowserRouter>), document.getElementById('main') );