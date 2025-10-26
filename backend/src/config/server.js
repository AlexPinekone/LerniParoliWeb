require('dotenv').config();

const express = require("express");
const  cors = require("cors");
const connectDB = require("./database");


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.lessonsPaths = "/api/lessons"
        this.theoryPath = "/api/theories"
        this.practicePath = "/api/practices";
        this.authPath = "/api/auth";
        this.coursesPath = "/api/courses";
        this.lessonsUserPath = "/api/lessons-user"
        this.usersPath = "/api/users"

        this.app.use(cors());
        this.app.use(express.json())


        this.routes()
        connectDB();
    }
    
    routes(){
        this.app.use(this.lessonsPaths, require("../routes/lessons"));
        this.app.use(this.theoryPath, require("../routes/theories"));
        this.app.use(this.practicePath, require("../routes/practices"));
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.coursesPath, require("../routes/courses"));
        this.app.use(this.lessonsUserPath, require("../routes/lessonsUser"));
        this.app.use(this.usersPath, require("../routes/users"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando el puerto ${this.port}`);
        });
    }
}

module.exports = Server;