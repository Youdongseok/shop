import axios from 'axios'
//const BASE_URL = 'http://localhost:3000/products'

export const getProductsData = async (query = '') => {
  try {
    const res = await axios.get(`/api/products/?${query}`)
    console.log('res----', res)
    return res.data
  } catch (err) {
    console.log('err----', err)
    // throw err
  }
}

export const getProductById = async id => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    console.log('res----', res)
    console.log('res----', res.data)
    return res.data
  } catch (err) {
    console.log('err----', err)
    //throw err
  }
}

export const getProductByCategory = async (category, limit = 10) => {
  try {
    const res = await axios.get(`/api/products/`, {
      params: {
        category,
        _limit: limit,
      },
    })
    console.log('res----', res)
    console.log('res----', res.data)
    return res.data
  } catch (err) {
    console.log('err----', err)
    return []
    //throw err
  }
}
