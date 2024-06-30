const Product = require("../models/product");

exports.getLogin = (req, res) => {
  // console.log(req.get("Cookie"));
  const isLoggedIn = req.get("Cookie").split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};

// exports.postLogin = (req, res) => {
//   // req.isLoggedIn = true;
//   res.setHeader("Set-Cookie", "loggedIn=true");

//   Product.find()
//     .then((products) => {
//       res.render("shop/index", {
//         prods: products,
//         pageTitle: "Shop",
//         path: "/",
//         isAuthenticated: req.isLoggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
