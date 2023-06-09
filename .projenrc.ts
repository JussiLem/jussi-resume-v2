import { awscdk, github, javascript, web, cdk } from 'projen';

const project = new web.NextJsTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'jussi-resume-v2',
  sampleCode: false,
  projenrcTs: true,
  prettier: true,
  githubOptions: {
    pullRequestLint: false,
  },
  release: true,
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
      //      module: 'esnext',
      //      target: 'esnext',
      //      esModuleInterop: true,
    },
    exclude: ['infra'],
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
    'aws-amplify',
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
    'cssnano@6.0.0',
  ],
  // packageName: undefined,  /* The "name" in package.json. */
  tailwind: false,
});
project.release?.addBranch('backend', {
  majorVersion: 0,
  tagPrefix: 'test',
});
project.eslint?.addPlugins('react-memo', 'react-hooks', 'simple-import-sort');
project.eslint?.addExtends('plugin:@next/next/recommended');
project.eslint?.addOverride({
  files: ['src', 'pages'],
  rules: {
    ['import/first']: 'error',
    ['import/newline-after-import']: 'error',
    ['import/no-duplicates']: 'error',
    ['import/order']: 'error',
    ['react-memo/require-usememo']: 'error',
    ['react-memo/require-memo']: 'error',
    ['react-hooks/exhaustive-deps']: 'error',
    ['react/jsx-no-duplicate-props']: 'error',
    ['react/sort-props']: 'error',
    ['react/react-in-jsx-scope']: 'off',
    ['simple-import-sort/exports']: 'error',
    ['simple-import-sort/imports']: 'error',
    ['sort-imports']: 'off',
    ['@typescript-eslint/member-ordering']: [
      'warn',
      {
        interfaces: ['signature', 'method', 'constructor', 'field'],
        typeLiterals: ['signature', 'method', 'constructor', 'field'],
      },
    ],
  },
});
project.gitignore.addPatterns('.idea/', 'out/', '.env.local', 'functions/get-resume/cmd/output/');

const infraProject = new awscdk.AwsCdkTypeScriptApp({
  parent: project,
  cdkVersion: '2.73.0',
  defaultReleaseBranch: 'main',
  name: 'infra',
  deps: [
    'cdk-nag',
    '@aws-cdk/aws-apigatewayv2-alpha',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha',
    '@aws-cdk/aws-apigatewayv2-authorizers-alpha',
  ],
  devDeps: ['@types/aws-cloudfront-function@1.0.2'],
  tsconfig: {
    include: ['test/**/*.ts'],
    compilerOptions: {},
  },
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  prettier: true,
  outdir: 'infra',
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
});

infraProject.addScripts({
  'test-ci': 'jest',
});

new cdk.JsiiProject({
  parent: project,
  name: 'get-resume',
  author: 'Jussi',
  authorAddress: 'jussi.lem@gmail.com',
  defaultReleaseBranch: 'main',
  outdir: 'functions/get-resume',
  repositoryUrl: 'https://github.com/JussiLem/jussi-resume-v2',
  packageManager: javascript.NodePackageManager.NPM,
  sampleCode: false,
});

const jobDefinition: github.workflows.Job = {
  permissions: {
    deployments: github.workflows.JobPermission.READ,
    contents: github.workflows.JobPermission.READ,
    idToken: github.workflows.JobPermission.WRITE,
  },
  needs: ['release_github'],
  runsOn: ['ubuntu-latest'],
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v3',
      with: {
        ref: '${{ github.sha }}',
      },
    },
    {
      name: 'Setup Nodejs',
      uses: 'actions/setup-node@v3',
      with: {
        'node-version': '16.x',
      },
    },
    {
      name: 'Setup Golang',
      uses: 'actions/setup-go@v4',
      with: {
        'go-version-file': 'functions/get-resume/go.mod',
      },
    },
    {
      name: 'Install dependencies',
      workingDirectory: 'infra',
      run: 'npm ci',
    },
  ],
};

jobDefinition.steps.push({
  name: 'Build get-resume',
  run: 'env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o output/main && zip -j output/function.zip output/main',
  workingDirectory: 'functions/get-resume/cmd',
});

jobDefinition.steps.push({
  name: 'Build frontend',
  env: {
    CI: 'true',
    DOMAIN_NAME: '${{ secrets.DOMAIN_NAME }}',
    DEFAULT_REGION: '${{ secrets.CDK_DEFAULT_REGION }}',
    IDENTITY_POOL_ID: '${{ secrets.IDENTITY_POOL_ID }}',
    USER_POOL_ID: '${{ secrets.USER_POOL_ID }}',
    USER_POOL_WEB_CLIENT_ID: '${{ secrets.USER_POOL_WEB_CLIENT_ID }}',
  },
  run: 'npm install && npx projen build && npx projen export',
});

jobDefinition.steps.push({
  name: 'Configure AWS Credentials',
  uses: 'aws-actions/configure-aws-credentials@v2',
  with: {
    'role-to-assume': '${{ secrets.ASSUME_ROLE }}',
    'aws-region': '${{ secrets.CDK_DEFAULT_REGION }}',
  },
});

jobDefinition.steps.push({
  name: 'Bootstrap',
  run: 'cd infra && npx cdk bootstrap aws://$CDK_DEFAULT_ACCOUNT/$CDK_DEFAULT_REGION aws://$CDK_DEFAULT_ACCOUNT/us-east-1',
  env: {
    CDK_DEFAULT_REGION: '${{ secrets.CDK_DEFAULT_REGION }}',
    CDK_DEFAULT_ACCOUNT: '${{ secrets.CDK_DEFAULT_ACCOUNT }}',
    CERTIFICATE_ARN: '${{ secrets.CERTIFICATE_ARN }}',
    DOMAIN_NAME: '${{ secrets.DOMAIN_NAME }}',
    USER_POOL_ID: '${{ secrets.USER_POOL_ID }}',
    HOSTED_ZONE_ID: '${{ secrets.HOSTED_ZONE_ID }}',
  },
});

jobDefinition.steps.push({
  name: 'Deploy Certificate',
  run: 'cd infra && npx cdk synth certificate && npx cdk deploy certificate',
  env: {
    CDK_DEFAULT_REGION: '${{ secrets.CDK_DEFAULT_REGION }}',
    CDK_DEFAULT_ACCOUNT: '${{ secrets.CDK_DEFAULT_ACCOUNT }}',
    CERTIFICATE_ARN: '${{ secrets.CERTIFICATE_ARN }}',
    DOMAIN_NAME: '${{ secrets.DOMAIN_NAME }}',
    USER_POOL_ID: '${{ secrets.USER_POOL_ID }}',
    HOSTED_ZONE_ID: '${{ secrets.HOSTED_ZONE_ID }}',
  },
});

jobDefinition.steps.push({
  name: 'Deploy Resume',
  workingDirectory: 'infra',
  run: 'npx cdk synth resume && npx cdk deploy resume --require-approval never',
  env: {
    CI: 'true',
    CDK_DEFAULT_REGION: '${{ secrets.CDK_DEFAULT_REGION }}',
    CDK_DEFAULT_ACCOUNT: '${{ secrets.CDK_DEFAULT_ACCOUNT }}',
    CERTIFICATE_ARN: '${{ secrets.CERTIFICATE_ARN }}',
    DOMAIN_NAME: '${{ secrets.DOMAIN_NAME }}',
    USER_POOL_ID: '${{ secrets.USER_POOL_ID }}',
    HOSTED_ZONE_ID: '${{ secrets.HOSTED_ZONE_ID }}',
  },
});

project.release?.addJobs({
  deploy: jobDefinition,
});
project.synth();
