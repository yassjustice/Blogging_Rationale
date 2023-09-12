# Blogging_Rationale
# A Blog Management Web Application

---

#### A blog for free thinking and research sharing, where people exchange ideas and dive deeper in all fields of studies. using argumentations and reasoning to improve the collective intelligence and consciousness, while going forward to reach a glimpse of the truth and intellectual prosperity.

### Using:

- Express.js
- Node.js
- Json server as Database
- EJS view Engine

---

### Pages:

1. Login Page: Users can log in with their credentials (username and password). Failed login attempts should display error messages.
2. Register Page: New users can register with a unique username, email, password (hashed for security), and an optional profile image. This page will be served as a static HTML page.
3. Dashboard Page: After successful login, users will be directed to the dashboard. This page displays the user's name, profile image, and a form to add a new blog post. Users can also log out from here.
4. All Blogs Page: This page lists all the blog posts in a grid format. Each post will have a title, description, author, and an associated image. Users can edit or delete their own blog posts from this page. Users should only be able to edit their own blogs, not blogs from other users.
5. Edit Blog Page: Users can click on the "Edit" button on their own blog posts to navigate to the edit page. Here, they can update the title, description, author, and image of their selected blog post.
6. 404 Page: In case a user tries to access a non-existent page or route, a custom 404 page should be displayed. This page will be served as a static HTML page.

---

### Features:

1. User authentication with secure password hashing.
2. User registration with optional profile images.
3. Dashboard displaying user information and a blog post creation form.
4. Blog posts stored in a JSON server for data persistence.
5. Listing of all blog posts with options for editing and deleting, with the restriction that users can only edit their own blogs.
6. Editing and updating of individual blog posts.
7. Custom 404 error page for undefined routes, served as a static HTML page.
8. Use EJS as the templating engine for generating dynamic HTML views.
9. Structuring the application following the MVC (Model-View-Controller) pattern.
10. Utilize packages such as Express, BCRYPT, body-parser, and Json-server for various functionalities. Serve static HTML pages for registration and the 404 page, as well as CSS for styling.
11. (For future implementation) set genres and categorize subjects.
12. (For future implementation) search by text: words, terms/ subject: category
13. (For future implementation) Monetize writers/ users can support writers
14. 
