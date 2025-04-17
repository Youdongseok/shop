import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Default from './layout/Default'

const MainPage = lazy(() => import('./pages/MainPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

const ShopPage = lazy(() => {
  // 메인 페이지가 로드된 후 1초 후에 Shop 페이지 미리 로드
  const preloadShop = () => import('./pages/ShopPage')
  // 중요한 페이지라면 Suspense가 표시되지 않도록 미리 로드
  if (typeof window !== 'undefined') {
    window.setTimeout(preloadShop, 1000)
  }
  return preloadShop()
})

const BlogPage = lazy(() => import('./pages/BlogPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

import NotFound from './pages/NotFound'
import ProductDetailPage from './pages/ProductDetailPage'
import { getProductById } from './api/productsApi'
import { detailPageLoader } from './loaders/productsLoaders'

// 더 나은 로딩 컴포넌트 정의
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>콘텐츠를 불러오는 중...</p>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/cart', element: <CartPage /> },
      {
        path: '/detail/:productId',
        element: <ProductDetailPage />,
        loader: detailPageLoader,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
])
export default router
