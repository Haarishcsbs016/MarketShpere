import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { fetchCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice'
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, loading } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    dispatch(fetchCart())
  }, [dispatch, isAuthenticated, navigate])

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    const result = await dispatch(updateCartItem({ itemId, quantity: newQuantity }))
    if (result.type === 'cart/updateCartItem/rejected') {
      toast.error(result.payload)
    }
  }

  const handleRemove = async (itemId) => {
    const result = await dispatch(removeFromCart(itemId))
    if (result.type === 'cart/removeFromCart/fulfilled') {
      toast.success('Item removed from cart')
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.18
  }

  const calculateShipping = () => {
    return calculateSubtotal() > 500 ? 0 : 50
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/products" className="text-primary-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
              >
                <img
                  src={item.product?.images?.[0] || '/placeholder.jpg'}
                  alt={item.product?.name}
                  className="w-full md:w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={`/products/${item.product?._id}`} className="hover:text-primary-600">
                      {item.product?.name}
                    </Link>
                  </h3>
                  <p className="text-primary-600 font-bold text-lg mb-4">${item.price}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

