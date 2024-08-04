/**
 * @file /middlewares/api/umrah/travelers/upload-traveler-nid
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

// export travelerNID upload middleware
module.exports =
    (dir = '/umrah/traveler') =>
    async (req, res, next) => {
        let traveler = {};

        // get validated data
        const { id } = req.params || {};
        const { travelerNID } = req.files || {};

        // check if id exists
        if (id) {
            // get traveler
            traveler = await Traveler.findById(id);
        }

        // check if travelerNID exists
        if (traveler?.travelerNID) {
            // delete previous travelerNID
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerNID
                )
            );
        }

        // prepare file path
        const travelerNIDPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${travelerNID.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            travelerNIDPath
        );

        // move file to upload path
        await travelerNID.mv(uploadLogoPath);

        // set file path to request body
        req.files.travelerNID.path = travelerNIDPath;

        // proceed to next middleware
        return next();
    };
