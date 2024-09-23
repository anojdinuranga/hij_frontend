import express from "express";
import { Router } from "express";
import { ExtendedRequest } from "../../config/types";
import renderData from "../../utils/renderData";
import mainHead from "../../views/components/head";
import mainScript from "../../views/components/script";
import mainNav from "../../views/components/nav";
import mainFooter from "../../views/components/footer";
import crypto from "crypto";
import { checkLoggedIn, pathAuthorize } from "../../middlewares/authenticate";


// Define Global Variables
const view = `${__dirname}/../../../src/views/App/`;
const router: Router = express.Router();

router.get("/", async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "login.html", {
      head: head,
      script: script,
      footer: footer,
      nav: nav,
    });
  } catch (err) {
    //console.log(err);
    res.status(500);
  }
});
router.get("/add-client", async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "add-client.html", {
      head: head,
      script: script,
      footer: footer,
      nav: nav,
    });
  } catch (err) {
    //console.log(err);
    res.status(500);
  }
});
router.get("/edit-client", async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "edit-client.html", {
      head: head,
      script: script,
      footer: footer,
      nav: nav,
    });
  } catch (err) {
    //console.log(err);
    res.status(500);
  }
});
router.get("/add-enquiry", async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "add-enquiry.html", {
      head: head,
      script: script,
      footer: footer,
      nav: nav,
    });
  } catch (err) {
    //console.log(err);
    res.status(500);
  }
});


export default router;
