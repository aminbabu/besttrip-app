/**
 * @file /routes/api/settings/content/blog-posts/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getBlogPosts,
    getBlogPost,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateBlogPostStatus,
    deleteManyBlogPosts,
} = require('../../../../../controllers/api/settings/content/blog-posts');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validateBlogPostId,
    validateBlogPostIds,
    validateBlogPost,
    validateBlogPostThumbnail,
    validateBlogPostBanner,
    validateBlogPostStatus,
} = require('../../../../../middlewares/api/validators/settings/content/blog-posts');
const {
    uploadBlogPostBanner,
    uploadBlogPostThumbnail,
} = require('../../../../../middlewares/api/settings/content/blog-posts');

/**
 * @description - get blog posts
 * @param {string} path - '/api/settings/content/blog-posts'
 * @param {function} controller - ['getBlogPost']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getBlogPosts);

/**
 * @description - get blog post by id
 * @param {string} path - '/api/settings/content/blog-posts/:id'
 * @param {function} validator - ['getBlogPost']
 * @param {function} controller - ['getBlogPost']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateBlogPostId, getBlogPost);

/**
 * @description - create blog post
 * @param {string} path - '/api/settings/content/blog-posts'
 * @param {function} validator - ['validateBlogPostFile', 'validateBlogPost']
 * @param {function} middleware - ['uploadBlogPostFile']
 * @param {function} controller - ['createBlogPost']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateBlogPostThumbnail,
    validateBlogPostBanner,
    validateBlogPost,
    uploadBlogPostThumbnail('/offers/blogs'),
    uploadBlogPostBanner('/offers/blogs'),
    createBlogPost
);

/**
 * @description - update blog post
 * @param {string} path - '/api/settings/content/blog-posts/:id'
 * @param {function} validator - ['validateBlogPostId', 'validateBlogPost']
 * @param {function} middleware - ['uploadBlogPostFile']
 * @param {function} controller - ['updateBlogPost']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateBlogPostThumbnail,
    validateBlogPostBanner,
    validateBlogPostId,
    validateBlogPost,
    uploadBlogPostThumbnail('/offers/blogs'),
    uploadBlogPostBanner('/offers/blogs'),
    updateBlogPost
);

/**
 * @description - update blog post status
 * @param {string} path - '/api/settings/content/blog-posts/:id/status'
 * @param {function} validator - ['validateBlogPostId', 'validateBlogPostStatus']
 * @param {function} controller - ['updateBlogPostStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateBlogPostId,
    validateBlogPostStatus,
    updateBlogPostStatus
);

/**
 * @description - delete many blog posts by IDs
 * @param {string} path - '/api/settings/content/blog-posts/delete-many'
 * @param {function} middleware - ['validateBlogPostIds']
 * @param {function} controller - ['deleteManyBlogPosts']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/delete-many',
    isAuthorized,
    isAllowed(['admin']),
    validateBlogPostIds,
    deleteManyBlogPosts
);

/**
 * @description - delete blog post
 * @param {string} path - '/api/settings/content/blog-posts/:id'
 * @param {function} validator - ['validateBlogPostId']
 * @param {function} controller - ['deleteBlogPost']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateBlogPostId,
    deleteBlogPost
);

// export router
module.exports = router;
