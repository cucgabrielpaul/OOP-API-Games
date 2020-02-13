var baseUrl = "https://games-api-siit.herokuapp.com";

class Game {
  constructor(options = {}) {
    this.id = options.id;
  }
  getAll() {
    return fetch(baseUrl + "/games").then(response => {
      console.log("getAll() response :", response);

      if (response.ok) {
        return response.json();
      }

      throw new Error("Error status : ", response.status);
    });
  }

  get() {
    return fetch(baseUrl + "/games/" + this.id).then(response => {
      console.log("get() response", response);

      if (response.ok) {
        return response.json();
      }

      throw new Error("Error status : ", response.status);
    });
  }

  update(id, title) {
    return fetch(baseUrl + "/games/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({ title: title })
    })
      .then(response => {
        console.log("update(id, title) response", response);

        if (response.ok) {
          return response.json();
        }

        throw new Error("Error status : ", response.status);
      })
      .catch(error => console.log(error));
  }

  delete(gameId) {
    return fetch(baseUrl + "/games/" + gameId, { method: "DELETE" }).then(
      () => {
        console.log("delete(gameId) response", gameId);
      }
    );
  }

  deleteAll() {
    return fetch(baseUrl + "/games", { method: "DELETE" }).then(response => {
      console.dir(response);
    });
  }

  regenerate() {
    var url = baseUrl + "/regenerate-games";
    return fetch(url).then(() => {
      location.reload(true);
    });
  }

  create(game) {
    console.log("game", game, JSON.stringify(game));
    return fetch(baseUrl + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error status : ", response.status);
      })
      .catch(error => console.log(error));
  }
}
