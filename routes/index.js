const express = require('express');
const router = express.Router();
const Critical = require('../src/critical');
const validateRequest = require('./validator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/critical', validateRequest, (req, res) => {
    const url = req.body.url;
    const css = Buffer.from(req.body.css, 'base64').toString();
    const height = req.body.height || 1000;
    const width = req.body.width || 1300;
    const expectHttpOk = req.body.hasOwnProperty('expectHttpOk') ? req.body.expectHttpOk : true;

    Critical({
        url: url,
        cssContent: css,
        width: width,
        height: height,
        expectHttpOk: expectHttpOk
    })
    .then(base64CSS => res.status(200).json({url, height, width, expectHttpOk, code: base64CSS}))
    .catch(error => {
        console.error(error);
        res.status(500).json({error: error.message})
    })


});

module.exports = router;
