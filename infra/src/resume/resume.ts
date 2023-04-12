import {
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_s3_deployment as deploy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
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

    new deploy.BucketDeployment(this, 'NoCacheFilesDeployment', {
      sources: [deploy.Source.asset('../.next/server')],
      destinationBucket: this.s3Bucket,
      cacheControl: [deploy.CacheControl.fromString('public, max-age=0, must-revalidate')],
      prune: false,
    });

    new deploy.BucketDeployment(this, 'StaticFilesDeployment', {
      sources: [deploy.Source.asset('../.next/static')],
      destinationBucket: this.s3Bucket,
      cacheControl: [deploy.CacheControl.fromString('public, max-age=31536000, immutable')],
      prune: false,
    });
  }
}

type ResumeProps = {
  nextStaticDir: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);
    const nextjs = new NextJsServerless(this, 'NextJs');
    NagSuppressions.addResourceSuppressions(nextjs, [{ id: 'AwsSolutions-IAM4', reason: 'Use managed policy' }]);
    NagSuppressions.addResourceSuppressions(nextjs, [{ id: 'AwsSolutions-IAM5', reason: 'Custom resource' }]);

    // new nodejs.NodejsFunction(this, 'RegenerationLambda', {
    //   handler: 'index.handler',
    //   entry: path.join('.next', 'regeneration-lambda'),
    // });
    // cm.Certificate.fromCertificateArn(this, 'id', 'certArn');
  }
}
