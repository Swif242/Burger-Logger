const connection = require("./connection.js");






const orm = {
    selectAll: function (tableName) {
        const query = "SELECT * FROM ??";
        return new Promise((resolve, reject) => {
            connection.query(query, [tableName], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    insertOne: function (tableName, obj) {
        const query = "INSERT INTO BURGERS SET ?";
        return new Promise((resolve, reject) => {
            connection.query(query, obj, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    updateOne: function (tableName, updCol, updVal, idCol, objId) {
        const query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [tableName, updCol, updVal, idCol, objId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};


// Export the orm object for the model (cat.js).
module.exports = orm;
