var game = new Game();

game.getAll().then(data => {
  displayGamesListHtml(data);
});

function displayGamesListHtml(data) {
  var listElement = document.getElementById("list-games");
  for (var i = 0; i < data.length; i++) {
    var game = data[i];
    var template = document.getElementById("template");
    var clonedElement = template.cloneNode(true);
    var linkElement = clonedElement.querySelector("a");
    var titleElement = clonedElement.querySelector("h3");
    var imgElement = clonedElement.querySelector("img");
    var detailsButton = clonedElement.querySelector("#details");
    var editButton = clonedElement.querySelector("#edit");
    var deleteButton = clonedElement.querySelector("#delete");

    clonedElement.id = game._id;
    linkElement.href = "gameDetails.html?id=" + game._id;
    titleElement.innerText = game.title;
    imgElement.src = game.imageUrl;
    detailsButton.id = detailsButton.id + game._id;
    editButton.addEventListener("click", editGame);
    deleteButton.addEventListener("click", deleteGame);
    addClickEvent(detailsButton, game._id);
    listElement.appendChild(clonedElement);
  }
}

function computeComputeInfoFromEvent(event) {
  var grandparentElement = event.target.parentElement.parentElement;
  var gameId = grandparentElement.id;
  return {
    gameElement: grandparentElement,
    gameId: gameId
  };
}

function addClickEvent(detailsButton, id) {
  detailsButton.addEventListener("click", function() {
    location.href = "gameDetails.html?id=" + id;
  });
}

function editGame(event) {
  var gameInfo = computeComputeInfoFromEvent(event);
  var editButton = event.target;
  var labelElement = document.createElement("label");
  var inputElement = document.createElement("input");
  var saveElement = document.createElement("button");
  var cancelElement = document.createElement("button");

  editButton.setAttribute("disabled", true);

  gameInfo.gameElement.appendChild(labelElement);
  gameInfo.gameElement.appendChild(inputElement);
  gameInfo.gameElement.appendChild(saveElement);
  gameInfo.gameElement.appendChild(cancelElement);

  labelElement.innerHTML = "Title: ";
  labelElement.style.color = "white";
  labelElement.style.fontWeight = "750";
  inputElement.style.fontSize = "16px";
  inputElement.style.boxShadow = "0 2px 3px 2px #D05093";
  inputElement.style.margin = "10px 0";
  inputElement.style.fontWeight = "750";
  inputElement.style.color = "#D05093";
  inputElement.style.borderRadius = "6px";
  inputElement.style.textAlign = "center";

  saveElement.style.boxShadow = "0 2px 3px 1px #D05093";
  saveElement.style.backgroundColor = "#33bdef";
  saveElement.style.border = "1px solid #5b6178";
  saveElement.style.color = "white";
  saveElement.style.fontSize = "18px";
  saveElement.style.fontWeight = "bold";
  saveElement.style.padding = "4px 16px";
  saveElement.style.cursor = "pointer";
  saveElement.style.margin = "5px 0";
  saveElement.innerHTML = "Save";

  cancelElement.style.boxShadow = "0 2px 3px 1px #D05093";
  cancelElement.style.backgroundColor = "#33bdef";
  cancelElement.style.border = "1px solid #5b6178";
  cancelElement.style.color = "white";
  cancelElement.style.fontSize = "18px";
  cancelElement.style.fontWeight = "bold";
  cancelElement.style.padding = "4px 8px";
  cancelElement.style.cursor = "pointer";
  cancelElement.style.margin = "5px 0";
  cancelElement.innerHTML = "Cancel";

  saveElement.addEventListener("mouseleave", () => {
    saveElement.style.boxShadow = "0 2px 3px 1px #D05093";
    saveElement.style.backgroundColor = "#33bdef";
    saveElement.style.border = "1px solid #5b6178";
    saveElement.style.borderRadius = "0";
    saveElement.style.color = "white";
    saveElement.style.fontSize = "18px";
    saveElement.style.fontWeight = "bold";
    saveElement.style.padding = "4px 16px";
    saveElement.style.cursor = "pointer";
  });

  saveElement.addEventListener("mouseenter", () => {
    saveElement.style.borderRadius = "32px";
    saveElement.style.color = "#D05093";
  });

  cancelElement.addEventListener("mouseleave", () => {
    cancelElement.style.boxShadow = "0 2px 3px 1px #D05093";
    cancelElement.style.backgroundColor = "#33bdef";
    cancelElement.style.border = "1px solid #5b6178";
    cancelElement.style.borderRadius = "0";
    cancelElement.style.color = "white";
    cancelElement.style.fontSize = "18px";
    cancelElement.style.fontWeight = "bold";
    cancelElement.style.padding = "4px 8px";
    cancelElement.style.cursor = "pointer";
  });

  cancelElement.addEventListener("mouseenter", () => {
    cancelElement.style.borderRadius = "32px";
    cancelElement.style.color = "#D05093";
  });

  saveElement.addEventListener("click", clickSaveEvent => {
    var titleValue = inputElement.value;
    game.update(gameInfo.gameId, titleValue).then(data => {
      if (titleValue) {
        gameInfo.gameElement.querySelector("h3").innerHTML = data.title;
        labelElement.style.display = "none";
        inputElement.style.display = "none";
        saveElement.style.display = "none";
        cancelElement.style.display = "none";
      } else {
        alert("This field is empty ");
      }
    });
  });
  cancelElement.addEventListener("click", () => {
    labelElement.style.display = "none";
    inputElement.style.display = "none";
    saveElement.style.display = "none";
    cancelElement.style.display = "none";
  });
}

function deleteGame(event) {
  var gameInfo = computeComputeInfoFromEvent(event);
  game.delete(gameInfo.gameId).then(function() {
    gameInfo.gameElement.remove();
  });
}
