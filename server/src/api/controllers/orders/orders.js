import products from '../../../db/products.js'
import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

export const createOrder = (req, res) => {
  const foundProduct = products.find((p) => p.id === req.body.id)
  // check if product is exist or not
  if (foundProduct) {
    // product is found, not create order form this product
    var instance = new Razorpay({
      key_id: process.env.RZP_KEY,
      key_secret: process.env.RZP_SECRET,
    })
    var options = {
      amount: foundProduct.price * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: nanoid(),
    }
    instance.orders.create(options, function (err, order) {
      if (!err) {
        res
          .status(200)
          .json({ ...order, key: process.env.RZP_KEY, name: foundProduct.name })
      } else {
        console.log(err)
        res.status(500).json({
          message: 'There was some error, please contact your administrator',
        })
      }
    })
  } else {
    // there is no such requested product
    res.status(404).json({ message: 'The requested product does not exist!' })
  }
}
