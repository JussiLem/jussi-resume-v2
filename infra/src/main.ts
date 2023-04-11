import { join } from 'path';
import {
  aws_route53 as route53,
  aws_certificatemanager as cm,
  App,
  Aspects,
  Stack,
  StackProps,
  CfnOutput,
} from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { Construct } from 'constructs';

const nextPath = join(__dirname, '../.next');
// const outputPath = join(nextPath, '/build');

export const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

export class CertificateStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    const domainName = env('DOMAIN_NAME');

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName,
    });
    const certificate = new cm.Certificate(this, 'SiteCert', {
      domainName,
      subjectAlternativeNames: [`*.${domainName}`],
      validation: cm.CertificateValidation.fromDns(hostedZone),
    });
    new CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn,
      exportName: 'resume-cert-arn',
    });
  }
}
type ResumeProps = {
  nextStaticDir: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);

    // cm.Certificate.fromCertificateArn(this, 'id', 'certArn');
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
Aspects.of(app).add(new AwsSolutionsChecks());

new CertificateStack(app, 'certificate', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
});
new Resume(app, 'resume', { env: devEnv, nextStaticDir: nextPath });

app.synth();
