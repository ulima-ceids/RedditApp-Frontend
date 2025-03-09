import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Password, Calendar } from './components/Form';
import UsuarioApi from './api/usuario';

const SignUp = () => {
  const navigate: NavigateFunction = useNavigate();
  
  interface Usuario {
    codigoUlima: string;
    nombre: string;
    apellidos: string;
    genero: '' | 'M' | 'F' | 'O' | 'p';
    password: string;
    fechaNacimiento: string;
  }

  const defaultUsuario: Usuario = {
    codigoUlima: '',
    nombre: '',
    apellidos: '',
    genero: '',
    password: '',
    fechaNacimiento: ''
  };
  const [usuario, setUsuario] = useState<Usuario>(defaultUsuario);
  const [password2, setPassword2] = useState<string>('');
  //setEdad(Math.floor(dif/(1000*60*60*24*365.25)))

  const ValidarCuenta = () => {
    const ExisteCorreo = (correo: string) => {
      //const u = usuarios.find((u) => u.correo == correo)
      //return (u !== undefined);
      return false;
    }
    
    //Correo institucional
    if (ExisteCorreo("")) {
      alert("Ese correo institucional ya está en uso");
      return false;
    }
    return true;
  }

  const handleSubmit = async() => {
    if (ValidarCuenta()) {
      const aux = {
        ...usuario,
        fechaNacimiento: new Date(usuario.fechaNacimiento)
      };
      const res = await UsuarioApi.register(aux);
      if (res.msg !== "") {
        alert(res.msg);
      } else {
        alert("¡Cuenta creada exitosamente!");
        //window.localStorage.setItem("token", res.token);
        console.log(res.usuario);
        navigate("/profile");
      }
    }
  }

  const handleChange = (field: keyof typeof usuario) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsuario(prev => ({ ...prev, [field]: e.target.value }));
  }

  const validarContraseña = (input: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    const distinct: number = new Set(input.value).size;
    input.setCustomValidity(distinct < 3?  "La contraseña debe tener al menos 3 caracteres diferentes." : "");
  }

  const validarRepetirContraseña = (input: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    input.setCustomValidity(input.value !== usuario.password? "Las contraseñas no coinciden.": "");
  }

  const [maxDate, setMaxDate] = useState<string>('');
  useEffect(() => {
    const hoy: string = new Date().toISOString().split("T")[0];
    setMaxDate(hoy);
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input label="Código" required value={usuario.codigoUlima} onChange={handleChange("codigoUlima")} pattern="[0-9]{8}" maxLength={8} />
        <Input label="Nombre" required value={usuario.nombre} onChange={handleChange("nombre")} pattern="[A-Za-z ÁÉÍÓÚáéíóúÑñ]{2,}" />
        <Input label="Apellidos" required value={usuario.apellidos} onChange={handleChange("apellidos")} pattern="[A-Za-z ÁÉÍÓÚáéíóúÑñ]{2,}" />
        <Select label="Género" required options={["Masculino", "Femenino", "Otro", "prefiero no decirlo"]} value={usuario.genero} name="id_genero" onChange={handleChange("genero")} />
        <Password label="Contraseña" required value={usuario.password} name="password" onChange={(e) => {setUsuario({...usuario, password: e.target.value}); validarContraseña(e.target);}} minLength={8} />
        <Password label="Repite tu contraseña" required value={password2} name="password2" onChange={(e) => {setPassword2(e.target.value); validarRepetirContraseña(e.target);}} />
        <Calendar label="Nacimiento" required value={usuario.fechaNacimiento} onChange={handleChange("fechaNacimiento")} maxDate={maxDate}/>
      </Form>
    </div>
  )
};

export default SignUp;