/**
 * @file /controllers/api/settings/content/blog-posts/delete-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { BlogPost } = require('../../../../../models');

// export get blog posts by id controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get blog posts
        const blogPost = await BlogPost.findById(id);

        // check if blog post exists
        if (!blogPost) {
            return res.status(200).send({
                message: 'Blog post not found',
            });
        }

        // send response
        return res.status(200).send({
            message: 'Fetched blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
