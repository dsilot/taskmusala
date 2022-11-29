module.exports = {
    entry: './src/index.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'gateway-musala.js'
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
            }
        ]
    }
}