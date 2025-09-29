import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImage() {
  const inputPath = path.join(__dirname, '../client/public/images/sustainability/SupportingFutureGenerations_image.jpg');
  const outputDir = path.join(__dirname, '../client/public/images/sustainability/');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log('Original image:', metadata.width, 'x', metadata.height, 'pixels');

    // Desktop version - optimized at 800x600 with better compression
    await sharp(inputPath)
      .resize(800, 600, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 75,  // Reduced from 85 for better compression
        progressive: true,
        mozjpeg: true
      })
      .toFile(path.join(outputDir, 'SupportingFutureGenerations_image_optimized.jpg'));

    console.log('Created optimized desktop version (800x600, 85% quality)');

    // Mobile version - smaller dimensions for faster loading
    await sharp(inputPath)
      .resize(400, 300, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toFile(path.join(outputDir, 'SupportingFutureGenerations_image-mobile.jpg'));

    console.log('Created mobile version (400x300, 80% quality)');

    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(path.join(outputDir, 'SupportingFutureGenerations_image_optimized.jpg')).size;
    const mobileSize = fs.statSync(path.join(outputDir, 'SupportingFutureGenerations_image-mobile.jpg')).size;

    console.log('\nFile sizes:');
    console.log(`Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`Optimized: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize/originalSize) * 100).toFixed(1)}% reduction)`);
    console.log(`Mobile: ${(mobileSize / 1024).toFixed(2)} KB (${((1 - mobileSize/originalSize) * 100).toFixed(1)}% reduction)`);

  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();