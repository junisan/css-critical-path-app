const axios = require('axios')

const getFinalUrl = async (url, allowNon200 = false) => {
    try {
        const response = await axios.get(url)
        return response.request.res.hasOwnProperty('responseUrl') ? response.request.res.responseUrl : url
    } catch (error) {
        if (allowNon200) {
            return error.response.request.res.hasOwnProperty('responseUrl') ? error.response.request.res.responseUrl : url
        } else {
            const httpCode = error.response ? error.response.statusCode : -1
            return new Error(`Imposible to fetch ${url}. HTTP response was ${httpCode}.`)
        }
    }
}

module.exports = getFinalUrl;