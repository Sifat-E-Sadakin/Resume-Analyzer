#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Checks if all required environment variables are set before deployment
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '..', '.env') });

const REQUIRED_VARS = [
  'DATABASE_URL',
  'OPENAI_API_KEY',
  'SESSION_SECRET',
  'NODE_ENV'
];

const OPTIONAL_VARS = [
  'PORT'
];

console.log('🔍 Validating Environment Variables...\n');

let hasErrors = false;
const warnings = [];

// Check required variables
REQUIRED_VARS.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.error(`❌ ERROR: ${varName} is not set`);
    hasErrors = true;
  } else {
    // Additional validation
    if (varName === 'DATABASE_URL' && !value.startsWith('postgresql://')) {
      console.error(`❌ ERROR: ${varName} should start with 'postgresql://'`);
      hasErrors = true;
    } else if (varName === 'OPENAI_API_KEY' && !value.startsWith('sk-')) {
      console.error(`❌ ERROR: ${varName} should start with 'sk-'`);
      hasErrors = true;
    } else if (varName === 'SESSION_SECRET' && value.length < 32) {
      console.warn(`⚠️  WARNING: ${varName} should be at least 32 characters`);
      warnings.push(varName);
    } else {
      console.log(`✅ ${varName} is set`);
    }
  }
});

console.log('');

// Check optional variables
OPTIONAL_VARS.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`ℹ️  INFO: ${varName} is not set (using default)`);
  } else {
    console.log(`✅ ${varName} is set`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('\n❌ Environment validation FAILED!');
  console.error('Please fix the errors above before deploying.\n');
  console.log('💡 TIP: Copy env.template to .env and fill in the values\n');
  process.exit(1);
} else if (warnings.length > 0) {
  console.warn('\n⚠️  Environment validation passed with warnings');
  console.warn('Consider fixing the warnings above for better security.\n');
  process.exit(0);
} else {
  console.log('\n✅ All environment variables are properly configured!');
  console.log('🚀 Ready for deployment!\n');
  process.exit(0);
}

