const http = require('http');
const https = require('https');

const checkHttpOk = (url) => {
    const promise = new Promise((resolve, reject) => {
        const client = (url.indexOf("https") > -1) ? https : http;
        client.request(url, { method: 'HEAD' }, (res) => {
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                return resolve();
            } else {
                return reject(`Imposible to fetch ${url}. HTTP Resoponse was ${res.statusCode}.`)
            }
        })
            .on('error', (err) => {
                return reject(err);
            }).end();

    });

    return promise;
}

module.exports = checkHttpOk;