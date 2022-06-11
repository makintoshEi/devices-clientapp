import { useState } from 'react'

export function CustomInput(props: any) {

    const { placeholder, type, children } = props
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
            {children(value)}
        </>)
}
