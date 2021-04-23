    const mensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#fr')
    const lista = document.querySelector('#lista')
    const usuario=document.querySelector('#usuario')
    const texto=document.querySelector('#texto')
    const socket = io()
    let idusuario
    socket.on('connect', () => {

        idusuario = socket.id

    })
    mensaje.addEventListener('keypress',(e)=>{

        socket.emit('Digitar',usuario.value)

    })

    socket.on('digitar usuario', usuario =>{
        texto.innerHTML = ` <p> ${usuario}Esta escribiendo</p>`

    })

    formulario.addEventListener('submit', (e) => {
        const nombusuario= usuario.value
        const menusuario = mensaje.value
        mensaje.value=''
        socket.emit('message:send', {
            usuario: nombusuario,
            mensaje: menusuario  
        })
        e.preventDefault()
        texto.innerHTML = ''
    })
    socket.on('user:connect', (id) => {
        console.log(id);

        let template = ` 
   <li class="list-group-item">
                                <center class="text-muted">${id} joined!</center>
                            </li>
   `
        lista.innerHTML = lista.innerHTML + template
    })
    socket.on('user:disconnect', (id) => {
        let template = ` 
   <li class="list-group-item">
      <center class="text-muted">${id} left!</center>
      </li>
   `
        lista.innerHTML = lista.innerHTML + template
    })
    socket.on('message:send', (data) => {
      let template = ''
        if (data.id == idusuario) {
            template = ` 
        <li class="list-group-item">
             <div class="row">
                 <div class="col-md-11">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class=" row fw-bold">
                                            ${data.message.usuario}
                                        </div>
                                        
                            </div>
                                <div class="d-flex flex-row-reverse bd-highlight">    

                                        <div class="row">
                                           ${data.message.mensaje}
                                        </div>
                                    </div>    
                                    </div>
                                    <div class="col-md-1">
                                        <img src="data:image/png;base64,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"
                                            class="img-circle" width="80%">
                                    </div>
                                </div>
                            </li>
                            

        `
        }else {
            template = ` 
            <li class="list-group-item">
                 <div class="row">
                                    <div class="col-md-1">
                                        <img src="data:image/png;base64,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"
                                            class="img-circle" width="80%">
                                    </div>
                                    <div class="col-md-11">
                                        <div class=" row fw-bold">
                                            ${data.message.usuario}
                                        </div>

                                        <div class="row">
                                           ${data.message.mensaje}
                                        </div>
                                    </div>
                                </div>
                            </li>
        `
          
        }
       
        lista.innerHTML = lista.innerHTML + template
    })