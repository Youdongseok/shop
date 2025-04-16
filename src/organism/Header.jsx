import React, { useEffect, useState, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '@/components/Logo'
import css from './Header.module.css'
import { debounce } from 'lodash' // npm i lodash

const Header = () => {
  const [isOn, setIsOn] = useState(false)
  const location = useLocation()

  const addClassOn = () => {
    setIsOn(!isOn)
  }

  useEffect(() => {
    setIsOn(false)
  }, [location.pathname])

  // 디바운싱된 리사이즈 핸들러
  const handleResize = useCallback(() => {
    const debouncedResize = debounce(() => {
      if (window.innerWidth > 1100) {
        setIsOn(false)
      }
    }, 150)
    debouncedResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    if (isOn) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [handleResize, isOn])

  return (
    <header className={css.hd}>
      <div className={css.con}>
        <h1 className={css.logo}>
          <Link to={'/'}>
            <Logo />
          </Link>
        </h1>
        <div className={isOn ? `${css.gnb} ${css.on}` : css.gnb}>
          <nav>
            <CustomNavLink to={'/shop'} label={'shop'} />
            <CustomNavLink to={'/about'} label={'about'} />
            <CustomNavLink to={'/blog'} label={'blog'} />
          </nav>
          <div className={css.icon}>
            <CustomIconLink to={'/search'} icon={'bi-search'} />
            <CustomIconLink to={'/mypage'} icon={'bi-person-circle'} />
            <CustomIconLink to={'/cart'} icon={'bi-basket'} />
          </div>
        </div>
        <i className={`${css.ham} bi bi-list`} title="전체메뉴 보기버튼" onClick={addClassOn}></i>
      </div>
    </header>
  )
}

// 컴포넌트 메모이제이션
const CustomNavLink = React.memo(({ to, label }) => (
  <NavLink className={({ isActive }) => (isActive ? `${css.active}` : '')} to={to}>
    {label}
  </NavLink>
))

const CustomIconLink = React.memo(({ to, icon }) => (
  <NavLink className={({ isActive }) => (isActive ? `${css.active}` : '')} to={to}>
    <i className={`bi ${icon}`}></i>
  </NavLink>
))

export default React.memo(Header)
