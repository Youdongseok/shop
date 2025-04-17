import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { formatCurrency } from '@/utils/features'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

// Swiper 임포트
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import css from './productDetailPage.module.css'

const DetailPage = () => {
  const { product, relatedProducts } = useLoaderData()
  console.log('DetailPage:product', product)
  console.log('DetailPage:relatedProducts', relatedProducts)

  const [key, setKey] = useState('Description')

  return (
    <main>
      <h2>DetailPage</h2>
      <div className={css.detailCon}>
        <div className={css.imgWrap}>
          <img src={`/public/img/${product.img}`} alt={product.title} />
          {product.discount > 0 && <p className={css.discount}>{product.discount} %</p>}
        </div>
        <div className={css.infoWrap}>
          <p className={css.title}>{product.title}</p>
          <p className={css.price}>{formatCurrency(product.price)}</p>
          <p className={css.category}>{product.category}</p>
          <div className={css.btnWrap}>
            <div className={css.counterArea}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className={css.addBtn}>장바구니 담기</button>
          </div>
        </div>
      </div>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className={`mb-3 ${css.tabs}`}
      >
        <Tab
          eventKey="Description"
          title={
            <span className={key === 'Description' ? css.activeTab : css.inactiveTab}>
              Description
            </span>
          }
        >
          Lorem ipsum dolor sit amet...
        </Tab>
        <Tab
          eventKey="Aditional"
          title={
            <span className={key === 'Aditional' ? css.activeTab : css.inactiveTab}>
              Aditional information
            </span>
          }
        >
          Tab content for Profile
        </Tab>
        <Tab
          eventKey="Reviews"
          title={
            <span className={key === 'Reviews' ? css.activeTab : css.inactiveTab}>Reviews(0)</span>
          }
        >
          Tab content for Contact
        </Tab>
      </Tabs>

      {/* 관련 상품 슬라이더 추가 */}
      <div className={css.relatedProducts}>
        <Swiper
          slidesPerView={3} // 한 화면에 보여줄 슬라이드 수
          spaceBetween={20} // 슬라이드 간 간격
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Autoplay]}
          className={css.relatedSlider}
        >
          {relatedProducts &&
            relatedProducts.map(item => (
              <SwiperSlide key={item.id}>
                <div className={css.card}>
                  <img src={`/public/img/${item.img}`} alt={item.title} className={css.cardImg} />
                  <p className={css.cardTitle}>{item.title}</p>
                  <p className={css.cardPrice}>{formatCurrency(item.price)}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </main>
  )
}

export default DetailPage
