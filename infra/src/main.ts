import { join } from 'path';
import { App, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { CertificateStack } from './certificate';
import { env } from './common';
import { Resume } from './resume';

const nextPath = join(__dirname, '../.next');
// const outputPath = join(nextPath, '/build');

// for development, use account/region from cdk cli
const devEnv = {
  account: env('CDK_DEFAULT_ACCOUNT'),
  region: env('CDK_DEFAULT_REGION'),
};

const app = new App();
Aspects.of(app).add(new AwsSolutionsChecks());

new CertificateStack(app, 'certificate', {
  env: devEnv,
  domainName: env('DOMAIN_NAME'),
});
new Resume(app, 'resume', { env: devEnv, nextStaticDir: nextPath });

app.synth();
