# Markdown Example

markdown is so cool. Awesome text formatter. *Follow the link to learn about markdown.* [Mastering markdown](https://guides.github.com/features/mastering-markdown/)

## Cookies

Cookies gives us away to store data in user's browser. it could be name, number etc

when our req is sent to server. it creates a cookie at that point of time. it decides what types of data it holds or when it expires. then it sends as response

Now, every time browser sents a req it attaches the cookie and on the server we can access it and verify it. **this is the backbone of authentication using JWT**


##JSON web tokens

user logs in via web form and sents post request with credentials the server then checks those credentials against those stored in the database. *if they are correct the server then responds with a JWT for the user where it can be stored in form of a cookie*

*Jwt contains user identity in encrypted form. So, for as long as they have the token in the cookie they are authenticated*

*Now, we know cookies are sent to browser everytime they make a request*


*now server verifies the jwt if it matches then the user is considered logged in and can access protected pages*

*if you have state changing endpoints then there is risk for csrf attack*

*csrf mitigation strategies*

## JWT SIGNING

#### Headers
tells what type of signature is used (metadata)

#### Payload
Used for user identification

#### Signature
makes the token secure










