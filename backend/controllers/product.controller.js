import Product from '../models/Product.model.js'

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({
      success: true,
      message: "Product created",
      product
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET ALL PRODUCTS
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      product
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      success: true,
      products
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

