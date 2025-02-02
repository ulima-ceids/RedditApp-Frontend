import { TextEncoder } from 'text-encoding-utf-8';
import axios from 'axios'

const URI = 'http://localhost:3700';

const get = async (endpoint, token) => {
    try {
        const url = URI.concat(endpoint);

        const authAxios = axios.create({
            baseURL: URI,
            headers: {
                Authorization: token
            }
        })

        return await authAxios.get(url).catch(error => alert(error));
    } catch(err) {
        console.error(err);
        return null;
    }
}

const post = async (endpoint, request) => {

    try {
        const url = URI.concat(endpoint);
        return await axios.post(url,request);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const put = async (endpoint, request, token) => {
    try {
        const url = URI.concat(endpoint);

        const authAxios = axios.create({
            baseURL: URI,
            headers: {
                Authorization: token
            }
        })

        return await authAxios.put(url, request);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const remove = async (endpoint, token) => {

    try {
        const url = URI.concat(endpoint);

        const authAxios = axios.create({
            baseURL: URI,
            headers: {
                Authorization: token
            }
        })

        return await authAxios.delete(url);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const Base = { get, put, post, remove }

export default Base;