module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    entry: {
      CourseSurveysIndex: './src/CourseSurveysIndex.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/static/frontend'
    },
    devServer: {
        writeToDisk: true,
    }
  };
