# smartpolls

Webapp for classroom polling.

# Page Structure
  - /public/index.html is the consumer facing marketing/landing page
  - /public/login.html should present the user with a form to login and hits our REST api with a POST request to `/api/login`
  - /public/signup.html same as login except /api/signup
  - /public/main.html this is the webapp itself (angular)

# Architecture
  - Passport for user authentication
  - Mongoose for saving users and polls
  - Express.js for backend and routing
  - AngularJS for webapp portion of the site
