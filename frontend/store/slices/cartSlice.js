import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const getAuthHeaders = () => {
  const token = Cookies.get('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: getAuthHeaders()
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart`,
        { productId, quantity },
        { headers: getAuthHeaders() }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart')
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/cart/${itemId}`,
        { quantity },
        { headers: getAuthHeaders() }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
        headers: getAuthHeaders()
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart')
    }
  }
)

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cart.items || []
        state.total = action.payload.total || 0
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.cart.items || []
        state.total = action.payload.total || 0
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.cart.items || []
        state.total = action.payload.total || 0
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cart.items || []
        state.total = action.payload.total || 0
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer

