const URI: string = "http://localhost:3002";

const Endpoint = (method: string) => async(endpoint: string, json?: object) => {
    try{
        const url: string = URI.concat(endpoint)
        const response: Response = await fetch(url, {
            method,
            ...(json && {
                body: JSON.stringify(json)
            })
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
}

const get = Endpoint("GET");
const post = async(endpoint: string, json?: object) => {
    try{
        const url: string = URI.concat(endpoint)
        console.log(url)
        console.log(JSON.stringify(json))
        const response: Response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
}
const put = Endpoint("PUT");
const remove = Endpoint("REMOVE");

const Base = { get, put, post, remove };
export default Base;