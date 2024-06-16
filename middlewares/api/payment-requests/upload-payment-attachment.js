/**
 * @file /middlewares/api/payment-requests/upload-payment-receipt.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { PaymentRequest } = require('../../../models');

// export payment receipt upload middleware
module.exports =
    (dir = '/payment-requests') =>
    async (req, res, next) => {
        let paymentRequest = {};

        // get validated data
        const { id } = req.params || {};
        const { attachment } = req.files || {};

        // check if attachment exists
        if (!attachment) {
            return res.status(400).json({
                message: 'Attachment is required',
            });
        }

        // check if id exists
        if (id) {
            // find payment request by id
            paymentRequest = await PaymentRequest.findById(id);
        }

        // check if payment attachment exists
        if (paymentRequest?.attachment) {
            // delete existing payment attachment
            fs.unlinkSync(path.join(__dirname, '../../../public/', paymentRequest.attachment));
        }

        // prepare file path
        const uploadPath = path.join('uploads/', `${dir}/${uuidv4()}_${attachment.name}`);
        const uploadFilePath = path.join(__dirname, '../../../public/', uploadPath);

        // move file to upload path
        attachment.mv(uploadFilePath);

        // set file path to request body
        req.files.attachment = uploadPath;

        // proceed to next middleware
        return next();
    };
