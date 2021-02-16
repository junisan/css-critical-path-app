var express = require('express');
var router = express.Router();
const penthouse = require('penthouse');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/critical', (req, res) => {
    const url = req.body.url;
    const css = Buffer.from(req.body.css, 'base64').toString();

    penthouse({
        url: url,
        cssString: css
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
