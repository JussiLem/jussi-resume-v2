import { StackProps } from 'aws-cdk-lib';

export type ResumeProps = {
  certificateArn: string;
  domainName: string;
  hostedZoneId: string;
  userPoolId: string;
} & StackProps;
