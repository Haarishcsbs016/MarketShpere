import express from 'express'
import User from '../models/User.model.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

// ==========================
// GET CURRENT USER PROFILE
// GET /api/users/profile
// ==========================
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')

    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


// ==========================
// UPDATE USER PROFILE
// PUT /api/users/profile
// ==========================
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password')

    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


// ==========================
// ADD TO WISHLIST
// POST /api/users/wishlist/:productId
// ==========================
router.post('/wishlist/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      })
    }

    user.wishlist.push(req.params.productId)
    await user.save()

    res.json({
      success: true,
      message: 'Added to wishlist',
      wishlist: user.wishlist
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


// ==========================
// REMOVE FROM WISHLIST
// DELETE /api/users/wishlist/:productId
// ==========================
router.delete('/wishlist/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.productId
    )

    await user.save()

    res.json({
      success: true,
      message: 'Removed from wishlist',
      wishlist: user.wishlist
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


// ==========================
// GET WISHLIST
// GET /api/users/wishlist
// ==========================
router.get('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist')

    res.json({
      success: true,
      wishlist: user.wishlist
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

export default router
