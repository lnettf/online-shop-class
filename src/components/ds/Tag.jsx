
import style from "./Tag.module.css"
export const Tag = ({ text }) => {
    return (
        <div className={style.tag}>
            {text}
        </div>
    )
}