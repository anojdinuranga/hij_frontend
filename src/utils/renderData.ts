import config from "../config/config";
import DefaultResponse from './DefaultResponse';
import httpRequest from "./httpRequest";

const render_data = async (path: string, authToken: string) => {
    try {
        let response:{
            status: boolean,
            message: string,
            data: any
        } = {
            status: false,
            message: "Something went wrong",
            data: ""
        };

        let url = config.backendDomain + path;
        let result: any = await httpRequest.get(url, authToken);

        if (result && typeof result === "object" && result.hasOwnProperty('status')) {
            let data = result.data;
            if (typeof data === "object" && data.hasOwnProperty('status')) {
                response.status = data.status;
                response.message = data.message || response.message;
                response.data = data.data || response.data;
            }
        }
        
        return response;

    } catch (err) {
        return {
            status: false,
            message: "Something went wrong",
            data: ""
        };
    }
}

const render_data_post = async (path: string, authToken: string, data:any ={}) => {
    let response:{
        status: boolean,
        message: string,
        data: any
    } = {
        status: false,
        message: "Something went wrong",
        data: ""
    };
    try {

        let url = config.backendDomain + path;
        let result: any = await httpRequest.post(url, data, authToken);
        if (result && typeof result === "object" && result.hasOwnProperty('status')) {
            let data = result.data;
            if (typeof data === "object" && data.hasOwnProperty('status')) {
                response.status = data.status;
                response.message = data.message || response.message;
                response.data = data.data || response.data;
            }
        }
        return response;
        
    } catch (err) {
        return response;
    }
}

export default {
    render_data,
    render_data_post
}