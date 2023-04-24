import { App, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import * as props from './config';
import * as resume from './resume';

const app = new App();
Aspects.of(app).add(new AwsSolutionsChecks());

new resume.Certificate(app, 'certificate', {
  domainName: props.default.domainName,
  env: {
    account: props.default.env!.account!,
    region: 'us-east-1',
  },
});
new resume.Resume(app, 'resume', props.default);

app.synth();
