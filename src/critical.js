const penthouse = require('./penthouse');
const getFinalUrl = require('./httpRequest');

const critical = async ({url, cssContent, height = 1000, width = 1300, expectHttpOk = true}) => {
    try{
        const finalUrl = await getFinalUrl(url, !expectHttpOk);
        const resultCss = await penthouse({url: finalUrl, cssContent, width, height});
        return Buffer.from(resultCss).toString('base64');
    }catch(e) {
        throw e;
    }
}

module.exports = critical