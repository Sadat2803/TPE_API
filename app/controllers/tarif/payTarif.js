const commande = require('../../models/commande');

const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const payTarif = async (req, res) => {
  console.log("[INFO] pay tarif called!")
  const commandeData = await commande.findOne({ _id: req.body.commandeId })
  const amountToCharge = parseInt(commandeData.prix * 100 == null ? 10000 : commandeData.prix * 1000);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          unit_amount: amountToCharge,
          currency: 'eur',
          product: `${process.env.STRIPE_PRODUCT}`
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // submit_type: 'payer',
    success_url: `${process.env.FRONTEND_URL}/commandes/listsuccess=true`,
    cancel_url: `${process.env.FRONTEND_URL}/commandes/listsuccess=false`,
  });
  console.log("[INFO] payement started!")
  res.redirect(303, session.url);
}

const payTarifMobile = async (req, res) => {
  const commandeData = await commande.findOne({ _id: req.body.commandeId })
  const amountToCharge = parseInt(commandeData.prix * 100 == null ? 10000 : commandeData.prix * 1000);
  // Use an existing Customer ID if this is a returning customer.
  console.log("[INFO] payTarifMobile called");
  const customer = await stripe.customers.create()
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2022-11-15' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountToCharge,
    currency: 'eur',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: `${process.env.STRIPE_PUBLISHABLE_KEY}`
  });
};

module.exports = { payTarif, payTarifMobile }
