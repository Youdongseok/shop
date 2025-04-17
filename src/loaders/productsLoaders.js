import { getProductByCategory, getProductById } from '@/api/productsApi'

export const detailPageLoader = async info => {
  console.log('productsLoader.js:info', info)
  const params = info.params
  try {
    // 상품 ID에 해당하는 정보
    const product = await getProductById(params.productId)
    console.log('productsLoader.js:product', product.category)
    if (!product) {
      throw new Response('상품이 존재하지 않습니다.', { status: 404 })
    }

    // 상품 ID의 카테고리 정보와 일치하는 상품들
    const relatedProducts = await getProductByCategory(product.category, 10)

    return { product, relatedProducts }
  } catch (error) {
    console.log('error', error)
    throw new Response('상품 데이터를 가져오는 중 오류 발생', {
      status: error.status || 500,
    })
  }
}
