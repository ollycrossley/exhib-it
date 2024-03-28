import axios from "axios"

// VA: https://developers.vam.ac.uk/guide/v2/search/introduction.html
const baseUrl = "https://api.vam.ac.uk/v2/objects"


export const getObjectsBySearchVA = async (q) => {
    try {
        const response = await axios.get(`${baseUrl}/search?q=${q}`)
        return response.data.records
    } catch (error) {
        console.log(error);
    }
}