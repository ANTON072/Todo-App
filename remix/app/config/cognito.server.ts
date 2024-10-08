if (
  !process.env.COGNITO_REGION ||
  !process.env.COGNITO_USER_POOL_ID ||
  !process.env.COGNITO_CLIENT_ID
) {
  throw new Error("MissingMissing required Cognito environment variables");
}

export const COGNITO_CONFIG = {
  REGION: process.env.COGNITO_REGION,
  USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  CLIENT_ID: process.env.COGNITO_CLIENT_ID,
};

export type CognitoConfig = typeof COGNITO_CONFIG;
