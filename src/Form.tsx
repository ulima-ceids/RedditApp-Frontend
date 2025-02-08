import React from "react";

export interface Field {
    name?: string, //=label en minúscula
    required?: boolean, //=true
    label: string,
    type: "text" | "date" | "password" | "email" | "number" | "select",
    value: string,
    options?: string[] // Para selects
}

interface FormProps {
    fields: Field[],
    setFormData: (name: string, value: string) => void,
    onSubmit: () => void
}

const Form: React.FC<FormProps> = ({ fields, setFormData, onSubmit }) => {
    
    const Asterisco = () => {
        return(
            <span style={{color: "red", fontWeight: "bold", paddingLeft: "2px"}}>*</span>
        )
    }

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
        <form onSubmit={handleSubmit} style={{paddingLeft: "10px", maxWidth: "800px"}}>
            {
                fields.map((field) => {
                    const name: string = field.name ?? field.label.toLowerCase();
                    const required: boolean = field.required ?? true;
                    return(
                        <div style={{display: "flex", padding: "10px 0px"}}>
                            <label htmlFor={name} style={{width: "170px"}}>{field.label}{required?? <Asterisco />}</label>
                            {
                                field.type !== "select"?
                                    <input style={{flex: "1", ...(field.type=="date" && {textAlign: "right", paddingRight: "3px"})}} type={field.type} id={name} name={name} value={field.value} onChange={handleChange} required={required}/>
                                :
                                    <select style={{flex: "1", direction: "rtl", paddingRight: "13px"}} id={name} name={name} value={field.value} onChange={handleChange} required={required}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        {
                                            field.options?.map((option, index) => (<option value={index}>{option}</option>))
                                        }
                                    </select>
                            }
                        </div>
                    )
                })
            }
            <button type="submit" style={{width: "100%"}}>Enviar</button>
        </form>
    );
};

export default Form;