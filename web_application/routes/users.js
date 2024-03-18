import { Router } from "express";
const router = Router();
import userFunction from '../data/users.js'

// router
//   .route("/")
//   .get(async (req, res) => {
//     res.render("home");
//   })
//   .post(async (req, res) => {});

router
  .route('/login')
  .get(async (req, res) => {
      //code here for GET
      res.render("login");
  })
  .post(async (req, res) => {
    //code here for POST
    let emailAddress = req.body.emailAddressInput;
    let password = req.body.passwordInput;
    if(!emailAddress || !password){
      return res.status(400).render('login', {error: 'Empty input' });
    }
    if (typeof emailAddress != 'string' || typeof password != 'string') {
      return res.status(400).render('login', {error: 'Invalid input' });
    }
    if (emailAddress.trim().length == 0 || password.trim().length == 0) {
      return res.status(400).render('login', {error: 'Invalid input' });
    }
    emailAddress = emailAddress.trim().toLowerCase();
    password = password.trim();
    var regExp = /\S+@\S+\.\S+/; // source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    if (!regExp.test(emailAddress)) {
      return res.status(400).render('login', {error: 'Invalid input' });
    }
    if (password.length < 8) {
      return res.status(400).render('login', {error: 'Invalid input' });
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?])[A-Za-z\d~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?]+$/; // source: chatGPT
    if (!regex.test(password)) {
      return res.status(400).render('login', {error: 'Invalid input' });
    }
    try {
      let user = await userFunction.loginUser(emailAddress, password);
      req.session.user = {emailAddress: user.emailAddress};
        res.redirect('/home');
    } catch (e) {
      return res.status(400).render('login', {error: e });
    } 

  });


router.route('/home').get(async (req, res) => {
  let info = req.session.user;
  if (!info) {
    res.status(400).render('error', {status: "403", errorMessage: "No permission to access this page"});
  }
  res.render("home");
});

router.route('/error').get(async (req, res) => {
  res.render("error");
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.render("logout");
});


export default router;