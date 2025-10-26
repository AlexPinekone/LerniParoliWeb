const mongoose = require("mongoose");

const connectDB = ()=>{

    mongoose.connect("mongodb://0.0.0.0:27017", {
        dbName: "lerni_db"
    }).then(
        () => {
            console.log("Conexion exitosa con la BD");
        }
    ).catch(
        (error) => {
            console.log("Error de conexion con la BD");
            console.log(error);
        }
    )
}

module.exports = connectDB;