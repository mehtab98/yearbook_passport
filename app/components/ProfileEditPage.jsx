const React = require('react');
const Link = require('react-router-dom').Link
const useState = require('react').useState
const useEffect = require('react').useEffect

/*
const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};
*/
const ProfileEditPage = function() {
  return (
<div>
  <div class="dot-container">
    <span class="dot-outer"></span>
    <span class="dot-inner"></span>
    <div class="image">
      <img id="cardImg" src="#"/>     
    </div>
  </div>  
  <div class="add-photo"> 
    <input type="file">+</input>
  </div>
  <div class="header">
    <div class="button1"> 
      <button class="logout" type="submit">logout</button>
    </div>
    <div class="search2">
      <div class="search-container">
        <input type="text" placeholder="Search..." name="search"></input>
        <button type="submit">Filter <i class="fa fa-caret-down"></i></button>
      </div>
    </div>
  </div>
  <div class="body">
    <div class="txtarea-wrapper"> 
      <textarea id="info" rows="4" cols="50">
      What would you like to share with your classmates...
      </textarea>
    </div>
    <div class="lower">
      <ul>
        <li>Survey Profile:</li>
        <li>Studies:</li>
        <div class="surveyinput" id="studys-input">
          <input type="text" placeholder="College" name="search"></input>
          <input id="padding" type="text" placeholder="Major" name="search"></input>
        </div>
        <li>Favorite Study Spots:</li>
        <div class="surveyinput" id="study-input">
          <input type="text" placeholder="Study Spots" name="search"></input>
        </div>
        <li>Clubs:</li>
        <div class="surveyinput" id="clubs-input">
          <input type="text" placeholder="Clubs" name="search"></input>
          <a href = '/user/logoff'> 
            <span class="button2"> 
              <button class="logout" type="submit">Save</button>
            </span>
          </a>
        </div>
      </ul>
    </div>
  </div>
</div>

  );
}

module.exports = ProfileEditPage;