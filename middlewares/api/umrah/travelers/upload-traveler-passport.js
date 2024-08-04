/**
 * @file /middlewares/api/umrah/travelers/upload-traveler-passport
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Traveler } = require('../../../../models');

// export passport upload middleware
module.exports =
    (dir = '/umrah/traveler') =>
    async (req, res, next) => {
        let traveler = {};

        // get validated data
        const { id } = req.params || {};
        const { passport } = req.files || {};

        // check if id exists
        if (id) {
            // get traveler
            traveler = await Traveler.findById(id);
        }

        // check if passport exists
        if (traveler?.passport) {
            // delete previous passport
            fs.unlinkSync(
                path.join(__dirname, './../../../../public', traveler.passport)
            );
        }

        // prepare file path
        const passportPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${passport.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            passportPath
        );

        // move file to upload path
        await passport.mv(uploadLogoPath);

        // set file path to request body
        req.files.passport.path = passportPath;

        // proceed to next middleware
        return next();
    };
