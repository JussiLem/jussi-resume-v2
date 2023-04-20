import { Stack, StackProps } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { NextJsServerless } from './nextJsServerless';

type ResumeProps = {
  certificateArn: string;
  domainName: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);
    new NextJsServerless(this, 'NextJs', {
      certificateArn: props.certificateArn,
      domainName: props.domainName,
    });
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-CFR3', reason: 'Save money' }]);
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-IAM4', reason: 'Change later to own policy' }]);
    NagSuppressions.addStackSuppressions(this, [
      { id: 'AwsSolutions-IAM5', reason: 'Change later to stop using wildcard' },
    ]);
  }
}
