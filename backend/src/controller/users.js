const { request, response } = require("express");
const User = require("../models/user");

// Obtener todos los usuarios
const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los usuarios" });
    }
};

// Obtener un usuario por ID de MongoDB
const getUserById = async (req = request, res = response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener el usuario" });
    }
};

module.exports = {
    getUsers,
    getUserById
};