import eslint from '@eslint/js';
import vitestPlugin from '@vitest/eslint-plugin';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import errorOnlyPlugin from 'eslint-plugin-only-error';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import securityPlugin from 'eslint-plugin-security';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint, { configs as tsConfigs } from 'typescript-eslint';

const OFF = 0;
const ERROR = 2;

export default tseslint.config(
    eslint.configs.recommended,
    ...tsConfigs.strictTypeChecked,
    ...tsConfigs.stylisticTypeChecked,
    importConfigs.recommended,
    importConfigs.typescript,
    importConfigs.errors,
    importConfigs.warnings,
    prettierPluginRecommended,
    securityPlugin.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: {
            'only-error': errorOnlyPlugin,
            prettier: prettierPlugin,
            security: securityPlugin,
            'unused-imports': unusedImportsPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {}, // eslint-import-resolver-typescript
            },
        },
        languageOptions: {
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaVersion: 2021,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
                ...globals.commonjs,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            // eslint-plugin-prettier
            'prettier/prettier': [
                ERROR,
                {
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'all',
                    arrowParens: 'always',
                },
            ],
            'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
            'no-restricted-exports': OFF,
            'no-shadow': OFF, // duplicated by @typescript-eslint/no-shadow

            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-use-before-define': ERROR,
            '@typescript-eslint/no-shadow': ERROR,
            '@typescript-eslint/explicit-module-boundary-types': ERROR,
            '@typescript-eslint/unbound-method': ERROR,
            '@typescript-eslint/explicit-function-return-type': [
                ERROR,
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                },
            ],
            // eslint-plugin-import
            'import/no-extraneous-dependencies': [
                ERROR,
                { devDependencies: true },
            ],
            'import/prefer-default-export': OFF,
            'import/extensions': [
                ERROR,
                'ignorePackages',
                {
                    js: 'never',
                    ts: 'never',
                },
            ],
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],

            // eslint-plugin-unused-imports
            '@typescript-eslint/no-unused-vars': OFF,
            'unused-imports/no-unused-imports': ERROR,
            'unused-imports/no-unused-vars': [
                ERROR,
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': OFF,
            '@typescript-eslint/no-unsafe-member-access': OFF,
            '@typescript-eslint/no-unsafe-argument': OFF,
        },
    },
    {
        files: [
            '**/*.spec.tsx',
            '**/*.spec.js',
            '**/*.test.tsx',
            '**/*.test.js',
        ],
        plugins: {
            vitest: vitestPlugin,
        },
        rules: {
            ...vitestPlugin.configs.recommended.rules,
            'vitest/max-nested-describe': ['error', { max: 3 }],
        },
    },
    {
        ignores: [
            'node_modules/*',
            'dist/*',
            'logs/*',
            '.tmp/*',
            'coverage/*',
            '**/*.html',
        ],
    },
);
