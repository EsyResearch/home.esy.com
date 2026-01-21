/**
 * File hashing utilities for run records
 */

const crypto = require('crypto');
const fs = require('fs');

/**
 * Compute SHA256 hash of a file
 * @param {string} filePath - Absolute path to file
 * @returns {Promise<string>} SHA256 hash in hex format
 */
async function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

/**
 * Compute SHA256 hash of a string
 * @param {string} content - Content to hash
 * @returns {string} SHA256 hash in hex format
 */
function hashString(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

module.exports = {
  hashFile,
  hashString
};
