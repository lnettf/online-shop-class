import style from "./ProductImage.module.css"
export const ProductImage = ({ imageUrl }) => {
    return (
        <div className={style.imageContainer}>
            <img src={imageUrl} alt="" />
        </div>
    )
}