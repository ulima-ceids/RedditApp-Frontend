import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Email, Input, Select, Password, Calendar } from './Form'

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
  
  const ExisteCorreo = (correo: string) => {
    //const u = usuarios.find((u) => u.correo == correo)
    //return (u !== undefined);
    return false;
  }

  const ValidarCuenta = () => {
    //Correo institucional
    if(ExisteCorreo(usuario.correo)){
      alert("Ese correo institucional ya está en uso")
      return false;
    }
    return true;
  }

  const handleChange = (field: keyof typeof usuario) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsuario(prev => ({ ...prev, [field]: e.target.value }));
  };

  const [maxDate, setMaxDate] = useState<string>('')
  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    setMaxDate(hoy);
  }, []);

  const validarContraseña = (input: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    const value = input.value;

    if (new Set(value).size < 3) {
      input.setCustomValidity("La contraseña debe tener al menos 3 caracteres diferentes.");
    } else {
      input.setCustomValidity("");
    }
  };

  const validarRepetirContraseña = (input: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    if (input.value !== usuario.password) {
      input.setCustomValidity("Las contraseñas no coinciden.");
    } else {
      input.setCustomValidity("");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Email label="Correo" required value={usuario.correo} onChange={handleChange("correo")} pattern="[0-9]{8}@aloe\.ulima\.edu\.pe" />
        <Input label="Nombre" required value={usuario.nombre} onChange={handleChange("nombre")} pattern="[A-Za-z ÁÉÍÓÚáéíóúÑñ]{2,}" />
        <Input label="Apellidos" required value={usuario.apellidos} onChange={handleChange("apellidos")} pattern="[A-Za-z ÁÉÍÓÚáéíóúÑñ]{2,}" />
        <Select label="Género" required options={["Masculino", "Femenino", "Otro", "Prefiero no decirlo"]} value={usuario.id_genero} name={"id_genero"} onChange={handleChange("id_genero")} />
        <Password label="Contraseña" required value={usuario.password} name={"password"} onChange={(e) => {setUsuario({...usuario, password: e.target.value}); validarContraseña(e.target);}} minLength={8} />
        <Password label="Repite tu contraseña" required value={password2} name={"password2"} onChange={(e) => {setPassword2(e.target.value); validarRepetirContraseña(e.target);}}/>
        <Calendar label="Nacimiento" required value={usuario.nacimiento} onChange={handleChange("nacimiento")} maxDate={maxDate}/>
      </Form>
    </div>
  );
};

export default SignUp;