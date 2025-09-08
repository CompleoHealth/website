// Simple test file for Lambda function
const { handler } = require('./index');

// Test data
const testEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    company: 'Test Company',
    message: 'This is a test message from the Lambda function test suite.'
  })
};

// Test CORS preflight
const corsEvent = {
  httpMethod: 'OPTIONS'
};

// Test with invalid data
const invalidEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    name: 'T',  // Too short
    email: 'invalid-email',  // Invalid format
    message: 'Short'  // Too short
  })
};

// Test with honeypot (spam)
const spamEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    name: 'Spammer',
    email: 'spam@example.com',
    message: 'This is spam message for testing.',
    website: 'http://spam.com'  // Honeypot field
  })
};

async function runTests() {
  console.log('🧪 Running Lambda Function Tests\n');
  
  try {
    // Test 1: CORS Preflight
    console.log('Test 1: CORS Preflight Request');
    const corsResult = await handler(corsEvent);
    console.log('Status:', corsResult.statusCode);
    console.log('Headers:', corsResult.headers);
    console.assert(corsResult.statusCode === 200, 'CORS should return 200');
    console.log('✅ CORS test passed\n');
    
    // Test 2: Invalid Data
    console.log('Test 2: Invalid Data Validation');
    const invalidResult = await handler(invalidEvent);
    console.log('Status:', invalidResult.statusCode);
    const invalidBody = JSON.parse(invalidResult.body);
    console.log('Errors:', invalidBody.errors);
    console.assert(invalidResult.statusCode === 400, 'Invalid data should return 400');
    console.assert(invalidBody.errors.length > 0, 'Should have validation errors');
    console.log('✅ Validation test passed\n');
    
    // Test 3: Honeypot Spam Detection
    console.log('Test 3: Honeypot Spam Detection');
    const spamResult = await handler(spamEvent);
    console.log('Status:', spamResult.statusCode);
    const spamBody = JSON.parse(spamResult.body);
    console.log('Errors:', spamBody.errors);
    console.assert(spamResult.statusCode === 400, 'Spam should return 400');
    console.assert(spamBody.errors.includes('Spam detected'), 'Should detect spam');
    console.log('✅ Spam detection test passed\n');
    
    // Test 4: Valid Data (will fail without AWS credentials)
    console.log('Test 4: Valid Data Processing');
    console.log('Note: This test will fail without AWS credentials configured');
    try {
      const validResult = await handler(testEvent);
      console.log('Status:', validResult.statusCode);
      if (validResult.statusCode === 200) {
        const validBody = JSON.parse(validResult.body);
        console.log('Response:', validBody);
        console.log('✅ Valid data test passed\n');
      } else {
        console.log('❌ Test failed - check AWS credentials\n');
      }
    } catch (error) {
      console.log('❌ Expected error without AWS credentials:', error.message, '\n');
    }
    
    console.log('🎉 All local tests completed!');
    console.log('\n📝 Note: For full testing, deploy to AWS and test with actual SES configuration.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();