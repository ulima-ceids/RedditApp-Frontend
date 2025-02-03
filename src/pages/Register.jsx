import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.css';

function Register() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const onSubmit = (data) => {
        const storedData = JSON.parse(localStorage.getItem('formDataArray')) || [];

        const emailExists = storedData.some(entry => entry.email === data.email);

        if (emailExists) {
            setError('email', { type: 'manual', message: 'Este correo ya está registrado' });
        } else {
            storedData.push(data);
            localStorage.setItem('formDataArray', JSON.stringify(storedData));
            console.log(data);
        }
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
                        {...register('name', {
                            required: 'Este campo es requerido',
                            validate: value => /^[A-Za-z\s]+$/.test(value) || 'El apellido no puede contener números'
                        })}
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
                        {...register('lastname', {
                            required: 'Este campo es requerido',
                            validate: value => /^[A-Za-z\s]+$/.test(value) || 'El apellido no puede contener números'
                        })}
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
                        {...register('birthdate', {
                            required: 'La fecha de nacimiento es requerida',
                            validate: value => {
                                const selectedDate = new Date(value);
                                const currentDate = new Date(Date.now());
                                const age = currentDate.getFullYear() - selectedDate.getFullYear();
                                const month = currentDate.getMonth() - selectedDate.getMonth();
                                const day = currentDate.getDate() - selectedDate.getDate();
                                if (selectedDate > currentDate) {
                                    return 'La fecha de nacimiento no puede ser en el futuro';
                                } else if (age < 16 || (age === 16 && (month < 0 || (month === 0 && day < 0)))) {
                                    return 'Debe tener al menos 16 años';
                                }
                                return true;

                            }
                        }
                        )}
                    />
                    {errors.birthdate && <span>{errors.birthdate.message}</span>}
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
                        {...register('email', {
                            required: 'El email es requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@aloe\.ulima\.edu\.pe$/,
                                message: 'El email debe terminar en @aloe.ulima.edu.pe'
                            }
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
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
                        {...register("password", { required: "La contraseñano puede estar vacía", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
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
                        {...register("repeatpassword", {
                            required: "No puede estar vacía", validate: value => {
                                return value === password.value || "Las contraseñas no coinciden"
                            }
                        })}
                    />
                    {errors.repeatpassword && <span>{errors.repeatpassword.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}
export default Register;
