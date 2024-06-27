const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
    const {
        price,
        title,
        photo,
        checkIn,
        checkOut,
        phone,
        numOfGuests,
        name,
        place,
        user,
      } = req.body.infoData;
      try {
        // Create a new Checkout Session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: price * 100,
                product_data: {
                  name: `Reservation for ${title}`,
                  images: [photo],
                },
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          // success_url:
          //   'http://localhost:8001/success?session_id={CHECKOUT_SESSION_ID}',
          // cancel_url: 'http://localhost:5173/payment-cancel',
          success_url:
            'http://localhost:3000/payment-successful?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: 'http://localhost:3000/payment-cancel',
          metadata: {
            checkIn,
            checkOut,
            phone,
            name,
            numOfGuests,
            price,
            place,
            user,
          },
        });
        // Return session ID to client
        return res.json({ id: session.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create checkout session' });
      }
}