import express, { Request, Response, NextFunction } from "express";
import DefaultResponse from './../../utils/DefaultResponse';
import httpRequest from './../../utils/httpRequest';
import { apiAuthorize, getToken } from './../../middlewares/authenticate';
import validate from './../../validate/api.validate'; // Input validations
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import config from "../../config/config";
import { ExtendedRequest } from "../../config/types";
import logger from "../../config/logger";

const router = express.Router();

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

interface httpResponse {
    status: boolean;
    message: string;
    data: any
}
router.post("/api/v1/user/login", apiAuthorize, async (req: ExtendedRequest, res: Response) => {
    try {
        const data = await validate.data_validate.validateAsync(req.body);
        try {
            /**
             * @detail
             * Process
             */
            let url = config.backendDomain + req.path;
            let result = await httpRequest.post(url, data, (req.authToken) ? req.authToken: "", req) as httpResponse;
            if (!result.status) {
                res.status(200).send(result);
            } else {
                if (!result.data.status) {
                    res.status(200).send(result.data);
                } else {
                    res.cookie("auth", result.data.data.accessToken, {
                        httpOnly: true,
                        maxAge: Number(config.jwt_a_max_age),
                    });
                    DefaultResponse.success(res, "200", result.data.data);
                }
            }
        } catch (err) {
            DefaultResponse.error(res, "500");
        }
    } catch (err) {
        logger.error(err);
        DefaultResponse.error(res, "006");
    }
});

router.post("/file/image/upload", upload.single('image'), async (req: Request, res: Response) => {
    try {
        let token = await getToken(req); // Access token

        // Get the file data and other parameters from the request
        const file = req.file;
        const data = await validate.data_validate.validateAsync(req.body);

        // Check if a file was uploaded
        if (!file) {
            return res.status(400).send("No file uploaded.");
        }

        // Prepare the FormData for the Axios request
        const formData = new FormData() as any;
        formData.append('imageId', data.imageId);
        formData.append('resultId', data.resultId);
        formData.append('image', file.buffer, { filename: file.originalname });

        // Make the Axios request to another server
        const axiosResponse = await axios.post(config.backendDomain + '/api/v1/file/image/upload', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${token}`
            },
        });

        // Handle the response from the other server
        res.status(200).send(axiosResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/uploads/images/:image", apiAuthorize, async (req: Request, res: Response) => {
    try {
        /**
         * @detail
         * Process
         */
        let imageUrl = config.backendDomain + "/uploads/images/" + req.params.image;
        const axiosResponse = await axios.get(imageUrl, {
            responseType: 'stream'
        });
        // Set the content type based on the response headers
        res.set('Content-Type', axiosResponse.headers['content-type']);
        // Pipe the image data directly to the response stream
        axiosResponse.data.pipe(res);
    } catch (err) {
        //console.log(err);
        res.send("404 | Not found");
    }
});

router.post("/api/v1/*", apiAuthorize, async (req: ExtendedRequest, res: Response) => {
    try {
        const data = await validate.data_validate.validateAsync(req.body);
        try {
            /**
             * @detail
             * Process
             */
            let url = config.backendDomain + req.path;
            let result = await httpRequest.post(url, data, (req.authToken) ? req.authToken : "", req) as httpResponse;
            if (!result.status) {
                res.status(200).send(result);
            } else {
                res.status(200).send(result.data);
            }
        } catch (err) {
            DefaultResponse.error(res, "500");
        }
    } catch (err) {
        logger.error(err);
        DefaultResponse.error(res, "006");
    }
});

router.get("/api/v1/*", apiAuthorize, async (req: ExtendedRequest, res: Response) => {
    try {
        /**
         * @detail
         * Process
         */
        let url = config.backendDomain + req.path;
        let result = await httpRequest.get(url, (req.authToken) ? req.authToken : "") as httpResponse;
        if (!result.status) {
            res.status(200).send(result);
        } else {
            res.status(200).send(result.data);
        }
    } catch (err) {
        logger.error(err);
        DefaultResponse.error(res, "500");
    }
});

router.get("/logout", apiAuthorize, async (req: Request, res: Response) => {
    try {
        /**
         * @detail
         * Process
         */
        res.cookie("auth", "", {
            httpOnly: true,
            maxAge: 0,
        });
        res.redirect("/");
        return;
    } catch (err) {
        //console.log(err);
        res.render(
            global + "500.html"
        );
    }
});

export default router;
