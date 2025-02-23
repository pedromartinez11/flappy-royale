const merge = require("webpack-merge")
const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const common = require("./webpack.common.js")

module.exports = merge(common, {
    mode: "development",
    plugins: [
        // Creates the HTML files
        new HtmlWebpackPlugin({
            title: "Flappy Royale",
            meta: { viewport: "width=160, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" },
            production: false,
            template: "src/index.template"
        }),

        // It seems odd we're stringifying instead of just inlining `false`, but this is actually necessary!
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            DEMO: JSON.stringify(false)
        })
    ]
})
