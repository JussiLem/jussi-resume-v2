import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_certificatemanager as cm,
  aws_s3 as s3,
  aws_s3_deployment as deploy,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { buildS3Bucket } from '../s3-bucket-helper';

type NextJsServerlessProps = {
  certificateArn: string;
};

export class NextJsServerless extends Construct {
  public readonly distribution: cloudfront.Distribution;
  public readonly cloudFrontFunction?: cloudfront.Function;
  // public readonly s3BucketInterface: s3.IBucket;
  public readonly s3Bucket?: s3.Bucket;

  constructor(scope: Construct, id: string, props: NextJsServerlessProps) {
    super(scope, id);
    this.s3Bucket = buildS3Bucket(this, undefined, 'PublicAssets');
    NagSuppressions.addResourceSuppressions(this.s3Bucket, [{ id: 'AwsSolutions-S1', reason: 'For money saving' }]);

    // new deploy.BucketDeployment(this, 'NoCacheFilesDeployment', {
    //   sources: [deploy.Source.asset('../.next/server')],
    //   destinationBucket: this.s3Bucket,
    //   cacheControl: [deploy.CacheControl.fromString('public, max-age=0, must-revalidate')],
    //   prune: false,
    // });

    new deploy.BucketDeployment(this, 'StaticFilesDeployment', {
      sources: [deploy.Source.asset('../out')],
      destinationBucket: this.s3Bucket,
      cacheControl: [deploy.CacheControl.fromString('public, max-age=31536000, immutable')],
      prune: false,
    });
    this.cloudFrontFunction = new cloudfront.Function(this, 'FormatRequestLambda', {
      comment: 'Formats path for S3',
      code: cloudfront.FunctionCode.fromFile({
        filePath: 'functions/format-request.js',
      }),
    });

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.s3Bucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new cloudfront.CachePolicy(this, 'DefaultCachePolicy', {
          enableAcceptEncodingBrotli: true,
          enableAcceptEncodingGzip: true,
          minTtl: Duration.seconds(2),
          maxTtl: Duration.seconds(600),
          defaultTtl: Duration.seconds(2),
        }),
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
        // functionAssociations: [
        //   {
        //     eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        //     function: this.cloudFrontFunction,
        //   },
        // ],
      },
      additionalBehaviors: {
        '_next/*': {
          origin: new origins.S3Origin(this.s3Bucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
          originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
        },
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: ['jussilemmetyinen.fi'],
      certificate: cm.Certificate.fromCertificateArn(this, 'id', props.certificateArn),
    });
  }
}

type ResumeProps = {
  certificateArn: string;
} & StackProps;
export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);
    new NextJsServerless(this, 'NextJs', {
      certificateArn: props.certificateArn,
    });
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-CFR3', reason: 'Save money' }]);
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-IAM4', reason: 'Change later to own policy' }]);
    NagSuppressions.addStackSuppressions(this, [
      { id: 'AwsSolutions-IAM5', reason: 'Change later to stop using wildcard' },
    ]);

    // new nodejs.NodejsFunction(this, 'RegenerationLambda', {
    //   handler: 'index.handler',
    //   entry: path.join('.next', 'regeneration-lambda'),
    // });
    // cm.Certificate.fromCertificateArn(this, 'id', 'certArn');
  }
}
