```javascript
res.render(); // => search for the views folder view and send the rendered HTML to the client.

res.render("auth/login"); //=> for auth folder => login page file
// This is the path to the template file. It suggests that there's a template file named "login" in an "auth" directory.

res.render("auth/login", {
  path: "/login",
  pageTitle: "Login",
});
// The second argument is an object containing data to be passed to the view:
// path: "/login": This likely sets the current path for navigation highlighting.
// pageTitle: "Login": This sets the title of the page.
// isAuthenticated: req.isLoggedIn: This passes the authentication status to the view.
// req.isLoggedIn: This suggests that there's a property on the request object that indicates whether the user is logged in or not.

res.redirect("/"); // redirect to the home page
```
