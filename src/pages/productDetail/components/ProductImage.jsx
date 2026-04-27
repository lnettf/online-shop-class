import style from "./ProductImage.module.css"
export const ProductImage = ({ imageUrl }) => {
    return (
        <div className={style.container}>
            <img className={style.img} src={imageUrl} alt="" />
        </div>
    )
}