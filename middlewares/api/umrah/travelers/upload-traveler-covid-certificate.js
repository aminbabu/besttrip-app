/**
 * @file /middlewares/api/umrah/travelers/upload-traveler-covid-certificate
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

// export travelerCovidCertificate upload middleware
module.exports =
    (dir = '/umrah/traveler') =>
    async (req, res, next) => {
        let traveler = {};

        // get validated data
        const { id } = req.params || {};
        const { travelerCovidCertificate } = req.files || {};

        // check if the req method is not post and covid certificate
        if (req.method !== 'POST' && !travelerCovidCertificate) {
            return next();
        }

        // check if id exists
        if (id) {
            // get traveler
            traveler = await Traveler.findById(id);
        }

        // check if  travelerCovidCertificate exists
        if (traveler?.travelerCovidCertificate) {
            // delete previous travelerCovidCertificate
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerCovidCertificate
                )
            );
        }

        // prepare file path
        const travelerCovidCertificatePath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${travelerCovidCertificate.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            travelerCovidCertificatePath
        );

        // move file to upload path
        await travelerCovidCertificate.mv(uploadLogoPath);

        // set file path to request body
        req.files.travelerCovidCertificate.path = travelerCovidCertificatePath;

        // proceed to next middleware
        return next();
    };
