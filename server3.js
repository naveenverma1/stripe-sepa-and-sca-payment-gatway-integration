const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

app.get("/", (req, res) => {
  // Display checkout page
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/stripe-key", (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // You should always calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/pay", async (req, res) => {
   
  const { token, items } = req.body;

  const orderAmount = calculateOrderAmount(items);
  var customer=stripe.customers.create({
    email: 'customer@example.com',
  })
  try {
    // Create a charge with the token sent by the client
    const charge = await stripe.charges.create({
        customer:customer,
      amount: orderAmount,
      currency: "inr",
      source: token
    })
   // const stripe = require('stripe')('sk_test_51HNXcdICR0NVfhA1jTSZ93s3hsPX8L1uQsDBeRkK9mkzUtn44srebA18czdMvBiJVo7infozLjVc0TCsBepQED7h003VRwixxQ');
   const cards = await stripe.customers.listSources(
    'cus_I4hhpWAAlwXb4t',
    {object: 'card', limit: 3}
  );
  console.log(JSON.stringify(cards)+"%%%%%%%%%%%%%%%%%%      card details")
console.log(charge)
    // That's it! You're done! The payment was processed 
    res.send(charge)
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
    res.send({ error: e.message });
  }
});
// const card =  stripe.customers.retrieveSource(
//     'cus_I4fg2AAUR8PwD0',
//   'card_1HUXg5ICR0NVfhA1jMpLSvfO'
  
// );
// {const card =  await stripe.customers.retrieveSource(

//     // 'cus_I4hWUcyTbNWGhT',
//  card= charge.source.id
//     // 'card_1HUY7bICR0NVfhA1wWwocL5L'
//    );
//    console.log(card+"%%%%%%%%%%%%%%%%%%      card details");}

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
