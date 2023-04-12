import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

type ResumeProps = {
  nextStaticDir: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);

    // cm.Certificate.fromCertificateArn(this, 'id', 'certArn');
  }
}
