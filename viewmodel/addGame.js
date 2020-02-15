var game = new Game({});

let submitForm = () => {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var genre = document.getElementById("genre").value;
  var releaseDate = document.getElementById("releaseDate").value;
  var publisher = document.getElementById("publisher").value;
  var imageUrl = document.getElementById("imageUrl").value;

  game
    .create({
      title: title,
      genre: genre,
      releaseDate: releaseDate,
      publisher: publisher,
      imageUrl: imageUrl.toString()
    })
    .then(function result() {
      location.href = "./games.html";
    });
};
let backForm = () => (location.href = "./games.html");
