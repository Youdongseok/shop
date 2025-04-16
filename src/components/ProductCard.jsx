import React from 'react'
import css from './ProductCard.module.css'

import { Link } from 'react-router-dom'

const ProductCard = ({data}) => {
  return (
    <div className={css.card}>
      <div className={css.imgWrap}>
        <img src={`/public/img/${data.img}`} alt={data.title} />
        <span className={css.cate}>new</span>
        <span className={css.discount}>40%</span>
      </div>
      <div className={css.textWrap}>
        <strong className={css.title}>{data.title}</strong>
        <span className={css.price}>{data.price}</span>
      </div>
      <Link to={`/detail/${data.id}`} className={css.btnGoDetail}></Link>
    </div>
  )
}

export default ProductCard