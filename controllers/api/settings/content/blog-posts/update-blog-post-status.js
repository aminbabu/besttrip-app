/**
 * @file /controllers/api/settings/content/blog-posts/update-blog-posts-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { BlogPost } = require('../../../../../models');

// export update blog post status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get blog post
        const blogPost = await BlogPost.findById(id);

        // check if blog post exists
        if (!blogPost) {
            return res.status(200).send({
                message: 'Blog post not found',
            });
        }

        // update blog post
        blogPost.set({ status });

        // save blog post
        await blogPost.save();

        // send response
        return res.status(200).send({
            message: 'Updated blog post status successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
