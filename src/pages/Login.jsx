import React from "react";
import { useForm } from 'react-hook-form';
import "./Login.css";

function Login() {
    const { register , handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
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
                <button type="submit" className="btn btn-primary">
                    Iniciar Sesion
                </button>
            </form>
        </div>
    );
}

export default Login;