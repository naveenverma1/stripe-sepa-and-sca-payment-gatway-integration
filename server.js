// Replace if using a different env file or config
//require("dotenv").config({ path: "./env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")('sk_test_51HNXcdICR0NVfhA1jTSZ93s3hsPX8L1uQsDBeRkK9mkzUtn44srebA18czdMvBiJVo7infozLjVc0TCsBepQED7h003VRwixxQ')
const webhookSecret = 'whsec_OHqWX2tDNVQkWwCraQn0pkgrezk9BQWd';
const db = require('./dbConfig')
app.use(express.static('.'));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get("/", (req, res) => {
    // Display checkout page
    const path = resolve("./index.html");
    res.sendFile(path);
  });
app.get("/success", (req, res) => {
  const path = resolve("./success.html");
  res.sendFile(path);
});

app.get('/checkout-session', async (req, res) => {
  
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ['line_items','customer','subscription'],
    
  });
  const subscriptions = await stripe.subscriptions.list({
    limit: 3,
  });
 // console.log(subscriptions)
//   const subscriptions =  stripe.subscriptions.list({
//     limit: 3,
//   }); 
//   console.log(JSON.stringify(subscriptions)+"      ssgsg")
// const session = await stripe.checkout.sessions.list({
//     limit: 3,
//   });
// const card = await stripe.customers.retrieveSource(
      

//   );
  res.json(session)

});
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:4242/success?id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4242/cancel',
    payment_method_types: ['card'],
    mode: 'subscription',
    allow_promotion_codes: true,
    line_items: [{
      price: 'price_1HS1SqICR0NVfhA1FTPMKMoq', // set this to a recurring price ID
      quantity: req.body.quantity,
    //dynamic_tax_rates: ['txr_1HS2ZpICR0NVfhA1n0RiVdCE', 'txr_1HS2QNICR0NVfhA1Ytnl8J3F'],
    }],
    // subscription_data:{
    //     coupon:'oV50lSe0'
    // }
    
  }); 
  
 //console.log(session.customer.id)
      
 var ses = JSON.stringify(session)
//if(session.payment_status=='paid'){
  sessionid=  session.id
  amount = session.amount_total;
  currency= session.currency
  //customer_id = session.customer.id
  //email = session.email;
  object = session.object;
  mode = session.mode;
  console.log(sessionid,amount,currency,object,mode)
  //}
  let sql = "INSERT INTO payments(amount, currency)values(?,?)";

  db.query(sql,['10','Inr']  ,(err, res) => {
    if (err) {
      console.log("error: ", err);
  
    }else
   
    console.log("created customer");
  });
  res.json({
    id: session.id,
  });
  
});
 
// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    if(event.type == 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Checkout Session Completed for: ', session.id)
      console.log('Checkout Session Completed subscription: ', session.subscription)
      console.log('Checkout Session Completed customer: ', session.customer)
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));