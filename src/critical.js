const penthouse = require('./penthouse');
const checkHttpOk = require('./httpRequest');

const critical = async ({url, cssContent, height = 1000, width = 1300, expectHttpOk = true}) => {

    if (expectHttpOk) {
        try {
            await checkHttpOk(url);
        } catch (e) {
            throw new Error(e);
        }
    }
    try{
        const resultCss = await penthouse({url, cssContent, width, height});
        return Buffer.from(resultCss).toString('base64');
    }catch(e) {
        throw e;
    }
    
}

module.exports = critical