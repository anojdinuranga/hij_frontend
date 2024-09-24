import express from "express";
import { Router } from "express";
import { ExtendedRequest } from "../../config/types";
import renderData from "../../utils/renderData";
import mainHead from "../../views/components/head";
import mainScript from "../../views/components/script";
import mainNav from "../../views/components/nav";
import mainFooter from "../../views/components/footer";
import crypto from "crypto";
import { checkLoggedIn, pathAuthorize, apiAuthorize } from "../../middlewares/authenticate";


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
router.get("/login", async (req: ExtendedRequest, res) => {
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
router.get("/contact-admin", async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "contact-admin.html", {
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
router.get("/edit-client/:id", apiAuthorize, async (req: ExtendedRequest, res) => {
  try {
    var clientData = await renderData.render_data_post('/api/v1/client/view' , req?.authToken==undefined?'':req?.authToken, {id:req.params.id});
    console.log("🚀 ~ router.get ~ clientData:", clientData);
    if(!clientData.status){
      res.redirect('/');
      return;
    }
    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "edit-client.html", {
      clientData:clientData.data,
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
router.get("/client-list", apiAuthorize, async (req: ExtendedRequest, res) => {
  try {
    var clients = await renderData.render_data_post('/api/v1/client/list' , req?.authToken==undefined?'':req?.authToken, {});
    console.log("🚀 ~ router.get ~ clients:", clients);
    if(!clients.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav();
    let footer = await mainFooter();

    res.status(200).render(view + "client-list.html", {
      clients: clients.data.length == 0?[]:clients.data,
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
