/**
 * @file /controllers/api/settings/content/blog-posts/get-blog-posts.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export get blog posts controller
module.exports = async (req, res, next) => {
    try {
        // get blog posts
        const blogPosts = await BlogPost.find();

        // send response
        return res.send({
            message: 'Fetched blog posts successfully',
            blogPosts,
        });
    } catch (error) {
        return next(error);
    }
};
