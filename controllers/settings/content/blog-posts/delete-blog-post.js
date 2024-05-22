/**
 * @file /controllers/settings/content/blog-posts/delete-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 11 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
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

        // delete blog post thumbnail
        if (blogPost?.thumbnail) {
            fs.unlinkSync(path.join(__dirname, '../../../../public/', blogPost.thumbnail));
        }

        // delete blog post banner
        if (blogPost?.banner) {
            fs.unlinkSync(path.join(__dirname, '../../../../public/', blogPost.banner));
        }

        // send response
        return res.send({
            message: 'Deleted blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
