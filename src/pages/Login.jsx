import React from "react";
import { useForm } from 'react-hook-form';
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { register , handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    const goToHome = () => {
        console.log("Go to Forgot Password");
        navigate("/forgotpassword")
      };

    return (
        <div className="container">
            <h1>Iniciar Sesion</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register('email')}
                    />
                </div>
                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", { required: "La contraseñano puede estar vacía" })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary" onClick={goToHome}>   
                    Iniciar Sesion
                </button>
            </form>
        </div>
    );
}

export default Login;