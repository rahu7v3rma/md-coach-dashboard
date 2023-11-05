module.exports = {
    root: true,
    extends: [
        'react-app',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            rules: {
                'prettier/prettier': 'error',
                '@typescript-eslint/no-shadow': ['error'],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_'
                    }
                ],
                'comma-dangle': 'off',
                'no-shadow': 'off',
                'no-undef': 'off',
                'no-empty-pattern': 'off',
                'react/self-closing-comp': ['error'],
                'import/newline-after-import': ['error'],
                'import/no-duplicates': ['error'],
                'import/no-absolute-path': ['error'],
                'import/order': ['error', {
                    'alphabetize': {
                        'order': 'asc'
                    },
                    'newlines-between': 'always',
                    'pathGroups': [
                        {
                            'pattern': 'src/**',
                            'group': 'parent'
                        }
                    ]
                }],
                'sort-imports': ['error', {
                    'ignoreDeclarationSort': true
                }]
            }
        },
        {
            files: ['!src/reducers/*'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        paths: [
                            {
                                name: 'react-redux',
                                importNames: ['useSelector']
                            }
                        ]
                    }
                ]
            }
        }
    ],
    settings: {
        'import/resolver': {
            typescript: true,
            node: true
        }
    }
};