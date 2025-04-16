import React from 'react'
import { Link } from 'react-router-dom'
import css from './LatestList.module.css'
const LatestList = () => {
  return (
    <section className={css.listCon}>
      <h2>Shop The Latest</h2>
      <Link to={'/shop'} className={css.more}>
        View All
      </Link>
      <ul className={css.list}>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
    </section>
  )
}

export default LatestList
