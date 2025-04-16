import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from './LatestList.module.css'
import '../assets/skeleton.css' // 전역 스켈레톤 스타일

import ProductCard from '../components/ProductCard'
import { getProductsData } from '../api/productsApi'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const LatestList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(6)
  const [selectedLimit, setSelectedLimit] = useState(6) // 현재 선택된 갯수 상태

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProductsData(`category=new&_limit=${limit}`)
        await delay(1500) // 1.5초 지연
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.log("error", error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [limit])

  // 버튼 클릭 시 limit 변경 및 selectedLimit 업데이트
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit)
    setSelectedLimit(newLimit) // 클릭한 버튼을 활성화 상태로 만듦
  }

  return (
    <section className={css.listCon}>
      <div>
        <h2>Shop The Latest</h2>
        <div className={css.numberBtn}>
          <span>상품 표시 갯수</span>
          <button
            className={selectedLimit === 1 ? css.active : ''}
            onClick={() => handleLimitChange(1)}
          >
            1개
          </button>
          <button
            className={selectedLimit === 2 ? css.active : ''}
            onClick={() => handleLimitChange(2)}
          >
            2개
          </button>
          <button
            className={selectedLimit === 4 ? css.active : ''}
            onClick={() => handleLimitChange(4)}
          >
            4개
          </button>
          <button
            className={selectedLimit === 6 ? css.active : ''}
            onClick={() => handleLimitChange(6)}
          >
            6개
          </button>
        </div>
      </div>
      <Link to={'/shop'} className={css.more}>
        View All
      </Link>

      {loading ? (
        <ul className={css.list}>
          {Array.from({ length: limit }).map((_, i) => (
            <li key={i}>
              <div className="skeleton skeleton-img"></div>
              <div className="skeleton skeleton-text"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={css.list}>
          {products.map(data => (
            <li key={data.id}>
              <ProductCard data={data} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default LatestList
