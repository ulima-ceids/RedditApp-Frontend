import React from "react";

function ForgotPassword(){
    return(
        <div>
            <div>
                <h1>Recuperación de cuenta</h1>
                <p>
                    Para poder recuperar la cuenta por favor ingresa el correo que has ingresado para registrarte, 
                    se te enviará un correo con un código para poder reestablecer la contraseña
                </p>
                <input type="email" placeholder="Ingresa tu correo"></input>
                <button>Obtener código</button>
                <input type="text" placeholder="Ingresa el código"></input>
                <button>Enviar código</button>
                
            </div>
        </div>
    )
}

export default ForgotPassword;