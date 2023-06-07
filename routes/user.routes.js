const express = require ("express");
const router = express.Router();

const userSchema = require("../schemas/user.schema")
//create User

router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data)) // que me responda con los datos que le di
    .catch((error) => res.json({message: error}))
});

// get all users

router.get("/users", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data)) // que me responda con los datos que le di
    .catch((error) => res.json({message: error}))
});

// find a user

router.get("/users/:id", (req, res) => { 
    // buscamos lo mismo que antes, agregandole el id
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data)) // que me responda con los datos que le di
    .catch((error) => res.json({message: error}))
});

// update user

router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const {name, age, email, password ,gender} = req.body;
    // buscamos lo mismo que antes, solo que ahora con el metodo put y obtenemos los datos del user
    userSchema
    .updateOne({_id: id}, { $set: {name, age, email, password, gender} }) //$: para que actualice 
    //update one en vez de find, colocamos dos objetos, uno con los datos viejos y otro con los datos nuevos, el _id es para que coincida con como esta en el objeto
    .then((data) => res.json(data)) // que me responda con los datos que le di
    .catch((error) => res.json({message: error}))
});

// delete user 

router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({_id : id})
    .then((data) => res.json(data)) // que me responda con los datos que le di
    .catch((error) => res.json({message: error}))
});


module.exports = router;  