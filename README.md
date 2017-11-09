
Connecting to firebase databaseURL

npm install

npm start

For practice purposes in order to write to the database, rules must be changed.

{
  "rules": {
    ".read": "auth ==== null",
    ".write": "auth ==== null"
  }
}

Not recommended for development, only for practice/learning purposes 
