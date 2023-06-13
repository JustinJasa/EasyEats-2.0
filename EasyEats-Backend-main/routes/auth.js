import express from 'express';
import pkg from "bcryptjs";
const { compare, genSaltSync, hashSync} = pkg;
import { getUserByEmail, createUser } from "../controllers/queries.js";
import jwt from "jsonwebtoken";

const routerAuth = express.Router()

// authenticates user
routerAuth.post("/login", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     // takes an email and password as a request
    const { email, password } = req.body;

    // checks if the email exists in database
    const account = await getUserByEmail(email);
    if (account.length == 0) {
      throw "Email is not registered";
    }

    // if user exists - compares password
    const isValid = await compare(password, account[0].password);
    if (!isValid) {
      throw "Incorrect password";
    }

    // if credentials are correct sends back a json web toket
    const token = jwt.sign({ id: account.id }, 'cat123', { expiresIn: "1h" });
    res.status(200).json({ success:1, message:"login successful", token, account });
  } 
  catch (error) {
    switch(error) {
      case "Email is not registered": {
        res.status(401).send(error)
        break
      }
      case "Incorrect password": {
        res.status(401).send(error)
        break
      }
      default: {
        res.status(500).send(error)
        break
      }
    }
  }
 
});

// creates new user

routerAuth.post("/signup", async (req, res) => {
  try{ 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let { username, email, password } = req.body;

    // check if account exists in database
    const account = await getUserByEmail(email);
    if (account.length !== 0) {
      throw "Email is already registered";
    }
    // bcrypts password
    const salt = genSaltSync(10)
    password = hashSync(password,salt)

    // creates new user
    const user = await createUser(username, email, password)
    
    // generate jwt token
    const token = jwt.sign({ id: user.id }, 'cat123', { expiresIn: "1h" });

    res.status(200).json({ success:1, message:"Account Created!", user, token });
  
  } catch (error) {
    switch(error) {
      case "Email is already registered": {
        res.status(401).send(error)
        break
      }
      default: {
        res.status(500).send(error)
        break
      }
    }
  }
});

export default routerAuth