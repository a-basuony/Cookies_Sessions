const Product = require("../models/product");

exports.getLogin = (req, res) => {
  const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1]; // get the user's  session id from cookies
  console.log(req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  // req.isLoggedIn = true;
  res.setHeader("Set-Cookie", "loggedIn=true");

  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
