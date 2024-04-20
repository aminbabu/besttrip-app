/**
 * @file /models/settings/content/blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { blogPostSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('BlogPost', blogPostSchema);
