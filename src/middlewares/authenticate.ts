import DefaultResponse from '../utils/DefaultResponse';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../config/types';
import renderData from '../utils/renderData';

/* Main functions */
const apiAuthorize = async (req: ExtendedRequest, res: Response, next: NextFunction) => {

    try {
        
        let result = getCookie( 'auth', req.headers.cookie || "" );
        if ( !result.status ) {
            req.authToken =  "";
            next();
            return;
        }
    
        req.authToken = `${result.data}`;
        next();

    } catch ( err ) {
        console.error( err );
        req.authToken =  "";
        next();
    }

};
const pathAuthorize = async (req: ExtendedRequest, res: Response, next: NextFunction) => {

    try {

        let result = getCookie( 'auth', req.headers.cookie || "" );

        if ( !result.status ) {
            res.redirect("/");
            return;
        }

        req.authToken = `${result.data}`;
        req.loggedIn = true;
        
        // Get userInformation
        let userInformation = await checkUser(req.authToken);
        if(!userInformation.status) {
            console.error("Error getting user information");
            res.redirect("/");
            return;
        }

        // Assign data to req
        req.data = {}
        req.data.userRole = userInformation.data.role;

        next();

    } catch ( err ) {
        console.error( err );
        res.redirect("/");
    }
    
};
const getToken = async (req: ExtendedRequest) => {

    try {

        let result = getCookie( 'auth', req.headers.cookie || "" );
        if ( !result.status ) {
            req.authToken =  "";
            return;
        }
    
        req.authToken = `${result.data}`;
        return req.authToken;

    } catch ( err ) {
        console.error( err );
        return "";
    }

};
const checkLoggedIn = async (req: ExtendedRequest, res: Response, next: NextFunction) => {

    
    req.loggedIn = false;
    if ( req.headers.cookie === undefined ) {
        next();
        return;
    }

    let result = getCookie( 'auth', req.headers.cookie );
    if ( !result.status ) {
        next();
        return;
    }

    let check = await renderData.render_data('/api/v1/user/check', `${result.data}`);
    if(!check.status){
        next();
        return;
    }
    req.loggedIn = true;
    next();

};

/* Helper functions */
const getCookie = (cookie_name: string, cookie: string) => {
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try {
        return {
            "status": true,
            "data": (typeof cookie.match(re) === "object" ) ? cookie.match(re) : ""
        }
    } catch {
        return {
            "status": false
        }
    }
};
const checkUser = async (token: string) => {
    try {
        let check = await renderData.render_data('/api/v1/user/check', token);
        return check;
    } catch ( err ) {
        console.error( err );
        return DefaultResponse.errorFormat("006");
    }
}

export {
    apiAuthorize,
    pathAuthorize,
    getToken,
    checkLoggedIn
};
