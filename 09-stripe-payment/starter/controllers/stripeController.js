

const stripe = require('stripe')(process.env.STRIPE_API_SECRET)

const stripeController = async (req, res) => {
  // console.log(req.body)
  const { purchase, total_amount, shipping_fee } = req.body

  //send total to stripe
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })
  console.log(paymentIntent)
  res.json({ clientSecret: paymentIntent.client_secret })
  //   res.send('stripe route')
}

module.exports = stripeController
