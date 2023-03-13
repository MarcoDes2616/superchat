const { Router } = require("express");
const { createUser, getAllUser, updateUser } = require("../controllers/user.controllers");
// const {
//   createUserValidator,
//   updateUserValidator,
// } = require("../validators/user.validators");


const router = Router();

router.post("/api/v1/users/create", createUser); //crear usuario

router.get("/api/v1/users", getAllUser); // obtener todos los usuarios

router.put("/api/v1/users/:id", updateUser); // actualizar usuario

module.exports = router;

