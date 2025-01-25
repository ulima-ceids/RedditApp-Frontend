import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';

function Register() {
    const { register, handleSubmit,formState: {errors}} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <div className="container">
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className='mb-3'>
            <label htmlFor="text" className='form-label'>
                Nombre
            </label>
            <input 
                type="text" 
                className='form-control'
                id='name'
                {...register('name')}
            />
            </div>
            {/* Lastname */}
            <div className='mb-3'>
            <label htmlFor="text" className='form-label'>
                Apellido
            </label>
            <input 
                type="text" 
                className='form-control'
                id='lastname'
                {...register('lastname')}
            />
            </div>
            {/*Birthdate */}
            <div>
            <label htmlFor="date" className="form-label">
                Fecha de Nacimiento 
            </label>
            <input
                type="date"
                className="form-control"
                id="birthdate"
                {...register('birthdate')}
            />
            </div>
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
                {...register("password", {required:"La contraseñano puede estar vacía", minLength:{value:6, message:"La contraseña debe tener al menos 6 caracteres"}})}
            />
            {errors.password &&<span>{errors.password.message}</span>}
            </div>
            {/* Repeat Password */}
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
                Repetir Contraseña
            </label>
            <input
                type="password"
                className="form-control"
                id="repeatpassword"
                {...register("repeatpassword", {required:"No puede estar vacía", validate: value => value === password || "Las contraseñas no coinciden"})}
            />
            {errors.repeatpassword &&<span>{errors.repeatpassword.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary">
            Crear Cuenta
            </button>
        </form>
        </div>
    );
}
export default Register;
