import axios from "axios"

// VA: https://developers.vam.ac.uk/guide/v2/search/introduction.html

const baseUrl = "https://api.vam.ac.uk/v2/objects"


export const getObjectByIdVA = async (id) => {
    try {
        const response = await axios.get(`https://api.vam.ac.uk/v2/museumobject/${id}`)
        const data = response.data.record
        data.images = data.images.map(i => {
            return `https://framemark.vam.ac.uk/collections/${i}/full/full/0/default.jpg`
        })

        const categories = data.categories.map(c => { return c.text})
        const names = data.artistMakerPerson.map(n => { return n.name.text})
        names.push(...data.artistMakerOrganisations.map(n => { return n.name.text}))
        let namesString = ""
        if (names.length > 0) {
            names.forEach((n, i) => {
                if (i === 0) {
                    namesString += `${n}`
                } else {
                    namesString += `; ${n}`
                }
            })
        }
        return {
            images: data.images,
            date: data["productionDates"][0].date.text || "Unknown",
            description: data["briefDescription"],
            link: undefined,
            categories: categories || undefined,
            credits: namesString || undefined,
        };
    } catch (e) {
        console.error(e)
    }
}

export const getObjectsBySearchVA = async (q, page = 1, size = 100) => {
    try {
        const response = await axios.get(`${baseUrl}/search?q=${q}&page_size=${size}&images_exist=1&page=${page}`)
        const vaObjects = response.data.records
        let vaImageObjs = vaObjects.filter(obj => obj["_images"]["_iiif_image_base_url"] !== undefined)
        vaImageObjs = vaImageObjs.map(obj => {
            return {
                apiType: "va",
                id: obj["systemNumber"],
                primaryTitle: obj["_primaryTitle"],
                primaryMaker: obj["_primaryMaker"]["name"],
                image: `${obj["_images"]["_iiif_image_base_url"]}full/full/0/default.jpg`,
                intId: `va${obj["systemNumber"]}`
            }
        })
        return uniqify(vaImageObjs, "image")

    } catch (error) {
        console.log(error);
    }
}

// HARVARD: https://github.com/harvardartmuseums/api-docs?ref=apilist.fun

export const getObjectByIdHARV = async (id) => {
    try {
        const response = await axios.get(`https://api.harvardartmuseums.org/object/${id}`, {
            params: {
                apikey: process.env.NEXT_PUBLIC_HARVARD_API_KEY,
            }
        })
        const data = response.data
        data.images = data.images.map(i => {
            return `${i["iiifbaseuri"]}/full/full/0/default.jpg`
        })


        const names = data.people.map(i => {
            return i.alphasort
        })

        let namesString = ""
        if (names.length > 0) {
            names.forEach((n, i) => {
                if (i === 0) {
                    namesString += `${n}`
                } else {
                    namesString += `; ${n}`
                }
            })
        }

        return {
            images: [...data.images] || null,
            date: data["dated"] || null,
            description: data.description || null,
            link: data.url || undefined,
            categories: [data.classification || null, data["culture"] || null, data["technique"] || null].filter(e => e !== null),
            credits: namesString || null
        }
    } catch (e) {
        console.error(e)
    }
}

export const getObjectsBySearchHARV = async (q, page = 1, size = 100) => {
    try {
        const response = await axios.get(`https://api.harvardartmuseums.org/object?size=${size}&page=${page}`, {
            params: {
                apikey: process.env.NEXT_PUBLIC_HARVARD_API_KEY,
                keyword: q,
                fields: "objectnumber,title,dated,url,images,primaryimageurl,people",
                hasimage: 1
            }
        })
        const harvResponse = response.data
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
        harvResponse.records.forEach(r => {
            if (r.multipleMakers !== undefined && r.multipleMakers.length > 0) {
                r.primaryMaker = r.multipleMakers[0]["alphasort"]
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
        return (response.data["objectIDs"]).sort((a, b) => a - b)
    } catch (error) {
        console.log(error);
    }
}

export const getObjectByIdMET = async (id) => {
    try {
        const response = await axios.get(`${baseUrlMet}/objects/${id}`)
        const data = response.data


        return {
            images: [data["primaryImage"], ...data["additionalImages"] || null ],
            date: data["objectDate"],
            description: data["measurements"]["elementDescription"],
            link: data["objectURL"] || undefined,
            categories: [data["culture"] || null, data["medium"] || null, data["country"] || null].filter(e => e !== null),
            credits: [data["artistAlphaSort"]]
        }
    } catch (error) {
        console.log(error);
    }
}

export const getObjectsBySearchMET = async (q, page = 1, size = 100) => {
    try {
        const response = await axios.get(`${baseUrlMet}/search?isOnView=true&hasImages=true&q=${q}`)
        const start = (page * size) - size

        const sortedResponse = (response.data["objectIDs"]).sort((a, b) => a - b)

        const pagedObjectIds = sortedResponse.slice(start, start + (size - 1))

        // console.log(pagedObjectIds)

        const promisedObjects = pagedObjectIds.map(obj => axios.get(`${baseUrlMet}/objects/${obj}`))
        const receivedObjects = await Promise.all(([...promisedObjects]))
        let objectsFormatted = (receivedObjects).map(obj => obj.data)
        objectsFormatted = objectsFormatted.filter(obj => obj["primaryImage"] !== '')
        objectsFormatted = objectsFormatted.map(obj => {
            return {
                apiType: "met",
                id: obj["objectID"],
                primaryTitle: obj["title"],
                primaryMaker: obj["artistAlphaSort"],
                image: obj["primaryImage"],
                intId: `met${obj["objectID"]}`
            }
        })
        return uniqify(objectsFormatted, "image")

    } catch (error) {
        console.log(error);
    }
}

// GENERIC FUNCTIONS

const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);