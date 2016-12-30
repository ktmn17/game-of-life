'use strict';

let webpackConfig = require('./webpack.config.js');

module.exports = function (config) {

    config.set({

        basePath: 'src/__tests__/',

        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'sinon', 'chai'],

        files: [
            '*.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            '*.js': ['webpack']
        },

        webpack: {
            module: webpackConfig.module,
            resolve: {
                alias: {
                    sinon: 'sinon/pkg/sinon.js',
                },
            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-sinon-chai'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ]
    });
};
