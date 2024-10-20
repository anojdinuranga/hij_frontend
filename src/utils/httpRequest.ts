import axios from 'axios';
import DefaultResponse from './DefaultResponse';
import { ExtendedRequest } from '../config/types';
import logger from '../config/logger';
const getIP = require('ipware')().get_ip as any;
import https from 'https'; 


const post = async (url:string, data:any, token:string = "", req: ExtendedRequest|null = null) => {
    
    let ipInfo;
    if(req) {
        ipInfo = getIP(req);
    }
    const agent = new https.Agent({
        rejectUnauthorized: false,  // For testing purposes; don't use this in production
        minVersion: 'TLSv1.2'       // Force the minimum TLS version
      });
      
    let ipAddress = (ipInfo) ? ipInfo.clientIp : "";
    let userAgent = ((req) ? req.headers['user-agent'] : "");
    return new Promise((resolve) => {
        axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(result => {
            resolve(DefaultResponse.successFormat("200", result.data));
        })
        .catch(error => {
            console.log("result", error);
            resolve(DefaultResponse.errorFormat("000", error));
        });
    });
}


const get = async (url: string, token: string) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            resolve(DefaultResponse.successFormat("200", result.data));
        })
        .catch(error => {
            resolve(DefaultResponse.errorFormat("000", error));
        });
    });
}

export default {
    post,
    get
}