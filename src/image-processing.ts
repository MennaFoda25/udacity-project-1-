import sharp from 'sharp';


interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

/**
 * @param {sharpResizeParams} params 
 * @param {string} params.source 
 * @param {string} params.target 
 * @param {number} params.width 
 * @param {number} params.height 
 * @return {null|string} 
 */
const processImage = async (
  params: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Image could not be processed.';
  }
};

export default processImage;