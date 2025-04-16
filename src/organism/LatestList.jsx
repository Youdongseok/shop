import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from './LatestList.module.css'
import ProductCard from '../components/ProductCard'
import {getProductsData} from '../api/productsApi'
const LatestList = () => {
  const [products,setProducts]=useState([])
  //버튼 클릭 시 리스트에 출력할 카드 갯수 상태관리 만들기
  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
        const data=await getProductsData(`category=new&_limit=6`)
        console.log(data)

        setProducts(data)
      } catch (error) {
        console.log("error",error)
      }
    }
    fetchProducts()
  },[])
  return (
    <section className={css.listCon}>
      <h2>Shop The Latest</h2>
      <Link to={'/shop'} className={css.more}>
        View All
      </Link>
      <ul className={css.list}>
        {products.map(data => (
          <li key={data.id}>
            <ProductCard data={data} />
          </li>
        ))}

        <li>test</li>
      </ul>
    </section>
  )
}

export default LatestList
