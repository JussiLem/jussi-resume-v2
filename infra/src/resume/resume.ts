import { aws_cloudfront as cloudfront, aws_s3 as s3, Stack, StackProps } from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { buildS3Bucket } from '../s3-bucket-helper';

export class NextJsServerless extends Construct {
  // public readonly cloudFrontWebDistribution: cloudfront.Distribution;
  public readonly cloudFrontFunction?: cloudfront.Function;
  // public readonly s3BucketInterface: s3.IBucket;
  public readonly s3Bucket?: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.s3Bucket = buildS3Bucket(this, undefined, 'PublicAssets');
    NagSuppressions.addResourceSuppressions(this.s3Bucket, [{ id: 'AwsSolutions-S1', reason: 'For money saving' }]);
  }
}

type ResumeProps = {
  nextStaticDir: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);
    new NextJsServerless(this, 'NextJs');
    // cm.Certificate.fromCertificateArn(this, 'id', 'certArn');
  }
}
