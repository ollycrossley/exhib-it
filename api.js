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
                apiType: "va",
                id: obj["systemNumber"],
                primaryTitle: obj["_primaryTitle"],
                primaryMaker: obj["_primaryMaker"]["name"],
                image: `${obj["_images"]["_iiif_image_base_url"]}full/full/0/default.jpg`,
                intId: `va${obj.systemNumber}`
            }
        })

    } catch (error) {
        console.log(error);
    }
}

// HARVARD: https://github.com/harvardartmuseums/api-docs?ref=apilist.fun
export const getObjectBySearchHARV = async (q) => {
    try {
        const response = await axios.get("https://api.harvardartmuseums.org/object", {
            params: {
                apikey: process.env.NEXT_PUBLIC_HARVARD_API_KEY,
                keyword: q,
                fields: "objectnumber,title,dated,url,images,primaryimageurl,people",
                hasimage: 1
            }
        })
        const harvResponse  = response.data
        harvResponse.records = harvResponse.records.filter(item => item["primaryimageurl"] !== null && item["images"].length !== 0)
        harvResponse.records = harvResponse.records.map(obj => {
            return {
                apiType: "harv",
                id: obj["id"],
                primaryTitle: obj["title"],
                multipleMakers: obj["people"],
                image: `${obj["images"][0]["iiifbaseuri"]}/full/full/0/default.jpg`,
                intId: `harv${obj.id}`
            }
        })
        harvResponse.records = harvResponse.records.map(r => {
            return {
                ...r,
                primaryMaker: r.multipleMakers[0]["alphasort"]
            }
        })

        return harvResponse.records

    } catch (e) {
        console.log(e)
    }
}


// MET: https://metmuseum.github.io/#search
const baseUrlMet = "https://collectionapi.metmuseum.org/public/collection/v1/"

export const getObjectIdsBySearchMET = async (q) => {
    try {
        const response = await axios.get(`${baseUrlMet}/search?isOnView=true&hasImages=true&q=${q}`)
        return (response.data.objectIDs).sort((a,b) => a - b)
    } catch (error) {
        console.log(error);
    }
}

export const getObjectByIdMET = async (id) => {
    try {
        const response = await axios.get(`${baseUrlMet}/objects/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getObjectsBySearchMET = async (q, page = 1, size = 20) => {
    try {
        const response = await axios.get(`${baseUrlMet}/search?isOnView=true&hasImages=true&q=${q}`)
        const start = (page*size)-size

        const sortedResponse = (response.data.objectIDs).sort((a,b) => a - b)

        const pagedObjectIds = sortedResponse.slice(start, start+(size-1))

        const promisedObjects = pagedObjectIds.map(obj => axios.get(`${baseUrlMet}/objects/${obj}`))
        const receivedObjects = await Promise.all(([...promisedObjects]))
        let objectsFormatted = (receivedObjects).map(obj => obj.data)
        objectsFormatted = objectsFormatted.filter(obj => obj.primaryImage !== '')
        objectsFormatted = objectsFormatted.map(obj => {
            return {
                apiType: "met",
                id: obj["objectID"],
                primaryTitle: obj["title"],
                primaryMaker: obj["artistAlphasort"],
                image: obj["primaryImage"],
                intId: `met${obj.objectID}`
            }
        })
        console.log(objectsFormatted)
        return objectsFormatted

    } catch (error) {
        console.log(error);
    }
}