const validateMainRequest = (req, res, next) => {
    let {width, height} = req.body;

    if (typeof width !== 'undefined') {
        let newWidth = parseInt(width);
        if (!isNaN(newWidth)) {
            req.body.width = newWidth;
        } else {
            return res.status(500).json({error: 'width parameter must be number or undefined'});
        }
    }

    if (typeof height !== 'undefined') {
        let newHeight = parseInt(height);
        if (!isNaN(newHeight)) {
            req.body.height = newHeight;
        } else {
            return res.status(500).json({error: 'height parameter must be number or undefined'});
        }
    }
    
    return next();
}

module.exports = validateMainRequest;