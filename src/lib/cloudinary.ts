import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
}

interface UploadStreamResult {
  public_id?: string;
  secure_url?: string;
}

export async function uploadToCloudinary(
  file: Blob,
  folder: string = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? 'avatars'
): Promise<CloudinaryUploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error: UploadApiErrorResponse | undefined, result: UploadStreamResult | undefined) => {
      if (error) return reject(error);
      if (!result?.public_id || !result.secure_url) {
        return reject(new Error('Cloudinary upload failed: missing result'));
      }
      resolve({ publicId: result.public_id, secureUrl: result.secure_url });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(
  publicId: string
): Promise<UploadApiResponse> {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
    invalidate: true,
  });

  console.log('[Cloudinary.destroy]', publicId, result);
  return result;
}