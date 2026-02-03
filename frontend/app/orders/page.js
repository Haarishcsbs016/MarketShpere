'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../lib/api'
import { FiPackage, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi'

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchOrders()
  }, [isAuthenticated, router])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500" />
      case 'shipped':
        return <FiTruck className="text-blue-500" />
      case 'processing':
        return <FiPackage className="text-yellow-500" />
      case 'cancelled':
        return <FiXCircle className="text-red-500" />
      default:
        return <FiPackage className="text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No orders yet</p>
            <Link
              href="/products"
              className="text-primary-600 hover:underline"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(order.orderStatus)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Order # {order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">${order.totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-4 overflow-x-auto">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex-shrink-0">
                        <img
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <p className="text-xs mt-1 w-20 truncate">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

