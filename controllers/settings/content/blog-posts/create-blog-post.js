/**
 * @file /controllers/settings/content/blog-post/create-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export create blog post controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;

        // create blog post
        const blogPost = await BlogPost.create({
            link,
            status,
        });

        // send response
        return res.status(201).send({
            message: 'Created blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
