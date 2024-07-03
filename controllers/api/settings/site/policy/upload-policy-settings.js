/**
 * @file /controllers/api/settings/site/policy/upload-policy-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 Jul, 2024
 * @update_date 03 Jul, 2024
 */

// export upload policy settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { upload } = req.files;

        // return response
        return res.status(200).send({
            message: 'Policy settings uploaded successfully',
            url: upload.path,
        });
    } catch (error) {
        return next(error);
    }
};
