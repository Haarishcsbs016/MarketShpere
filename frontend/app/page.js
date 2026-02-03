'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../store/slices/authSlice'
import { fetchCart } from '../store/slices/cartSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../lib/api'
import { FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi'

export default function Home() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe())
      dispatch(fetchCart())
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featured, trending] = await Promise.all([
          api.get('/products?featured=true&limit=8'),
          api.get('/products?trending=true&limit=8')
        ])
        setFeaturedProducts(featured.data.products)
        setTrendingProducts(trending.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to MarketSphere</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <Link
            href="/products"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <FiTruck className="text-4xl text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $500</p>
            </div>
            <div className="text-center">
              <FiShield className="text-4xl text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure transactions</p>
            </div>
            <div className="text-center">
              <FiStar className="text-4xl text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold">Best Quality</h3>
              <p className="text-gray-600 text-sm">Premium products</p>
            </div>
            <div className="text-center">
              <FiShoppingBag className="text-4xl text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">${product.price}</span>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span>{product.rating || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold">${product.price}</span>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span>{product.rating || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

