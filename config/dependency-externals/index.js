/*
 * Plugin: dependencyExternals
 * 
 * Creates an externals function which excludes node modules which are defined
 * as dependencies inside your package.json.
 * 
 * Forked from: https://github.com/liady/webpack-node-externals
 */
var fs = require("fs");
var path = require("path");

function contains(arr, val) {
    return arr && arr.indexOf(val) !== -1;
}

function readDir(dirName) {
    try {
        return fs.readdirSync(dirName);
    } catch (e){
        return [];
    }
}

function readFromPackageJson() {
    var packageJson;
    try {
        packageJson = require(path.join(process.cwd(), './package.json'));
    } catch (e){
        return [];
    }
    var sections = ['dependencies'];
    var deps = {};
    sections.forEach(function(section){
        Object.keys(packageJson[section] || {}).forEach(function(dep){
            deps[dep] = true;
        });
    });
    return Object.keys(deps);
}

function containsPattern(arr, val) {
    return arr && arr.some(function(pattern){
        if(pattern instanceof RegExp){
            return pattern.test(val);
        } else if (typeof pattern === 'function') {
            return pattern(val);
        } else {
            return pattern == val;
        }
    });
}

function getModuleName(request, modulesDir) {
    var req = request;
    // in case absolute, strip all parts before */modulesDir/
    req = req.replace(/^.*?\/node_modules\//, '');
    // return the module name
    return req.split('/')[0];
}

module.exports = function nodeExternals(options) {
    options = options || {};
    var whitelist = [].concat(options.whitelist || []);
    var binaryDirs = [].concat(options.binaryDirs || ['.bin']);
    var importType = options.importType || 'commonjs';
    var modulesDir = options.modulesDir || 'node_modules';
    var modulesFromFile = true;
    var additional = options.additional || [];

    // helper function
    function isNotBinary(x) {
        return !contains(binaryDirs, x);
    }

    // create the node modules list
    var nodeModules = modulesFromFile ? readFromPackageJson() : readDir(modulesDir).filter(isNotBinary);
    nodeModules.push(...additional);

    // return an externals function
    return function(context, request, callback) {
        var moduleName = options.includeAbsolutePaths ? getModuleName(request) : request.split('/')[0];
        if(moduleName == "sqlite3")
            return callback(null, "commonjs sqlite3");
        if (contains(nodeModules, moduleName) && !containsPattern(whitelist, request)) {
            // mark this module as external
            // https://webpack.github.io/docs/configuration.html#externals
            return callback(null, importType + " " + request);
        };
        callback();
    }
}
