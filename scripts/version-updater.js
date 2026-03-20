/**
 * Custom version updater for standard-version
 * Updates the VERSION constant in public-api.ts
 */

const versionRegex = /export const VERSION = '(.*)';/;

module.exports.readVersion = function (contents) {
  const match = contents.match(versionRegex);
  return match ? match[1] : '0.0.0';
};

module.exports.writeVersion = function (contents, version) {
  return contents.replace(versionRegex, `export const VERSION = '${version}';`);
};
