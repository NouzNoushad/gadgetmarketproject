# Gadgetmarketproject

1. Nodejs - Back end
2. Bootstrap + ejs - Frond end
3. Mongodb - Database
4. Passport - Authentication
5. Multer - upload File
6. Bcrypt - secure password


About GadgetMarketProject:
  - You can own this website by submiting ownership form. use strong password and email id. 
  - Only owner can create, edit or delete product details. password and email id should be remembered. but in case if owner forgot password, then he can change password by using his email id.
  - Users/customers can rate or write review. but he/she should be logged in or signed in.
  
What i did:
  - use Multer (node package) for uploading images to static file called uploads. multer is a node middleware use to handle multipart/form data. 
  - create product schema and image schema for storing product&image details into mongodb database.
  - use passport (node package) for authentication purpose. that help me to login only valid users.
  - use bcrypt (node package) to secure password. bcrypt compare users signed in password with login password, if it matchs then only he can enter the page or rate& wite review.
  - store product id/details inside rating schema by using ref keyword. so that allow me to manage only the rated users to that specific product.
  - use connect-flash (node package) for success & error message popups. also i created errors array and stored all errors and render it into the required page.
  - use javascript higher-order functions like map, filter & reduce functions to create search bar. that filter the products.
  - use middlewares for handling repeated codes.
 
Drawbacks:
  - not mobile friendly.
  - search bar still need improvements.
  - lot of repeated validations/error handling codes.
  
  resources:
   - Youtube videos:
       Traversy Media,
       Webdev simplified,
       Thapa technical,
       Namaste javascript
       coders gyan
   - Google:
      stackoverflow,
      npm docs,
      mozilla MDN docs
  - Books:
      so you don't know javascript by kyle simpson.
      
  
