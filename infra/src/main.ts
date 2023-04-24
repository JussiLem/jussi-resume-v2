import { App, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import * as props from './config';
import { devEnv } from './config';
import * as resume from './resume';

const app = new App();
Aspects.of(app).add(new AwsSolutionsChecks());

new resume.Certificate(app, 'certificate', {
  ...props.default,
  env: {
    account: devEnv.account,
    region: 'us-east-1',
  },
});
new resume.Resume(app, 'resume', {
  ...props.default,
  env: devEnv,
});

app.synth();
