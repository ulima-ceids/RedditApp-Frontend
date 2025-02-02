import { useCallback } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Zoom } from "../extra/zoom.js"
import styles from "./iniciar-sesion.module.css";
import UsuarioApi from "../api/usuario.js"


const IniciarSesion = () => {
  Zoom()
  const defaultCredenciales = {
    correo: '',
    contrasena: ''
  }
  const [Credenciales, setCredenciales] = useState(defaultCredenciales);
  const router = useRouter();

  const HandleLogin = async () => {
    const res = await UsuarioApi.login(Credenciales)
    if (res != null){
      window.localStorage.setItem("token", res.data.token);
      onFrameContainer5Click();
    }else{
      alert("Correo o contraseña incorrectos")
    }   
  }

  const onFrameContainer5Click = useCallback (() => {
      router.push("/menu");
  }, [router]);

 // const onINGRESARTextClick = useCallback(() => {
    
 //   router.push("/menu");
 // }, [router]);

  const onCrearCuentaTextClick = useCallback(() => {
    router.push("/crear-cuenta");
  }, [router]);

  return (
    <div id="container">
    <div className={styles.iniciarsesion}>
      <div className={styles.inicioDeSesin}>Inicio de Sesión</div>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.userParent}>
            <img className={styles.userIcon} alt="" src="/user1.svg" />
            <div className={styles.correoInstitucional}>
            <input className={styles.barratexto} type="text" id="correo" value={Credenciales.correo} onChange={e => setCredenciales({...Credenciales,correo: e.target.value})}></input>
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.passwordParent}>
            <img className={styles.passwordIcon} alt="" src="/password.svg" />
            <div className={styles.contrasea}>
            <input className={styles.barratexto2} type="password" id="contrasea" value={Credenciales.contrasena} onChange={e => setCredenciales({...Credenciales,contrasena: e.target.value})}></input></div>
          </div>
          <div className={styles.frame} />
        </div>
      </div>
      <div className={styles.ingresarWrapper} onClick={HandleLogin}>
        <div className={styles.ingresar}>
          INGRESAR
        </div>
      </div>
      <div className={styles.crearCuenta} onClick={onCrearCuentaTextClick}>
        Crear cuenta
      </div>
      <img
        className={styles.iniciarsesionChild}
        alt=""
        src="/rectangle-222.svg"
      />
      <div className={styles.iniciarsesionItem} />
      <div className={styles.iniciarsesionInner} />
      <div className={styles.ellipseDiv} />
      <img
        className={styles.transhumansPachecoIcon}
        alt=""
        src="/transhumans-pacheco@2x.png"
      />
      <div className={styles.iniciarsesionChild1} />
    </div>
    </div>
  );
};

export default IniciarSesion;