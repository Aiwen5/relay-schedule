import styles from "./InputField.module.css"

export default function InputField({ label, placeholder, type, id, pattern, required, name, checked, value, onChange}) {

    return(
        <div className={styles.inputField}>
            <label for={id} className={styles.label}>{label}</label>
            <input 
                type={type} 
                id={id}
                pattern={pattern}
                required={required}
                checked={checked}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    )
}