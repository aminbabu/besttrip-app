/**
 * @file /controllers/settings/content/blog-posts/delete-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export delete blog post controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get blog post
        const blogPost = await BlogPost.findById(id);

        // check if blog post exists
        if (!blogPost) {
            return res.status(404).send({
                message: 'Blog post not found',
            });
        }

        // delete blog post
        await blogPost.deleteOne();

        // send response
        return res.send({
            message: 'Deleted blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
