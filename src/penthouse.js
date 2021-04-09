const puppeteer = require('puppeteer-core');
const Penthouse = require('penthouse');

const penthouseLaunch = async ({ url, cssContent, width, height }) => {
    const browserConfig = puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: width,
            height: height
        }
    })

    try {
        return await Penthouse({
            url: url,
            cssString: cssContent,
            width: width,
            height: height,
            puppeteer: {
                getBrowser: () => browserConfig
            }
        })
    } catch(e) {
        throw e;
    }
}

module.exports = penthouseLaunch;