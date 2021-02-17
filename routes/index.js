const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer-core');
const penthouse = require('penthouse');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/critical', (req, res) => {
    const url = req.body.url;
    const css = Buffer.from(req.body.css, 'base64').toString();

    const browserPromise = puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1300,
            height: 900
        }
    })

    penthouse({
        url: url,
        cssString: css,
        puppeteer: {
            getBrowser: () => browserPromise
        }
    })
        .then(criticalCSS => {
            const base64code = Buffer.from(criticalCSS).toString('base64');
            return res.status(200).json({code: base64code});
        })
        .catch(err => {
            return res.status(500).json({error: err.message});
        });
});

module.exports = router;
