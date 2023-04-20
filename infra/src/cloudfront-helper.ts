import { aws_cloudfront as cloudfront } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export const defaultCloudfrontFunction = (scope: Construct): cloudfront.Function => {
  // generate a stable unique id for the cloudfront function and use it
  // both for the function name and the logical id of the function so if
  // it is changed the function will be recreated.
  // see https://github.com/aws/aws-cdk/issues/15523
  const functionId = `SetHttpSecurityHeaders${scope.node.addr}`;

  return new cloudfront.Function(scope, 'SetHttpSecurityHeaders', {
    functionName: functionId,
    code: cloudfront.FunctionCode.fromInline(
      "function handler(event) { var response = event.response; \
      var headers = response.headers; \
      headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'}; \
      headers['content-security-policy'] = { value: \"default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; manifest-src 'self'; connect-src 'self'; object-src 'none'\"}; \
      headers['x-content-type-options'] = { value: 'nosniff'}; \
      headers['x-frame-options'] = {value: 'DENY'}; \
      headers['x-xss-protection'] = {value: '1; mode=block'}; \
      return response; \
    }",
    ),
  });
};
