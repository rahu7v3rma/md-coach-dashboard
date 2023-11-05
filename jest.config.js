module.exports = {
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts'
    ],
    testEnvironment: 'jsdom',
    globals: {
        __DEV__: true
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react(-.*)?|uuid|nanoid|@stream-io/stream-chat-css/dist/css/index.css|@rneui)|stream-chat(-.*)?)'
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/empty-module.js",
        "\\.svg": "<rootDir>/__mocks__/svgrMock.js",
        "^src/(.*)": "<rootDir>/src/$1",
        '\\.(css|less)$': '<rootDir>/__mocks__/empty-module.js',
        'isomorphic-ws': '<rootDir>/__mocks__/websocketMock.js'
    }
};