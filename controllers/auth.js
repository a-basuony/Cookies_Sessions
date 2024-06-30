const Product = require("../models/product");

exports.getLogin = (req, res) => {
  // console.log(req.get("Cookie"));
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
