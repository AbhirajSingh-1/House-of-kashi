const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets';
const outputDir = './src/assets-optimized';

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Get all webp files
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp'));

console.log(`\n🖼️  Optimizing ${files.length} images...\n`);

let totalInputSize = 0;
let totalOutputSize = 0;

// Process each image
Promise.all(
  files.map(async (file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      await sharp(inputPath)
        .resize(1920, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 75, effort: 6 })
        .toFile(outputPath);
      
      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const savings = ((1 - outputSize/inputSize) * 100).toFixed(1);
      
      totalInputSize += inputSize;
      totalOutputSize += outputSize;
      
      console.log(`✓ ${file}`);
      console.log(`  ${(inputSize/1024/1024).toFixed(2)}MB → ${(outputSize/1024/1024).toFixed(2)}MB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error.message);
    }
  })
).then(() => {
  const totalSavings = ((1 - totalOutputSize/totalInputSize) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ All images optimized successfully!');
  console.log('='.repeat(60));
  console.log(`\n📊 Total size reduction:`);
  console.log(`   Before: ${(totalInputSize/1024/1024).toFixed(2)} MB`);
  console.log(`   After:  ${(totalOutputSize/1024/1024).toFixed(2)} MB`);
  console.log(`   Saved:  ${((totalInputSize - totalOutputSize)/1024/1024).toFixed(2)} MB (${totalSavings}%)`);
  console.log(`\n📁 Optimized images are in: ${outputDir}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Review the optimized images to ensure quality');
  console.log('   2. Backup your original src/assets folder');
  console.log('   3. Replace files in src/assets with optimized versions');
  console.log('   4. Delete src/assets-optimized folder');
  console.log('   5. Test your site - it should load much faster! 🚀\n');
}).catch(error => {
  console.error('\n❌ Optimization failed:', error);
});
