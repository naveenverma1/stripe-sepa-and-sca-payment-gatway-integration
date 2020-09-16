// const express = require('express');
// const app = express();
// const {
//   resolve
// } = require('path');
// const port = 3000


// const bodyParser = require('body-parser')
// const exphbs = require('express-handlebars')
// // Set your secret key. Remember to switch to your live secret key in production!
// // See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require('stripe')('sk_test_51HNXcdICR0NVfhA1jTSZ93s3hsPX8L1uQsDBeRkK9mkzUtn44srebA18czdMvBiJVo7infozLjVc0TCsBepQED7h003VRwixxQ');

// // const customer = await stripe.customers.create({
// //   email: 'paying.user@example.com',
// //   source: source,
// // });

// app.engine('handlebars',exphbs({defaultLayout:'main'}))
// app.set('view engine','handlebars');
// //body-parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
// //set static folder

// app.use(express.static('.'));
// app.use(express.json());
// app.get("/", (req, res) => {
//   // Display checkout page
//   const path = resolve("/indexn.html");
//   res.sendFile(path);
// });
// //app.get("/", (request, response) => response.status(200).send("hello world"));

// // Set your secret key. Remember to switch to your live secret key in production!
// // See your keys here: https://dashboard.stripe.com/account/apikeys
// //const stripe = require('stripe')('sk_test_51HNXcdICR0NVfhA1jTSZ93s3hsPX8L1uQsDBeRkK9mkzUtn44srebA18czdMvBiJVo7infozLjVc0TCsBepQED7h003VRwixxQ');
// app.post("/charge", async (req, res) => {
//   //source = req.body.
// const amount =  2500;
// stripe.customers.create({
//   email:req.body.stripeEmail,
//   source:req.body.stripeSource
// }).then(customer=> stripe.charges.create({
//   amount,
//   currency:'eur',
//   customer:customer.id,
//   source :source
// })).then(charge=> res.render('success'))
//   //const { token, items } = req.body;
//  // source =      \
// //  source = req.body.stripeToken
// //   name = req.body
// //   email = req.body    
// // JSON.stringify(source)
// // JSON.stringify(name)
// // JSON.stringify(email)
// // console.log(typeof source)


// // const customer = await stripe.customers.create({
// //   email: 'khkb@gmail.com',
  
// //   source: source,

  
// // });

// const  itenName = "Premium Script";

// //   try {
// //     const charge = await stripe.charges.create({
// //       customer:customer.id,
// //       amount: 1099,
// //       currency: 'eur',
// //       source: source
// //     });
// // var cjson = JSON.stringify(charge)
// // console.log(cjson+hhh)
// //     res.send(charge);
// //     console.log(cjson+hhh)
// //   } catch (e) {
// //     // Handle "hard declines" e.g. insufficient funds, expired card, etc
// //     // See https://stripe.com/docs/declines/codes for more
// //     res.send({
// //       error: e.message
// //     });
// //   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })