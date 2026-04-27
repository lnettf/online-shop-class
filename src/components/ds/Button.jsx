import style from "./Button.module.css"

export const Button = ({ children, icon, onClick }) => {
    return (
        <button className={style.button} onClick={onClick}>
            {icon}
            {children}
        </button>
    )
}