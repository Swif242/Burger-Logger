const orm = require("../config/orm")

function burger(name) {
  this.name = name;
  this.devoured = false;
}

burger.selectBurgers = function () {
  return new Promise((resolve, reject) => {
      orm.selectAll("BURGERS").then(results => {
          resolve(results);
      }).catch((error) => {
        console.error(error);
        reject(error)
      });
  });
};

burger.create = function (burger) {
  return new Promise((resolve, reject) => {
      orm.insertOne("BURGERS", {
          burger_name: burger.name,
          devoured: burger.devoured
      }).then(results => {
          // DB generated burgerID
          burger.id = results.insertId;
          resolve(burger.id);
      }).catch((error) => {
        console.error(error);
        reject(error)
      });
  });
};

burger.updateDevoured = function (burgerId) {
  return new Promise((resolve, reject) => {
      orm.updateOne("BURGERS", "DEVOURED", true, "ID", burgerId).then(results => {
          resolve(results);
      }).catch((error) => {
        console.error(error);
        reject(error)
      });
  });
};

module.exports = burger;