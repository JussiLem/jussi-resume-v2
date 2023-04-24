// import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha';
// import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  // aws_certificatemanager as acm,
  // aws_cognito as cognito,
  aws_lambda as lambda,
  Stack,
} from 'aws-cdk-lib';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { NextJsServerless } from './nextJsServerless';
import { deployLambdaFunction } from '../lambda-helper';
import { ResumeProps } from '../types';

export class Api extends Construct {
  public readonly getResumeLambda: lambda.Function;
  constructor(scope: Construct, id: string, _props: ResumeProps) {
    super(scope, id);
    // cognito.UserPool.fromUserPoolId(this, 'UserPool', props.userPoolId);
    this.getResumeLambda = deployLambdaFunction(this, {
      code: lambda.Code.fromAsset('../functions/get-resume/cmd/output/function.zip'),
      handler: 'main',
      runtime: lambda.Runtime.GO_1_X,
      environment: {
        TABLE_NAME: 'TABLE_NAME',
      },
    });
    // const getResumesIntegration = new integrations.HttpLambdaIntegration('ResumesIntegration', getResumeLambda);
    // const domainName = new apigw.DomainName(this, 'DN', {
    //   domainName: props.domainName,
    //   certificate: new acm.Certificate(this, 'Certificate', {
    //     domainName: props.domainName,
    //     validation: acm.CertificateValidation.fromDns(),
    //   }),
    // });
    // const httpApi = new apigw.HttpApi(this, 'HttpApi', {
    //   defaultDomainMapping: {
    //     domainName,
    //   },
    // });
    // httpApi.addRoutes({
    //   path: '/resumes',
    //   methods: [apigw.HttpMethod.GET],
    //   integration: getResumesIntegration,
    // });
  }
}

export class Resume extends Stack {
  constructor(scope: Construct, id: string, props: ResumeProps) {
    super(scope, id, props);
    new NextJsServerless(this, 'NextJs', props);
    new Api(this, 'Api', props);
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-CFR3', reason: 'Save money' }]);
    NagSuppressions.addStackSuppressions(this, [{ id: 'AwsSolutions-IAM4', reason: 'Change later to own policy' }]);
    NagSuppressions.addStackSuppressions(this, [
      { id: 'AwsSolutions-IAM5', reason: 'Change later to stop using wildcard' },
    ]);
  }
}
