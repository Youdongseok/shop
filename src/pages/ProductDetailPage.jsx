import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsData } from '../api/productsApi'

const ProductDetailPage = () => {
  const {productId} =useParams()
  console.log('productId:', productId)

  const[product,setProduct]=useState(null)

  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const data = await getProductsData()
        console.log('Fetched Data:', data)
        
        // 아이템의 id와 productId 타입을 맞추어 찾기
        //const found = data.find(item => item.id === Number(productId))  // id가 숫자일 경우
        const found = data.find(item => String(item.id) === productId)  // id가 문자열일 경우
    
        console.log('Found Product:', found)
        setProduct(found)
      } catch (error) {
        console.log('error', error)
      }
    }
    
    fetchProduct()
  },[productId])
  if (!product) {
    return <div>로딩 중...</div>
  }
  return (
    <main>
        <h2>{product.title}</h2>
        <img src={`/public/img/${product.img}`} alt={product.title} />
      <p>카테고리: {product.category}</p>
      <p>가격: {product.price}</p>
      <p>할인: {product.discount}%</p>
    </main>
  )
}

export default ProductDetailPage