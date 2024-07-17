/**
 * @file /middlewares/api/validators/settings/content/blog-posts/validate-blog-post-ids.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const {
    blogPostSchema,
} = require('../../../../../../schemas/zod/settings/content');
const { zodErrorHandler } = require('../../../../../../handlers/errors');

// export blog post ids validator middleware
module.exports = (req, res, next) => {
    // validate request body
    const { error, success } = blogPostSchema
        .pick({ ids: true })
        .safeParse(req.body.ids);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
