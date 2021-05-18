module.exports = {
   root: true,
   env: {
      es6: true,
      node: true,
   },
   extends: [
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'google',
      'plugin:@typescript-eslint/recommended',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: ['tsconfig.json', 'tsconfig.dev.json'],
      tsconfigRootDir: __dirname,
      sourceType: 'module',
   },
   ignorePatterns: [
      '/lib/**/*', // Ignore built files.
   ],
   plugins: ['@typescript-eslint', 'import'],
   rules: {
      'quotes': ['error', 'single'],
      'indent': ['error', 3],
      'object-curly-spacing': ['error', 'always'],
      'new-cap': ['error', { 'newIsCap': true }],
      'require-jsdoc': [
         'error',
         {
            require: {
               'FunctionDeclaration': false,
               'MethodDefinition': false,
               'ClassDeclaration': false,
               'ArrowFunctionExpression': false,
               'FunctionExpression': false,
            },
         },
      ],
   },
};
