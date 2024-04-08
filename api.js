import axios from "axios"

// VA: https://developers.vam.ac.uk/guide/v2/search/introduction.html
const baseUrl = "https://api.vam.ac.uk/v2/objects"


export const getObjectsBySearchVA = async (q) => {
    try {
        const response = await axios.get(`${baseUrl}/search?q=${q}`)
        const vaObjects = response.data.records
        const vaImageObjs = vaObjects.filter(obj => obj["_images"]["_iiif_image_base_url"] !== undefined)
        return vaImageObjs.map(obj => {
            return {
                id: obj["systemNumber"],
                primaryTitle: obj["_primaryTitle"],
                primaryMaker: obj["_primaryMaker"]["name"],
                image: `${obj["_images"]["_iiif_image_base_url"]}full/full/0/default.jpg`
            }
        })

    } catch (error) {
        console.log(error);
    }
}