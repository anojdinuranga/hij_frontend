import express, { Router } from 'express';
import config from '../../config/config';
import viewRoute from './view.route';
import apiRoute from './api.route';

const router: Router = express.Router();

interface defaultRoutesObj {
  path: string;
  route: Router;
}
const defaultRoutes:defaultRoutesObj[] = [
  { path: '/', route: apiRoute },
  { path: '/', route: viewRoute } // keep this end
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
