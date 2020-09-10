# Surrogate languages backend
## Stack
This is a node/express server with a [mongoDb](https://www.mongodb.com/) database

## Content
This API has full CRUD capabilities for the following models:
- User
    - This is a basic user model which includes user information, account information, and user "type" (see frontend for details)
- Blog
    - Blog posts have their content, blog post data (time, author, title etc), keywords, and comments
- Keywords
    - A blog post can draw from old keywords or create new keywords
- About page
    - These are simple HTML files saved and editable by admins
-  Grant Languages
    - These are later called media pages. This is a series of blurbs and links split into sections for maximum editability by the admins
- News 
    - A simple link and blurb editable by admins
- Map Languages
    - These are the languages that appear on the interactive global map. They have the following fields
        - continent: String,
        - country: Array,
        - language: String,
        - instrument_name: String,
        - instrument_family: String,
        - instrument_type: String,
        - encoding_medium: Array,
        - contrasts_encoded: Array,
        - depth_of_encoding: Array,
        - content: Array, 
        - specialization: Array,
        - comprehension: String,
        - productivity: String,
        - summary: String,
        - source: String,
        - mentions: String,
        - current_status: String,
        - entry_authors: String,
- Map language parameters
    - Like Keywords, there are a few parameters that admins/contributors can draw from when inputting map languages. Therefore these are just the parameter names and an array of the options. The following parameters an currently be added to:
        - instrument family
        - instrument type
        - encoding medium
        - contrasts encoded
        - content
        - specialization
## Services
- [nodemailer](https://nodemailer.com/about/) is currently used send reset password emails.
- [passport.js](http://www.passportjs.org/) is used for auth
- [bcrypt](https://www.npmjs.com/package/bcrypt) is used for salting and hashing passwords

## Deployment
The backend is deployed on [heroku](https://www.heroku.com/) and can be found live [here](https://speech-surrogates-backend.herokuapp.com/).
The frontend repo can be found [here](https://github.com/erafkin/speech-surrogates-frontend).

## Author
Emma Rafkin