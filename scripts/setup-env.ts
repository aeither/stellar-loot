import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

const envPath = join(process.cwd(), '.env');

if (existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('If you want to update it, please edit it manually or delete it first.');
  process.exit(0);
}

console.log('🔧 Setting up environment file...');
console.log('');

// Get secret key from user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your Stellar secret key (starts with "S"): ', (secretKey: string) => {
  rl.close();
  
  if (!secretKey.trim()) {
    console.log('❌ No secret key provided');
    process.exit(1);
  }
  
  if (!secretKey.startsWith('S')) {
    console.log('❌ Invalid secret key format. Must start with "S"');
    process.exit(1);
  }
  
  // Create .env file
  const envContent = `# Stellar Secret Key
STELLAR_SECRET_KEY=${secretKey.trim()}
`;
  
  try {
    writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('🔒 Your secret key is now stored securely');
    console.log('');
    console.log('You can now run:');
    console.log('  npx tsx scripts/nft2.ts');
    console.log('  npx tsx scripts/test-nft.ts');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error);
    process.exit(1);
  }
}); 