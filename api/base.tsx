import axios, { AxiosHeaderValue, AxiosInstance } from 'axios';
import dotenv from "dotenv";

dotenv.config();
const URI: string = process.env.URI;

const AsyncRequest = (code: (url: string, axios_: AxiosInstance, request?) => Promise<any>) => async (endpoint: string, token?: AxiosHeaderValue, request?) => {
    const AuthAxios = (token: AxiosHeaderValue) => {
        return axios.create({
            baseURL: URI,
            headers: {
                Authorization: token
            }
        });
    }
    
    try {
        const url: string = URI.concat(endpoint);
        const axios_: AxiosInstance = token? AuthAxios(token) : axios;
        return await code(url, axios_, request);

    } catch(err) {
        console.error(err);
        return null;
    }
}

const get = AsyncRequest(async (url: string, axios_: AxiosInstance) => await axios_.get(url));
const post = AsyncRequest(async (url: string, axios_: AxiosInstance, request) => await axios_.post(url, request));
const put = AsyncRequest(async (url: string, axios_: AxiosInstance, request) => await axios_.post(url, request));
const remove = AsyncRequest(async (url: string, axios_: AxiosInstance) => await axios_.delete(url));

const Base = { get, put, post, remove };
export default Base;