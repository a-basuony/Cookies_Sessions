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

Cookies allow storing data in the user's browser

1. Cookies as an alternative to request-based storage:

   - Cookies allow storing data in the user's browser (developer tools => application => Cookies)
   - This data persists across requests and is sent with each request to the server

2. Implementation:

   - Set a cookie using the 'Set-Cookie' header in the response
   - Example: res.setHeader('Set-Cookie', 'loggedIn=true')

3. Retrieving cookie data:

   - Cookies are sent with each request in the 'Cookie' header
   - Example: req.get("Cookie") => loggedIn=true
     console.log(req.get("Cookie")) => loggedIn=true
   - Parse the cookie string to extract the desired values

4. Advantages:
   - Persists data across requests
   - User-specific (doesn't affect other users)
   - Automatically sent with each request

However, there is indeed a significant disadvantage to this approach:

The main disadvantage is security. Storing sensitive information like authentication status directly in a cookie that is sent with every request can be risky:
ومع ذلك، هناك عيب كبير في هذا النهج:
العيب الرئيسي هو الأمان. تخزين معلومات حساسة مثل حالة المصادقة مباشرة في ملف تعريف يتم إرساله مع كل طلب يمكن أن يكون خطيرًا.

1. Cookies are client-side storage and can be easily viewed and modified by the user.
2. This implementation doesn't use any encryption or signing, making it vulnerable to tampering.عرضة للتلاعب.
3. A sneaky person could just switch the 'loggedIn' cookie to 'true' to look like they're logged in even if they didn't actually log in.
   A malicious user could simply change the 'loggedIn' cookie to 'true' to appear authenticated without actually logging in.
   يمكن لمستخدم شرير ببساطة تغيير ملف تعريف الارتباط 'loggedIn' إلى 'true' ليظهر مصادقًا دون تسجيل الدخول فعليًا.

To address this, you would typically:

1. Use sessions instead of directly storing authentication status in cookies
2. Use encrypted and signed cookies
3. Store only a session ID in the cookie, with the actual data stored server-side
4. Implement proper authentication and authorization checks on the server for each protected route

للتعامل مع هذا، عادة ما تقوم بالتالي:

استخدام جلسات بدلاً من تخزين حالة المصادقة مباشرة في ملفات تعريف الارتباط
استخدام ملفات تعريف الارتباط المشفرة والموقعة
تخزين معرف الجلسة فقط في ملف تعريف الارتباط، مع تخزين البيانات الفعلية على الخادم
تنفيذ فحوص المصادقة والتفويض الصحيحة على الخادم لكل مسار محمي

Certainly. Here's a quick summary of cookies in steps:

1. Purpose: Store small pieces of data in the user's browser.

2. Creation: Server sets a cookie using the 'Set-Cookie' HTTP header in the response.

3. Storage: Browser stores the cookie locally.

4. Transmission: Browser automatically sends cookies with every request to the same domain.

5. Access: Server can read cookie data from the 'Cookie' header in incoming requests.

6. Expiration: Cookies can be set to expire after a certain time or when the browser session ends.

7. Usage: Commonly used for maintaining user state, preferences, or session information.

8. Limitations: Size restrictions (typically 4KB) and potential security concerns if not properly handled.

9. Security measures: Can be made more secure with flags like HttpOnly and Secure.

10. Types: Session cookies (temporary) and persistent cookies (longer-lasting).

This brief overview covers the key aspects of how cookies function in web applications.

```javascript
const express = require("express");
const app = express();

// Set a cookie
app.get("/set-cookie", (req, res) => {
  //   res.setHeader("Set-Cookie", "user=John; HttpOnly"); // http only not https helps protect against cross-site scripting (XSS) attacks.
  //   res.setHeader("Set-Cookie", "loggedIn=true; Secure"); // Secure=> only https in url not http
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.send("Cookie set");
});

// Read a cookie
app.get("/get-cookie", (req, res) => {
  // const cookie = req.headers.cookie;
  console.log(req.get("Cookie"));
  res.send("Cookie value: " + cookie);
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Summary: Using Cookies and Sessions in Node.js Applications

#### Rendering Views with `res.render()`

1. **Basic Usage**:

   ```javascript
   res.render("viewName");
   ```

   - Renders the specified view template (e.g., "viewName") and sends the resulting HTML to the client.

2. **Rendering Views with Data**:

   ```javascript
   res.render("auth/login", {
     path: "/login",
     pageTitle: "Login",
   });
   ```

   - Renders the "login" template inside the "auth" directory.
   - Passes an object containing data (`path`, `pageTitle`) to the view.

3. **Redirecting to Another Page**:
   ```javascript
   res.redirect("/");
   ```
   - Redirects the client to the home page.

#### Working with Cookies

1. **Purpose of Cookies**:

   - Store small pieces of data in the user's browser.
   - Persist data across multiple requests and browser sessions.

2. **Setting a Cookie**:

   ```javascript
   res.setHeader("Set-Cookie", "loggedIn=true");
   ```

   - Sets a cookie with a key-value pair. The cookie is sent with the response and stored in the user's browser.

3. **Retrieving Cookie Data**:

   ```javascript
   const cookie = req.get("Cookie");
   console.log(cookie); // Outputs: loggedIn=true
   ```

   - Reads the cookie from the request headers.

4. **Cookie Benefits**:

   - **Persistence**: Data stored in cookies is sent with each request, allowing the server to maintain state across requests.
   - **User-Specific**: Each user has their own set of cookies, preventing data leakage between users.

5. **Security Concerns**:
   - **Visibility and Modifiability**: Cookies are stored client-side and can be easily viewed and modified by users.
   - **Sensitive Data**: Storing sensitive information directly in cookies is risky without encryption or signing, as users can tamper with the data.
   - **Example Risk**: A user could change the 'loggedIn' cookie value to 'true' to appear authenticated without actually logging in.

#### Enhancing Cookie Security

1. **Use Secure Cookies**:

   ```javascript
   res.cookie("loggedIn", "true", {
     maxAge: 3600000, // 1 hour
     httpOnly: true, // Prevents access via JavaScript
     secure: true, // Sends cookie only over HTTPS
     sameSite: "strict", // Prevents CSRF
   });
   ```

   - `HttpOnly`: Protects against cross-site scripting (XSS) attacks by preventing JavaScript access.
   - `Secure`: Ensures the cookie is only sent over HTTPS.
   - `SameSite`: Mitigates cross-site request forgery (CSRF) attacks.

2. **Avoid Storing Sensitive Data Directly**:

   - Store only a session ID in the cookie, with the actual data stored server-side.

3. **Example Implementation**:

   ```javascript
   const express = require("express");
   const app = express();

   // Set a cookie
   app.get("/set-cookie", (req, res) => {
     res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly; Secure");
     res.send("Cookie set");
   });

   // Read a cookie
   app.get("/get-cookie", (req, res) => {
     const cookie = req.get("Cookie");
     console.log(cookie); // Outputs: loggedIn=true
     res.send("Cookie value: " + cookie);
   });

   app.listen(3000, () => console.log("Server running on port 3000"));
   ```

#### Summary of Key Points

1. **Cookies Overview**:

   - Used for storing small amounts of data in the user's browser.
   - Automatically sent with each request to the server.

2. **Setting Cookies**:

   - Use the `Set-Cookie` header to create cookies.

3. **Reading Cookies**:

   - Access cookies via the `Cookie` header in requests.

4. **Security Measures**:

   - Use `HttpOnly` and `Secure` flags to protect cookies.
   - Store session IDs rather than sensitive data directly in cookies.

5. **Limitations**:

   - Cookies are limited in size (typically 4KB).
   - Can be viewed and modified by users, posing security risks if not handled properly.

6. **Using Sessions**:

   - Sessions offer a more secure way to handle sensitive data by storing session information server-side and only storing session IDs in cookies.

7. **Best Practices**:
   - Use established packages for authentication and session management.
   - Implement proper authentication and authorization checks on the server for protected routes.

By understanding and implementing these principles, you can effectively manage user state and security in your Node.js applications using cookies and sessions.

---

### Sessions Overview

**Definition:**
Sessions are a mechanism used by web servers to maintain stateful information about interactions with users across multiple requests.

**Key Points:**

1. **Purpose:**

   - Sessions enable websites to remember user-specific data and provide a personalized experience.

2. **Session ID:**

   - Each session is identified by a unique session ID, stored as a cookie in the user's browser.

3. **Data Storage:**

   - Session data is stored securely on the server, not on the user's browser like cookies.

4. **Usage:**

   - Used for maintaining login status, shopping carts, and user preferences throughout a visit.

5. **Security:**

   - More secure than cookies for storing sensitive information, as data is not accessible or modifiable by users.

6. **Expiration:**

   - Sessions can expire after a period of inactivity or when the user logs out, ensuring data is not kept indefinitely.

7. **Benefits:**

   - Personalization, security, and efficiency in handling user-specific data.

8. **Implementation:**

   - Managed through session IDs stored in cookies, with session data stored securely on the server.

9. **Considerations:**
   - Proper session management is crucial for scalability and security.
   - Users should be informed about session data handling to respect privacy preferences.

### Practical Examples:

- **Logging In:** Session remembers user login status across pages.
- **Shopping Cart:** Items remain in the cart until checkout.
- **Preferences:** User settings like language or theme persist throughout the visit.

### Conclusion:

Sessions play a critical role in providing a seamless and personalized user experience on websites, ensuring data security and efficient data management across interactions.

This summary covers the essential aspects of sessions, their benefits, and considerations for future reference.

###### express-session

1.  Install: npm install express-session
2.  Import: const session = require('express-session');
3.  Set up express-session middleware in your App

            ```javascript
            app.use(
            session({
                secret: "your-secret-key", // Change this to a random string of your choice
                resave: false,
                saveUninitialized: false,
                cookie: { secure: true }, // Use secure cookies in production with HTTPS
            })
            );

```
resave and saveUninitialized: These options determine how session data is stored and initialized.
Setting them to false is generally recommended to prevent unnecessary session updates

```

```javascript
set session: req.session.isLoggedIn = true;
get session: req.session.isLoggedIn
console.log(req.session.isLoggedIn )=> true
```

the problem here is this session is stored in memory and memory is not an infinite resource.
for development, this is fine
for a production server this would be horrible because if you have thousands
or one hundred thousands of users, your memory will quickly overflow if you store all that information in memory
it's also not ideal.

use package: connect-mongodb-session is Node.js package that allows you to store session data in a MongoDB database
It's used to store session information in MongoDB instead of in-memory storage.

How it works:

- It creates a new collection in your MongoDB database to store sessions.
- Each session is stored as a document in this collection.
- It automatically handles creating, reading, updating, and deleting session data in MongoDB.
- You typically use it in conjunction with express-session, configuring it to use MongoDB as the session store.

install: npm i --save connect-mongodb-session

### Storing Sessions with MongoDB using `connect-mongodb-session`

In production environments, storing sessions in memory is not feasible due to limited memory resources. Instead, sessions should be stored in a database. Here’s how to use `connect-mongodb-session` with `express-session` to store sessions in MongoDB:

1. **Install Required Packages:**

   - First, install the necessary packages:
     ```bash
     npm install express-session connect-mongodb-session mongoose
     ```

2. **Set Up MongoDB Connection:**

   - Configure your MongoDB connection using Mongoose:

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

3. **Configure `connect-mongodb-session`:**

   - Set up the MongoDB URI and create a new instance of `MongoStore`:

     ```javascript
     const session = require("express-session");
     const MongoStore = require("connect-mongodb-session")(session);

     const mongodbURI = "mongodb://localhost/shop"; // Your MongoDB URI

     const store = new MongoStore({
       uri: mongodbURI,
       collection: "sessions", // The collection name where sessions will be stored
     });
     ```

4. **Configure `express-session`:**

   - Use `express-session` middleware with the configured `MongoStore`:

     ```javascript
     const express = require("express");
     const app = express();

     app.use(
       session({
         secret: "your-secret-key", // Change this to a random string
         resave: false,
         saveUninitialized: false,
         store: store, // Use MongoDB store for sessions
         cookie: {
           maxAge: 1000 * 60 * 60 * 24, // Session expiration time in milliseconds (optional)
         },
       })
     );

     app.listen(3000, () => {
       console.log("Server running on port 3000");
     });
     ```

5. **Verify Session Storage:**
   - Verify that sessions are stored in MongoDB using tools like MongoDB Compass. Check the `shop` database and the `sessions` collection to see stored sessions.

### Benefits of Using MongoDB for Session Storage

- **Scalability:** Sessions are stored in the database, making it suitable for handling thousands or even hundreds of thousands of users without running into memory limits.
- **Persistence:** Session data persists across server restarts.
- **Security:** Data stored server-side in the database is less vulnerable to tampering compared to client-side storage.
- **Isolation:** Each user’s session data is stored separately, ensuring that user-specific data is not shared across users.

### Best Practices

- **Use a Secure Session Store:** Always use a secure and scalable store like MongoDB for session management in production environments.
- **Set Appropriate Expiry:** Configure session expiry to clean up old sessions and manage storage efficiently.
- **Handle Session Data Securely:** Avoid storing sensitive data directly in cookies; use sessions for such data and store them securely on the server.

### Summary

By using `connect-mongodb-session` with `express-session`, you can efficiently manage session storage in a scalable and secure manner suitable for production environments. This approach leverages MongoDB to handle large volumes of session data while ensuring data persistence and user isolation.

---

fetch user when do login => fake the process
User.findById("5bab316ce0a7c75f783cb8a8")
.then((user) => {
req.user = user;
next();
})
.catch((err) => console.log(err));
