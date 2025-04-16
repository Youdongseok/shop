import axios from 'axios'
const BASE_URL = `http://localhost:3000/products/`

export const getProductsData = async (query='') => {
  try {
    const res = await axios.get(`${BASE_URL}?${query}`)
    return res.data
  } catch (error) {
    console.log('error', error)
    throw error
  }
}


