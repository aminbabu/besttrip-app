/**
 * @file controllers/dashboard/settings/content/blog-posts/view-blog-posts.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { BlogPost } = require('../../../../../models');

// export blog posts view controller
module.exports = async (req, res) => {
    try {
        // get blog posts
        const blogPosts = await BlogPost.find();

        // render blog posts view
        return res.render('dashboard/settings/content/blog-posts', {
            title: 'Blog Posts',
            user: req.user,
            blogPosts,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
