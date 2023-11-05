const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    'stories': [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    'addons': [
        '@storybook/preset-create-react-app',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-actions'
    ],
    'webpackFinal': (config) => {
        // init plugins list if it is not initalized yet
        if (!config.resolve.plugins) {
            config.resolve.plugins = [];
        }

        // add tsconfig paths plugins so the root tsconfig.json file will be
        // used when building storybook
        config.resolve.plugins.push(new TsconfigPathsPlugin());

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader'
        });

        return config;
    },
    'core': {
        builder: 'webpack5',
    }
};
