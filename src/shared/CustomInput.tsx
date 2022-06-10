
import { useState } from "react";

export function CustomInput({ placeholder = "", type = "text" }) {
    const [value, setValue] = useState("");

    const handleChange = (evt: any) => {
        setValue(evt.target.value)
    }

    return (<input placeholder={placeholder}
        type={type}
        style={{ borderRadius: 4, padding: 16 }}
        value={value}
        onChange={handleChange} />);
}
