import React, { createContext, useContext, memo } from "react";

const FormContext = createContext<boolean>(false);

const useFormCheck = () => {
    const isInsideForm = useContext(FormContext);
    if (!isInsideForm) throw new Error("Este componente solo puede usarse dentro de <Form>");
}

interface FieldWrapperProps {
    label: string;
    required: boolean;
    children: React.ReactNode;
    id: string
}

const FieldWrapper: React.FC<FieldWrapperProps> = memo(({ label, required, children, id }) => {

    const Asterisco = () => (
        <span style={{color: "red", fontWeight: "bold", paddingLeft: "2px"}}>*</span>
    )

    return (
        <div style={{ display: "flex", padding: "10px 0px" }}>
            <label htmlFor={id} style={{width: "170px"}}>{label}{required?<Asterisco />:null}</label>
            {children}
        </div>
    )
});

interface FormProps {
    onSubmit: () => void,
    children: React.ReactNode
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <FormContext.Provider value={true}>
            <form onSubmit={handleSubmit} style={{paddingLeft: "10px", maxWidth: "800px"}}>
                {children}
                <button type="submit" style={{width: "100%"}}>Enviar</button>
            </form>
        </FormContext.Provider>
    )
};

interface Field {
    name?: string, //=label en minúscula
    required?: boolean, //=false
    label: string,
    value: string,
    options?: string[], // Para selects
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    pattern?: string,
    minLength?: number,
    maxLength?: number,
    maxDate?: string
}

const createField = (type: string, style: React.CSSProperties = null) => memo(({ label, value, required = false, name, onChange, pattern, minLength, maxLength, maxDate }: Field) => {
    useFormCheck();
    const id = name ?? label.toLowerCase();

    return (
        <FieldWrapper label={label} required={required} id={id}>
            <input style={{...style, flex: "1" }} title="falta title y placeholder" placeholder="falta title y placeholder" minLength={minLength} maxLength={maxLength} type={type} pattern={pattern} id={id} value={value} onChange={onChange} required={required} max={maxDate} />
        </FieldWrapper>
    )
});

const Email = createField("email");
const Input = createField("text");
const Password = createField("password");
const Calendar = createField("date", { textAlign: "right", paddingRight: "3px" });

const Select = memo(({ label, value, required = false, options, name, onChange }: Field) => {
    useFormCheck();
    const id = name ?? label.toLowerCase();

    return(
        <FieldWrapper label={label} required={required} id={id}>
            <select style={{flex: "1", direction: "rtl", paddingRight: "13px"}} id={id} value={value} onChange={onChange} required={required}>
                <option value="" disabled>Selecciona una opción</option>
                { options.map((option, index) => (<option key={index} value={option[0]}>{option}</option>)) }
            </select>
        </FieldWrapper>
    )
});

export { Form, Email, Input, Select, Password, Calendar };