const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('views'));
app.set("view engine","ejs");

app.use(session({
    secret: "sdnjasfgaskfujbasgufjkig",
    resave: true,
    saveUninitialized: true
}));

app.get("/", (req,res) => {
    if(req.session.auth){
        res.render("index",{
            titulo: "Inicio",
            usuario : req.session.usuario
        });
    }else{
        res.redirect("/login");
    }

});

app.get("/login",(req,res) => {
    if(req.session.auth){
       res.redirect("/");
    }else{
        res.render("login",{
            titulo: "Login"
        });
    }
});

app.post("/login",(req,res) => {
    //Se creara conexion a base de datos PostgreSQL
    if(req.body.user == "ivan" && req.body.pass == 123){
        req.session.auth = 1;
        req.session.usuario = "Ivan";
        res.send({
            status : 1,
            nombre : "Ivan"
        });
    }else{
        res.send({
            status : "Datos incorrectos"
        });
    }
});

app.get("/salir",(req,res) => {
    req.session.auth = null;
    req.session.nombre = null;
    res.redirect("/");
});

app.listen(80,() => {
    console.log("Corriendo en el puerto 80");
});