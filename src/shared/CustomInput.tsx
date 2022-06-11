import { useState } from 'react'

type CustomInputType = {
    placeholder?: string
    type?: string
    renderProp: any
}

export function CustomInput(props: CustomInputType) {

    const { placeholder, type, renderProp } = props
    const [value, setValue] = useState<string>("");

    const handleChange = (evt: any) => {
        setValue(evt.target.value)
    }

    return (
        <>
            <input placeholder={placeholder}
                type={type}
                style={{ borderRadius: 4, padding: 16 }}
                value={value}
                onChange={handleChange} />
            {renderProp(value)}
        </>)
}
