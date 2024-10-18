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
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken);
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
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken);
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
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken);
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

router.get("/dashboard", pathAuthorize, async (req: ExtendedRequest, res) => {

  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Dashboard");
    let footer = await mainFooter();

    res.status(200).render(view + "dashboard.html", {
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
  
router.get("/add-client", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Add Client");
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

router.get("/edit-client/:id", pathAuthorize, async (req: ExtendedRequest, res) => {

  console.log("🚀 ~ router.get ~ req.authToken:", req)

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
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Update Client");
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

router.get("/client-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {
    var clients = await renderData.render_data_post('/api/v1/client/list' , req?.authToken==undefined?'':req?.authToken, {});
    if(!clients.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Client List");
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

router.get("/add-enquiry", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Add Enquiry");
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

router.get("/enquiry-form/:id", pathAuthorize, async (req: ExtendedRequest, res) => {

  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Enquiry Form");
    let footer = await mainFooter();

    res.status(200).render(view + "enquiry-form.html", {
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

router.get("/add-department", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Add Department");
    let footer = await mainFooter();

    res.status(200).render(view + "add-department.html", {
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


router.get("/department-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Department List");
    let footer = await mainFooter();

    res.status(200).render(view + "department-list.html", {
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

router.get("/submitted-sample-enquiry-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    var orders = await renderData.render_data_post('/api/v1/order/list' , req?.authToken==undefined?'':req?.authToken, {});
    if(!orders.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Submitted Sample Enquiry List");
    let footer = await mainFooter();

    res.status(200).render(view + "submitted-sample-enquiry-list.html", {
      orders:orders.data,
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

router.get("/approved-sample-enquiry-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    var orders = await renderData.render_data_post('/api/v1/order/list' , req?.authToken==undefined?'':req?.authToken, {});
    if(!orders.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Approved Sample Enquiry List");
    let footer = await mainFooter();

    res.status(200).render(view + "approved-sample-enquiry-list.html", {
      orders:orders.data,
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

router.get("/submitted-costing-enquiry-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    var orders = await renderData.render_data_post('/api/v1/order/list' , req?.authToken==undefined?'':req?.authToken, {});
    if(!orders.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Submitted Costing Enquiry List");
    let footer = await mainFooter();

    res.status(200).render(view + "submitted-sample-enquiry-list.html", {
      orders:orders.data,
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

router.get("/approved-costing-enquiry-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    var orders = await renderData.render_data_post('/api/v1/order/list' , req?.authToken==undefined?'':req?.authToken, {});
    if(!orders.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Approved Costing Enquiry List");
    let footer = await mainFooter();

    res.status(200).render(view + "approved-sample-enquiry-list.html", {
      orders:orders.data,
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

router.get("/add-user", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Add Employee");
    let footer = await mainFooter();

    res.status(200).render(view + "add-user.html", {
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

router.get("/user-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Employee List");
    let footer = await mainFooter();

    res.status(200).render(view + "user-list.html", {
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

router.get("/user-request-list", pathAuthorize, async (req: ExtendedRequest, res) => {
  try {
    var requestList = await renderData.render_data_post('/api/v1/user_register_request/list' , req?.authToken==undefined?'':req?.authToken, {});
    console.log("🚀 ~ router.get ~ requestList:", requestList);
    if(!requestList.status){
      res.redirect('/');
      return;
    }

    // Components to render
    let head = await mainHead();
    let script = await mainScript();
    let nav = await mainNav.mainNav(req?.authToken==undefined?'':req?.authToken, "Employee List");
    let footer = await mainFooter();

    res.status(200).render(view + "user-request-list.html", {
      requestList:requestList.data,
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
