//Trabajar con directorios
const path = require('path');
/* importar express*/
const express = require('express');
/*Inicializar express*/
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//static file
app.use(express.static(path.join(__dirname + '/public')));

//Iniciar el servidor
const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
});


//websockets
const SocketIO = require('socket.io');

//Ejecutar Socket pasándole el servidor inicializado
const io = SocketIO(server);

io.on('connection', (socket) =>{
    console.log('New connection', socket.id);
    /*Configurar el evento que le estoy enviando al servidor  
    Escuchando el evento */

    socket.on('chat:message',(data) =>{

    //emitiendo un evento con datos desde el servidor
    //Enviarle los datos al navegador
    io.sockets.emit('chat:message',data);
    })

    //Escuchando el evento cuando el usuario esté tipeando
    socket.on('chat:typing',(data)=>{
       
        //No quiero ver si propio typing
        //Emitir el evento a todos excepto a mí (broadcast)
        socket.broadcast.emit('chat:typing', data);
    })
    
});

