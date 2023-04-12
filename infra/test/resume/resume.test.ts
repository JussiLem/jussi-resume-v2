import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Resume } from '../../src/resume';

test('Snapshot', () => {
  const app = new App();
  const stack = new Resume(app, 'test', {
    nextStaticDir: '../.next',
  });

  const template = Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
