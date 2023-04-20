import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Resume } from '../../src/resume';

test('Snapshot', () => {
  const app = new App();
  const stack = new Resume(app, 'test', {
    certificateArn: 'arn:aws:acm:us-east-1:123456789012:certificate/feopoefwpfeopwfeopwfepoojggr-giogrge',
    domainName: 'DomainName',
    env: {
      account: '123456789012',
      region: 'eu-west-1',
    },
  });

  const template = Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
