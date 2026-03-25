/**
 * Vercel Serverless Function
 * Wraps the Express app as a serverless handler
 */

const app = require('../server/server');

module.exports = app;
