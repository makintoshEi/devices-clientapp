import { ChangeEventHandler } from "react"

type CustomInputType = {
    placeholder?: string
    type?: string
    value: any
    handleChange: ChangeEventHandler
}

export function CustomInput(props: CustomInputType) {
    const { handleChange, placeholder, type, value } = props
    return (<input placeholder={placeholder}
        type={type}
        style={{ borderRadius: 4, padding: 16 }}
        value={value}
        onChange={handleChange} />);
}
