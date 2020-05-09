const orm = require("../config/orm")

function burger(name) {
  this.name = name;
  this.devoured = false;
}

burger.selectBurgers = function () {
  return new Promise((resolve, reject) => {
      orm.selectAll("BURGERS").then(results => {
          resolve(results);
      }).catch(() => {
          reject("Could not get burgers");
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
      }).catch(() => {
          reject("Could not add burger");
      });
  });
};

burger.updateDevoured = function (burgerId) {
  return new Promise((resolve, reject) => {
      orm.updateOne("BURGERS", "DEVOURED", true, "ID", burgerId).then(results => {
          resolve(results);
      }).catch(() => {
          reject("Could not update burger");
      });
  });
};

module.exports = burger;