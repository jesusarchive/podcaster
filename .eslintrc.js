module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier'
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect'
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    // Error prevention
    'array-callback-return': ['error', { checkForEach: true }],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false
      }
    ],
    'require-atomic-updates': 'error',

    // Good practices
    camelcase: ['error', { properties: 'never' }],
    eqeqeq: 'error',
    'new-cap': ['error', { capIsNew: false }],
    'no-array-constructor': 'error',
    'no-console': ['error', { allow: ['error'] }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-extend-native': 'error',
    'no-lonely-if': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-throw-literal': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    yoda: 'error',

    // Style
    curly: 'error',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],

    // Plugins
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    // 'prettier/prettier': ['error', { printWidth: 100, useTabs: true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  }
};
