import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form, { Field } from './Form'

const SignUp = () => {
  const navigate = useNavigate()
  
  interface Usuario {
    nombre: string;
    apellidos: string;
    correo: string;
    id_genero: string;
    nacimiento: string;
    password: string;
  }

  const defaultUsuario: Usuario = {
    nombre: '',
    apellidos: '',
    correo: '',
    id_genero: '',
    nacimiento: '',
    password: ''
  }
  const [usuario, setUsuario] = useState<Usuario>(defaultUsuario)
  const [password2, setPassword2] = useState<string>('')
  
  const handleSubmit = async() => {
    if(ValidarCuenta()){
      /*const res = await UsuarioApi.register(usuario)
      if(res.data.hasOwnProperty("message")){
        alert(res.data.message)
    }else{*/
      alert("¡Cuenta creada exitosamente!")
      const defaultCredenciales = {
        correo: usuario.correo,
        contrasena: usuario.password
      }
      //const res = await UsuarioApi.login(defaultCredenciales)
      //window.localStorage.setItem("token", res.data.token);
      navigate("/profile")
    }
  }
  
  const actualizarEdad = (value: string) => {
    const f = new Date(value)
    const today = new Date()
    if(f>today){
      alert("Esa fecha todavía no ha transcurrido")
    }else{
      //const dif = today - f;
      //setUsuario({...usuario, nacimiento:value})
      //setEdad(Math.floor(dif/(1000*60*60*24*365.25)));
    }
  }
  
  const ExisteCorreo = (correo: string) => {
    //const u = usuarios.find((u) => u.correo == correo)
    //return (u !== undefined);
    return false;
  }

  const DiferentesContra = (contra: string) => {
    let c: string[] = [];
    for(let i=0; i<contra.length; i++){
      if(!c.includes(contra[i])){
        c.push(contra[i])
      }
    }
    return c.length;
  }

  const ValidarCuenta = () => {
    //Correo institucional
    if(!usuario.correo.includes('@aloe.ulima.edu.pe')){
      alert("Solo se permiten correos institucionales de la Ulima (@aloe.ulima.edu.pe)")
      return false;
    }else if(usuario.correo.length<26){
      alert("El correo institucional está incompleto")
      return false;
    }else if(parseInt(usuario.correo.substring(0,8))<=9999999 || !usuario.correo.endsWith('@aloe.ulima.edu.pe')){
      alert("Formato del correo institucional incorrecto")
      return false;
    }else if(ExisteCorreo(usuario.correo)){
      alert("Ese correo institucional ya está en uso")
      return false;
    }
    //Contraseña
    if(usuario.password!==password2){
      alert("Las contraseñas no coinciden")
      return false;
    }else if(usuario.password.length<7){
      alert(`La contraseña debe tener al menos 8 caracteres (faltan ${8-usuario.password.length})`)
      return false;
    }else if(usuario.password.length<8){
      alert(`La contraseña debe tener al menos 8 caracteres (falta ${8-usuario.password.length})`)
      return false;
    }
    const n = DiferentesContra(usuario.password)
    if(n<2){
      alert(`La contraseña debe tener al menos 3 caracteres diferentes (faltan ${3-n})`)
      return false;
    }else if(n<3){
      alert(`La contraseña debe tener al menos 3 caracteres diferentes (falta ${3-n})`)
      return false;
    }
    //Edad
    if(20 < 16){
      alert("Necesitas tener al menos 16 años")
      return false;
    }
    return true;
  }

  const formData: Field[] = [
    { label: "Correo", type: "email", value: usuario.correo },
    { label: "Nombre", type: "text", value: usuario.nombre },
    { label: "Apellidos", type: "text", value: usuario.apellidos },
    {
      name: "id_genero", label: "Género", type: "select", value: usuario.id_genero,
      options: [ "Masculino", "Femenino", "Otro", "Prefiero no decirlo" ]
    },
    { name: "password", label: "Contraseña", type: "password", value: usuario.password },
    { name: "password2", label: "Repite tu contraseña", type: "password", value: password2 },
    { label: "Nacimiento", type: "date", value: usuario.nacimiento }
  ];

  const handleData = (name: string, value: string | number) => {
    if (name === "password2") {
      setPassword2(value as string);
    } else {
      setUsuario((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <Form fields={formData} setFormData={handleData} onSubmit={handleSubmit} />
    </div>
  );
};

export default SignUp;