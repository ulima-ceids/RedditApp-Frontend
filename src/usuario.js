import Base from './base.js'

const endpoint = '/usuario';

const register = async (request) => await Base.post('/register',request);
const login = async (request) => await Base.post('/login',request);

const findUser = async(token) => await Base.get('/usuario', token);

const updateUser = async(request, token) => await Base.put('/update-user', request, token);

const remove = async(token) => await Base.put('/delete-user', token);

/*
const remove = async(id) => {
    const newEndpoint = endpoint.concat('/',id);
    return await Base.remove(newEndpoint);
}*/

const findCurrent = async() => {
    //const newEndpoint = endpoint.concat('/',id);
    //return await Base.get(newEndpoint);
    return await Base.get(endpoint, window.localStorage.token);
}

const updateCurrent = async(request) => await Base.put('/update-user', request, window.localStorage.token);



const UsuarioApi = { register, login, findUser, findCurrent, updateUser, updateCurrent, remove }

export default UsuarioApi;