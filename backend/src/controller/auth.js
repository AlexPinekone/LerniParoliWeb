const {response, request} = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const login = async (req = request, res = response) =>{
    const {username, password} = req.body ?? "";

    if(!username || !password){
        res.status(404).json({
            msg: "Datos invalidos"
        });
        return;
    }

    try{
        const user = await User.findOne({ username: username});

        if(!user){
            res.status(401).json({
                msg: "Datos invalidos"
            })
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(401).json({
                msg: "Datos invalidos"
            })
            return;
        }

        jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.SECRET_KEY, {
            expiresIn: "4h"
        }, (error, token)=>{
            if(error){
                console.log(error);
                res.status(500).json({
                    msg: "Error en el servidor"
                });
                return;
            }
            else{
            res.status(200).json({
                msg: "Login exitoso",
                token,
                username: user.username,
                role: user.role
            });
            }
        });
            
       
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const register = async (req = request, res = response) =>{
    const {username, password, mail,} = req.body ?? "";

    if(!username || !password || !mail){
        res.status(404).json({
            msg: "Datos invalidos"
        });
        return;
    }

    try{
        const user1 = await User.findOne({username: username});
        if (user1){
            res.status(400).json({
            msg: "El usuario ya existe"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword,
            mail: mail,
            role: "USER"
        });

        await newUser.save(); 
        res.status(200).json({
            msg: "Registro exitoso"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error del servidor"
        })
        return;
    }
}

module.exports = {
    login,
    register
}