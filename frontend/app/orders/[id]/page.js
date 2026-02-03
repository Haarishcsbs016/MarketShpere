'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import api from '../../../lib/api'
import { FiPackage, FiCheckCircle, FiTruck, FiXCircle, FiDownload } from 'react-icons/fi'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchOrder()
  }, [params.id, isAuthenticated, router])

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${params.id}`)
      setOrder(response.data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-500 text-2xl" />
      case 'shipped':
        return <FiTruck className="text-blue-500 text-2xl" />
      case 'processing':
        return <FiPackage className="text-yellow-500 text-2xl" />
      case 'cancelled':
        return <FiXCircle className="text-red-500 text-2xl" />
      default:
        return <FiPackage className="text-gray-500 text-2xl" />
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">Order not found</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primary-600 hover:underline mb-4"
          >
            ← Back to Orders
          </button>
          <h1 className="text-3xl font-bold">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                {getStatusIcon(order.orderStatus)}
                <div>
                  <h2 className="text-xl font-bold">Order Status</h2>
                  <p className="text-gray-600 capitalize">{order.orderStatus}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                <p><span className="font-semibold">Placed on:</span> {new Date(order.createdAt).toLocaleString()}</p>
                {order.paidAt && (
                  <p><span className="font-semibold">Paid on:</span> {new Date(order.paidAt).toLocaleString()}</p>
                )}
                {order.deliveredAt && (
                  <p><span className="font-semibold">Delivered on:</span> {new Date(order.deliveredAt).toLocaleString()}</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-primary-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                {order.shippingAddress.zipCode && <p>{order.shippingAddress.zipCode}</p>}
                {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
                {order.shippingAddress.phone && <p className="mt-2">Phone: {order.shippingAddress.phone}</p>}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Items Price</span>
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST)</span>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm">
                  <span className="font-semibold">Payment Method:</span> {order.paymentMethod.toUpperCase()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Payment Status:</span>{' '}
                  <span className={`capitalize ${
                    order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2">
                <FiDownload />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

