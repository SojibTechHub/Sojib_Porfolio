const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
];

export const validateEnv = () => {
  for (const v of requiredVars) {
    if (!process.env[v]) {
      console.error(`Missing required environment variable: ${v}`);
      process.exit(1);
    }
  }
  console.log('All required environment variables are set.');
};
