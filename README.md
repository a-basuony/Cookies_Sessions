# Cookies_Sessions

Here is a complete example of how to set up sessions with cookies in an Express application, using `express-session` and `connect-mongodb-session` to store the session data in a MongoDB database.

### Step-by-Step Code

#### 1. Install Required Packages

First, install the necessary packages:

```bash
npm install express express-session connect-mongodb-session mongoose
```

#### 2. Set Up MongoDB Connection

Create a file named `app.js` and set up the MongoDB connection using Mongoose:

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
```

#### 3. Configure `connect-mongodb-session`

Set up the MongoDB session store:

```javascript
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const mongodbURI = "mongodb://localhost/shop";

const store = new MongoStore({
  uri: mongodbURI,
  collection: "sessions",
});
```

#### 4. Configure `express-session`

Configure the session middleware in your Express application:

```javascript
const express = require("express");
const app = express();

app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only used over HTTPS in production
      sameSite: true, // Helps prevent CSRF attacks
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.send("Welcome back!");
  } else {
    res.send("Hello, new user!");
  }
});

app.get("/login", (req, res) => {
  req.session.isLoggedIn = true;
  res.send("You are now logged in.");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.send("You are now logged out.");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Explanation

- **MongoDB Connection**: The code connects to a MongoDB database named `shop`.
- **Session Store**: The `connect-mongodb-session` package is used to store session data in a MongoDB collection named `sessions`.
- **Session Configuration**:
  - `secret`: A secret key used to sign the session ID cookie.
  - `resave`: Prevents the session from being saved back to the store if it was never modified during the request.
  - `saveUninitialized`: Prevents an uninitialized session from being saved to the store.
  - `store`: Specifies the MongoDB store for session data.
  - `cookie`: Configures the session cookie with properties such as `maxAge`, `httpOnly`, `secure`, and `sameSite`.

### Routes

- **`/`**: Checks if the user is logged in and sends a welcome message accordingly.
- **`/login`**: Logs the user in by setting `req.session.isLoggedIn` to `true`.
- **`/logout`**: Logs the user out by destroying the session and clearing the session cookie.

### Running the Application

Run the application using:

```bash
node app.js
```

Open your browser and navigate to `http://localhost:3000`. Use the `/login` and `/logout` routes to test the session management functionality.
