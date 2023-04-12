import { aws_s3 as s3, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface S3BucketProps {
  /**
   * User provided props to override the default props for the S3 Bucket.
   *
   * @default - Default props are used
   */
  readonly bucketProps?: s3.BucketProps;
}

const DefaultS3Props = (): s3.BucketProps =>
  ({
    encryption: s3.BucketEncryption.S3_MANAGED,
    versioned: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    enforceSSL: true,
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
  } as s3.BucketProps);

export const buildS3Bucket = (scope: Construct, props?: S3BucketProps, bucketId?: string) => {
  const resolvedBucketId = bucketId ? bucketId + 'S3Bucket' : 'S3Bucket';
  const customBucketProps =
    props && props.bucketProps ? { ...props.bucketProps, ...DefaultS3Props() } : DefaultS3Props();
  return new s3.Bucket(scope, resolvedBucketId, customBucketProps);
};
