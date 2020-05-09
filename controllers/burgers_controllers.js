const express = require("express");
const routes = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
routes.get("/", function (req, res) {
    burger.selectBurgers().then(result => {
        //This will populate results based on burger status
        let devoured = result.filter(b => b.devoured === 1);
        let notDevoured = result.filter(b => b.devoured === 0);
        res.render("index", {
            notDevouredList: notDevoured,
            devouredList: devoured
        });
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.get("/api/burger", (req, res) => {
    burger.selectBurgers().then((err, result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.post("/api/burger", (req, res) => {
    if (!req.body.name) {
        res.status(500).send({ error: "Burger name is Required" });
    }

    let newBurger = {
        name: req.body.name,
        devoured: false
    };

    burger.create(newBurger).then(id => {
        res.json(id);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

routes.put("/api/burger/:id", (req, res) => {
    burger.updateDevoured(req.params.id).then(result => {
        res.json(result);
    }).catch((err) => {
        res.status(500).send({ error: err });
    });
});

module.exports = routes;