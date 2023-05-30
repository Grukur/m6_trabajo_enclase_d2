const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use('/jquery', express.static(__dirname+'/node_modules/jquery/dist/'))

const PORT = 3000;
app.listen(PORT, () =>
    console.log("Servidor escuchando en http://localhost:" + PORT)
);



//RUTAS
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let usuarios = [
    {
        id: 1,
        nombre: "Pedro",
        apellido: "Soto",
    },
    {
        id: 2,
        nombre: "Mario",
        apellido: "Sepulveda",
    },
];

//ENPOINTS
//RETORNA USUARIOS
app.get("/usuarios", (req, res) => {
    res.send(usuarios);
});

//AGREGA UN NUEVO USUARIO
app.post("/usuarios", (req, res) => {
    let { nombre, apellido } = req.body;
    let nuevoUsuario = {
        id: uuidv4().slice(0, 6),
        nombre,
        apellido,
    };
    usuarios.push(nuevoUsuario);
    res.status(201).send({
        message: "Usuario creado correctamente.",
        usuario: nuevoUsuario,
    });
});

//ELIMINAR UN USUARIO
app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;   
    if(usuarios.find(usuario => usuario.id == id)){
        usuarios = usuarios.filter(usuario => usuario.id != id)
        res.send({message: 'Usuario eliminado'})
    } else {
        res.status(404).send({message: 'Usuario no encontrado'})        
    }
})

//FILTRO USUARIO
app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;  
    /* console.log(id)  */
    let usuario = usuarios.find(usuario => usuario.id == id)
    if(usuario){

        res.send(usuario)
    } else {
        res.status(404).send({message: 'Usuario no encontrado'})
                
    }
})

//UPDATE USUARIO
app.put("/usuarios/:id", (req, res) => {
       
    const id = req.params.id;  
    /* console.log(id)  */
    let usuario = usuarios.find(usuario => usuario.id == id)
    if(usuario){
        let { nombre, apellido } = req.body;
        usuario.nombre = nombre;
        usuario.apellido = apellido;   
        res.send(usuario)
    } else {
        res.status(404).send({message: 'Usuario no encontrado'})
                
    }
    

});