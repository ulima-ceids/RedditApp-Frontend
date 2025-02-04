import React from "react";

export interface Field {
    name: string,
    label: string,
    type: "text" | "date" | "password" | "email" | "number" | "select",
    value: string | number,
    options?: { label: string; value: number }[] // Para selects
}

interface FormProps {
    fields: Field[],
    setFormData: (name: string, value: string | number) => void,
    onSubmit: () => void
}

const Form: React.FC<FormProps> = ({ fields, setFormData, onSubmit }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(name, value)
        /*setFormData((prevData: any) => ({
          ...prevData,
          [name]: value
        }));*/
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit()
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                fields.map((field) => {
                    return(
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {
                                field.type !== "select"?
                                    <input type={field.type} id={field.name} name={field.name} value={field.value} onChange={handleChange} />
                                :
                                    <select id={field.name} name={field.name} value={field.value} onChange={handleChange} >
                                        <option value={-1} disabled={true}>Selecciona una opción</option>
                                        {
                                            field.options?.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))
                                        }
                                    </select>
                            }
                        </div>
                    )
                })
            }
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Form;