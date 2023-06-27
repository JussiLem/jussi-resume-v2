import { Aws, aws_ec2 as ec2, aws_iam as iam, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export const deployLambdaFunction = (
  scope: Construct,
  lambdaFunctionProps: lambda.FunctionProps,
  functionId?: string,
  vpc?: ec2.IVpc,
): lambda.Function => {
  const _functionId = functionId ? functionId : 'LambdaFunction';
  const _functionRoleId = _functionId + 'ServiceRole';
  if (vpc && lambdaFunctionProps.vpc) {
    throw Error('Cannot provide VPC both in props and function argument');
  }
  const lambdaServiceRole = new iam.Role(scope, _functionRoleId, {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    inlinePolicies: {
      LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
            resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`],
          }),
        ],
      }),
    },
  });

  if (lambdaFunctionProps.vpc || vpc) {
    lambdaServiceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'ec2:CreateNetworkInterface',
          'ec2:DescribeNetworkInterfaces',
          'ec2:DeleteNetworkInterface',
          'ec2:AssignPrivateIpAddresses',
          'ec2:UnassignPrivateIpAddresses',
        ],
        resources: ['*'],
      }),
    );
  }
  return new lambda.Function(scope, _functionId, {
    ...lambdaFunctionProps,
    role: lambdaServiceRole,
  });
};
