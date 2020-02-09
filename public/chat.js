const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let ouput = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',() =>{
    //Enviar esos datos al servidor a través del evento que he creado
    let datos = socket.emit('chat:message',{
        username: username.value,
        message: message.value
    });

    console.log('funciona');

});

//Hacer el evento cuando esté tipeando 
message.addEventListener('keypress',() =>{
    console.log(username.value);
    socket.emit('chat:typing', username.value);
    
})

//El cliente también puede recibir datos (escuchando on)
socket.on('chat:message',(data) =>{
    ouput.innerHTML += `<p> 
        <strong>${data.username} </strong> :${data.message}
    </p>`
})

//Escucha para el socket de typing

socket.on('chat:typing', (data)=>{
    
    //Cuando haya enviado el mensaje que lo coloque en blanco
    actions.innerHTML = '';
    actions.innerHTML = `
        <p><em> ${data} is typing message </em> </p>
    `
})





