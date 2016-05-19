import webpack from 'webpack';
import path from "path";
import merge from "webpack-merge";
const
    {CommonsChunkPlugin, UglifyJsPlugin} = webpack.optimize,
    {ProvidePlugin, DefinePlugin, NoErrorsPlugin} = webpack;

const  TARGET = process.env.npm_lifecycle_event;

//Common Configuration
let  common = {
    entry: {
        bundle: path.resolve(__dirname, "src/index"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [{
            test   : /\.js$/,
            loader: "babel?presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy",
            exclude: /node_modules/
        }, {
            test  : /\.s[ac]ss$/,
            loader: "style!css?module&localIdentName=[local]__[hash:base64:10]!sass"
        }, {
            test  : /\.(jpe?g|svg|png)$/,
            loader: "url?limit=10000&name=/images/[hash:20].[ext]"
        }],
        noParse: [
          path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
          path.join(__dirname, 'node_modules', 'angular2', 'bundles')
        ]
    },
    resolve: {
        extensions: [".jsx", ".js", ".scss", ""],
        fallback  : [
            path.resolve(__dirname, "src"),
        ],
        alias: {
          'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'core', 'testing.js'),
          'angular2/core': path.join(__dirname, 'node_modules', '@angular', 'core', 'index.js'),
          'angular2/platform/browser': path.join(__dirname, 'node_modules', '@angular', 'platform-browser', 'index.js'),
          'angular2/platform-browser-dynamic': path.join(__dirname, 'node_modules', '@angular', 'platform-browser-dynamic','index.js'),
          'angular2/testing': path.join(__dirname, 'node_modules', '@angular', 'testing', 'index.js'),
          'angular2/router': path.join(__dirname, 'node_modules', '@angular', 'router', 'index.js'),
          'angular2/http': path.join(__dirname, 'node_modules', '@angular', 'http', 'index.js'),
          'angular2/http/testing': path.join(__dirname, 'node_modules', '@angular', 'http', 'testing.js'),
          'zone': path.join(__dirname, 'node_modules', 'zone.js', 'dist', 'zone.js')
        }
    },
    plugins: [
        new NoErrorsPlugin(),
        new ProvidePlugin({
            _       : "lodash",
            Reflect : "reflect-metadata"
        })
    ]
}


let config;
switch (TARGET) {
    //Dev config
    case 'start':
        config = merge(common, {
            devtool: "cheap-eval-source-map"
        });
        break;

    //Unit test config
    case 'utest':
        config = merge(common, {
            devtool: "cheap-eval-source-map",
            devServer: {
                contentBase: path.resolve(__dirname, "tests")
            },
            entry: {
                bundle: "mocha!./tests/unit/index"
            },
            output: {
                path: path.resolve(__dirname, "tests/unit"),
                publicPath: "/"
            },
            moudle: {
                loaders: [{
                    test: /sinon\/pkg\/sinon\.js/,
                    loader: 'imports?define=>false,require=>false'
                }]
            },
            plugins: [
                new ProvidePlugin({
                    chai       : "chai",
                    _          : "lodash"
                })
            ]
        })
        break;

    //Build config
    case 'build':
        config = merge(common, {
            plugins: [
                new DefinePlugin({
                    "process.env": {
                        NODE_ENV: JSON.stringify("production")
                    }
                }),
                new UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
        })
        break;

    default:
        config = common;
        break;
}

export default config;
