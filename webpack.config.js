"use strict";

const fs = require("fs");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const production = process.argv.indexOf("-p") !== -1;
const cssOutputTemplate = production ? "stylesheets/[name]-[hash].css" : "stylesheets/[name].css";
const jsOutputTemplate = production ? "javascripts/[name]-[hash].js" : "javascripts/[name].js";

module.exports = {
  context: __dirname + "/app/assets",

  resolve: {
    root: [
      path.resolve("./app/assets/javascripts")
    ]
  },

  entry: {
    application: ["./javascripts/application.js", "./stylesheets/application.css"]
  },

  output: {
    path: __dirname + "/public",
    filename: jsOutputTemplate
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: ["react-relay"],
          presets: [
            "es2015",
            "react",
            "stage-0"
          ]
        }
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract("css!sass")}
    ]
  },

  plugins: [
    new ExtractTextPlugin(cssOutputTemplate),

    function() {
      // Output the fingerprint
      this.plugin("done", function(stats) {
        const output = "ASSET_FINGERPRINT = \"" + stats.hash + "\"\n";
        fs.writeFileSync("config/initializers/asset_fingerprint.rb", output, "utf-8");
      });
    },

    function() {
      // Delete previous outputs
      this.plugin("compile", function() {
        const publicFolderPath = __dirname + "/public";
        const folders = ["javascripts", "stylesheets"];

        folders.forEach(function(folder) {
          const assetFolderPath = publicFolderPath + "/" + folder;

          fs.readdir(assetFolderPath, function(err, files) {
            if (files === undefined) {
              return;
            }

            files.forEach(function(file) {
              fs.unlinkSync(assetFolderPath + "/" + file);
            });
          });
        });
      });
    }
  ]
};
