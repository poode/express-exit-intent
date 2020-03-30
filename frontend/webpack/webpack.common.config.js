const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {

  entry: [
    './src/app.ts',
  ],

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, '../'),
    filename: "./dist/[name].js",
    sourceMapFilename: "./dist/[name].js.map",
    chunkFilename: './dist/[id].chunk.js',
    pathinfo: true,
    publicPath: "/"
  },

  resolve: {
    extensions: [
      ".ts",
      ".js",
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./dist/[name].css",
      chunkFilename: "./dist/[id].css"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: './tsconfig.frontend.json' }
          }

        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  },

  node: {
    fs: 'empty'
  }
};
