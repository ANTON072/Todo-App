import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

import { COGNITO_CONFIG } from "~/config/cognito.server";

let cognitoClient: CognitoIdentityProviderClient | null = null;

export function getCognitoClient() {
  if (!cognitoClient) {
    cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_CONFIG.REGION,
    });
  }
  return cognitoClient;
}
