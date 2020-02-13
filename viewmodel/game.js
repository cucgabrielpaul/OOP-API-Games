var gameId = getQueryValue("id");
var game = new Game({ id: gameId });
game
  .get()
  .then(function(data) {
    displayGameHtml(data);
  })
  .catch(function(error) {
    document.body.innerText = "Invalid post ID :" + error;
  });

function displayGameHtml(data) {
  var h2 = document.querySelector("h2");
  var h3 = document.querySelector("h3");
  var h4 = document.querySelector("h4");
  var body = document.getElementById("game-item");
  var imgElement = document.querySelector("img");
  var pElement = document.querySelector("p");

  h2.innerText = "Title : " + data.title;
  h3.innerText = "Publisher : " + data.publisher;
  h4.innerText = "Date : " + new Date(data.releaseDate).toDateString();
  body.innerHTML = "Game CODE : " + data._id;
  imgElement.src = data.imageUrl;
  pElement.innerHTML = "Description : " + data.description;
}

function getQueryValue(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}
