import { javascript, web } from 'projen';

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'jussi-resume-v2',
  projenrcTs: true,
  prettier: true,
  prettierOptions: {
    settings: {
      bracketSpacing: true,
      printWidth: 120,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: javascript.TrailingComma.ALL,
      useTabs: false,
      arrowParens: javascript.ArrowParens.AVOID,
    },
  },
  eslint: true,
  eslintOptions: {
    dirs: ['src/', 'pages/'],
    prettier: true,
  },
  tsconfig: {
    compilerOptions: {
      rootDir: 'src',
      //      rootDir: undefined,
      //      module: 'esnext',
      //      target: 'esnext',
      //      esModuleInterop: true,
    },
    include: ['pages/**/*.tsx', 'src/**/*.ts'],
  },
  tsconfigDev: {
    compilerOptions: {
      //      module: 'esnext',
      target: 'esnext',
      //      esModuleInterop: true,
    },
    include: ['pages/**/*', 'src/**/*.ts', 'src/**/*.tsx'],
  },
  packageManager: javascript.NodePackageManager.NPM,
  deps: [
    'autoprefixer@10.4.14',
    'classnames@2.3.2',
    'ts-pattern@^4.0.3',
    '@headlessui/react@1.7.13',
    '@heroicons/react@^1.0.6',
  ],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@next/eslint-plugin-next',
    '@tailwindcss/forms@0.5.3',
    '@tailwindcss/typography@0.5.9',
    'postcss@8.4.21',
    'postcss-preset-env@8.0.1',
    'sass@1.59.3',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-memo',
    'eslint-plugin-react-hooks',
    'eslint-plugin-import',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-sort-keys-fix',
    'tailwindcss',
  ],
  // packageName: undefined,  /* The "name" in package.json. */
  tailwind: false,
});
project.eslint?.addPlugins('react-memo', 'react-hooks', 'simple-import-sort');
project.eslint?.addExtends('plugin:@next/next/recommended');
project.eslint?.addOverride({
  files: ['src', 'pages'],
  rules: {
    ['react-memo/require-usememo']: 'error',
    ['react-memo/require-memo']: 'error',
    ['react-hooks/exhaustive-deps']: 'error',
  },
});
project.synth();
