//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

var surrogateKey = 1

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogateKey++
    req.body.status = "pending"
    tasks.push(req.body);
    res.send("OK");
    res.send(req.body);
    res.send(req)
});
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});
  app.delete('/tasks/:Id',(req,res)=>{
    let Id = req.params.Id;
    console.log(Id)
    function eliminarPorId(Id){
        tasks.forEach(function(currentValue, index, arr){
        if(tasks[index].id==Id){
            tasks.splice(index, index);    
            res.json("{ Se elimino la tarea correctamente }"); 
         } 
        })
      }
    eliminarPorId(Id)
})
app.put('/tasks/:Id', jsonParser, (req,res)=>{
    let Id = req.params.Id;
    console.log(Id)
    function editar(Id){
        tasks.forEach(function(currentValue, index, arr){
        if(tasks[index].id==Id){
            tasks[index].title = req.body.title
            tasks[index].detail = req.body.detail    
            res.json("{ Se realizaron las modificaciones con exito }");   
         }   
        })
      }
      editar(Id)
    });
    app.put('/tasks/status/:Id', jsonParser, (req,res)=>{
        let Id = req.params.Id;
        console.log(Id)
        function editarEstado(Id){
            tasks.forEach(function(currentValue, index, arr){
            if(tasks[index].id==Id){
                tasks[index].status = req.body.status      
                res.json("{ Se cambio el extado con exito }");   
             }
            })
          }
          editarEstado(Id)
        });
app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});