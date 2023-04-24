// for development, use account/region from cdk cli
import { env } from '../common';
import { ResumeProps } from '../types';

const devEnv = {
  account: env('CDK_DEFAULT_ACCOUNT'),
  region: env('CDK_DEFAULT_REGION'),
};
const domainName = env('DOMAIN_NAME');
const certificateArn = env('CERTIFICATE_ARN');
const userPoolId = env('USER_POOL_ID');
const hostedZoneId = env('HOSTED_ZONE_ID');

export default { devEnv, domainName, certificateArn, userPoolId, hostedZoneId } as ResumeProps;
