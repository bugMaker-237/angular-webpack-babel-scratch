let packageJson = require("./package.json");
let webpack = require("webpack");
let webpackConfig = require("./webpack.config");
let WebpackDevServer = require("webpack-dev-server");
let args = process.argv.slice(2);

const PORT = process.env.PORT || 3700;
/**
 * 
 * @param {Array<string>} args 
 */
function ExecuteApp(args) {
    if (args[0] == 'debug') {
        const config = webpackConfig(true, 'dist', PORT);
        return new WebpackDevServer(webpack(config), {
                contentBase: 'src',
                watchOptions: {
                    aggregateTimeout: 100
                },
                stats: {
                    colors: true
                },
                hot: true, // Live-reload
                inline: true,
                watchContentBase: true,
                publicPath: config.output.publicPath
            })
            .listen(PORT, '0.0.0.0', (err) => {
                if (err) throw new console.error('webpack-dev-server\n ' + err);
                console.log(`[${packageJson.name} serve]`, `Listening at http://127.0.0.1:${PORT}`);
            });
    } else if (args[0] == 'prod') {
        const config = webpackConfig(false, 'build');
        webpack(config, (err, stats) => {
            if (err) throw new console.error('build\n ', err);
            console.log(`[${packageJson.name} build]`, stats.toString({
                colors: true
            }));
        });
    }
}

ExecuteApp(args);