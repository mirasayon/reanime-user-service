export const AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES_ARRAY = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const AVATAR_IMAGE_FILE_ALLOWED_MIME_TYPES = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
} as const;

export const AVATAR_IMAGE_FILE_WIDTH_PIXELS = 512 as const;
export const AVATAR_IMAGE_FILE_HEIGHT_PIXELS = 512 as const;
