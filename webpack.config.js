module.exports = {
    entry: './src/inputNumber-es5.js',
    output: {
        path: 'dist',
        filename: 'inputNumber-es5.js'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};
