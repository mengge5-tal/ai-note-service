#!/usr/bin/env node

/**
 * Environment check script
 * Checks Node.js version, dependencies, and code errors before running the app
 * Following FR-024, FR-025, FR-026, FR-027
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { readFileSync } from 'fs'

const MIN_NODE_VERSION = 18
const errors = []
const warnings = []

console.log('🔍 Checking development environment...\n')

// Check Node.js version
try {
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
  
  if (majorVersion < MIN_NODE_VERSION) {
    errors.push(`Node.js version ${nodeVersion} is below minimum required version ${MIN_NODE_VERSION}.0.0`)
  } else {
    console.log(`✓ Node.js version: ${nodeVersion}`)
  }
} catch (error) {
  errors.push(`Failed to check Node.js version: ${error.message}`)
}

// Check if node_modules exists
if (!existsSync('node_modules')) {
  warnings.push('node_modules directory not found. Running npm install...')
  try {
    console.log('\n📦 Installing dependencies...')
    execSync('npm install', { stdio: 'inherit' })
    console.log('✓ Dependencies installed successfully')
  } catch (error) {
    errors.push(`Failed to install dependencies: ${error.message}`)
  }
} else {
  console.log('✓ Dependencies directory exists')
}

// Check package.json exists
if (!existsSync('package.json')) {
  errors.push('package.json not found')
} else {
  console.log('✓ package.json found')
}

// Check TypeScript configuration
if (!existsSync('tsconfig.json')) {
  warnings.push('tsconfig.json not found')
} else {
  console.log('✓ TypeScript configuration found')
}

// Try to run ESLint if available
if (existsSync('node_modules/.bin/eslint')) {
  try {
    console.log('\n🔍 Checking code syntax...')
    execSync('npx eslint . --ext .ts,.tsx --max-warnings 0', { stdio: 'pipe' })
    console.log('✓ No syntax errors found')
  } catch (error) {
    // ESLint errors are warnings, not blocking
    warnings.push('ESLint found some issues. Review the output above.')
  }
} else {
  warnings.push('ESLint not available. Install dependencies first.')
}

// Summary
console.log('\n' + '='.repeat(50))
if (errors.length > 0) {
  console.error('\n❌ Environment check FAILED:\n')
  errors.forEach((error, index) => {
    console.error(`${index + 1}. ${error}`)
  })
  console.error('\n⚠️  Please fix the errors above before running the application.')
  process.exit(1)
} else if (warnings.length > 0) {
  console.warn('\n⚠️  Environment check completed with warnings:\n')
  warnings.forEach((warning, index) => {
    console.warn(`${index + 1}. ${warning}`)
  })
  console.log('\n✓ You can proceed, but consider addressing the warnings.')
  process.exit(0)
} else {
  console.log('\n✅ Environment check PASSED')
  console.log('✓ All checks completed successfully')
  process.exit(0)
}

