import { join } from 'path';
import { App, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { env } from './common';
import * as resume from './resume';

const nextPath = join(__dirname, '../.next');
// const outputPath = join(nextPath, '/build');

// for development, use account/region from cdk cli
const devEnv = {
  account: env('CDK_DEFAULT_ACCOUNT'),
  region: env('CDK_DEFAULT_REGION'),
};

const app = new App();
Aspects.of(app).add(new AwsSolutionsChecks());

new resume.Certificate(app, 'certificate', {
  env: {
    account: devEnv.account,
    region: 'us-east-1',
  },
  domainName: env('DOMAIN_NAME'),
});
new resume.Resume(app, 'resume', { env: devEnv, nextStaticDir: nextPath });

app.synth();
