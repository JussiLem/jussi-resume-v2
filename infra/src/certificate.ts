import { aws_certificatemanager as cm, aws_route53 as route53, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

type CertificateStackProps = {
  domainName: string;
} & StackProps;

export class CertificateStack extends Stack {
  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);
    const { domainName } = props;

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
