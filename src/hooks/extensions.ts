import {FileItem, FileTYPE} from "../helpers/types";
import {v4 as uuidv4} from "uuid";
import {round} from "lodash-es";

const documentExtensions: string[] = [
  // Word Processing Files
  ".doc",
  ".docx",
  ".odt",
  ".rtf",
  ".txt",

  // PDF Files
  ".pdf",

  // Spreadsheet Files
  ".xls",
  ".xlsx",
  ".csv",
  ".ods",

  // Presentation Files
  ".ppt",
  ".pptx",
  ".pps",
  ".ppsx",

  // Other Document Files
  ".msg",
  ".pages",
  ".key",
  ".numbers",
  ".txt",
  ".tex",
  ".epub",
  ".md",
  ".log",
  ".wpd",
];

const imageExtensions: string[] = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".tif",
  ".ico",
  ".webp",
  ".raw",
  ".exif",
  ".heic",
  ".heif",
  ".jfif",
  ".pnm",
];

// Base 64 type
type Base64Type = {
  url: string;
  width: number;
  height: number;
};

export const useExtensions = () => {
  // Find extension name
  const currentExtension = (name) => {
    return name.substr(name.lastIndexOf("."))?.toLowerCase();
  };

  // Is document file
  const isDocumentFile = (name) => {
    const extension = currentExtension(name);
    return documentExtensions.includes(extension);
  };

  // Is Image file
  const isImageFile = (name) => {
    const extension = currentExtension(name);
    return imageExtensions.includes(extension);
  };

  // Return file type
  const mapFileType = (name) => {
    return isImageFile(name) ? FileTYPE.IMAGE : FileTYPE.FILE;
  };

  // Preview image file
  const convertToBase64 = (file): Promise<Base64Type> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("File is not found!");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const type = mapFileType(file?.name);

        if (type === FileTYPE.FILE) {
          resolve({
            url: reader?.result as string,
            width: 0,
            height: 0,
          });
          return;
        }

        const img = new Image();
        img.src = e?.target?.result as string;

        img.onload = function () {
          const width = img.width;
          const height = img.height;

          resolve({
            url: reader?.result as string,
            width,
            height,
          });
        };

        // Convert image file to base64 string
      };

      reader.readAsDataURL(file);
    });
  };

  // previewImage
  const previewImage = (file): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("File is not found!");
        return;
      }

      const url = URL.createObjectURL(file);

      resolve(url);
    });
  };

  // Format file size
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      const sizeInKB = sizeInBytes / 1024;
      return `${round(sizeInKB, 2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      const sizeInMB = sizeInBytes / (1024 * 1024);
      return `${round(sizeInMB, 2)} MB`;
    } else {
      const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
      return `${round(sizeInGB, 2)} GB`;
    }
  };

  // Map allowed files
  const mapAllowedFiles = async (files: File[], oldFiles: FileItem[] = []) => {
    try {
      const currentFiles: FileItem[] = [];

      for (const file of files) {
        const fileName = file?.name;

        if (!fileName) {
          continue; // Skip files without a name
        }

        // On check that the same file exists
        if (oldFiles?.length) {
          const findElement = oldFiles?.find((item) => item?.name === fileName);
          if (findElement) {
            continue;
          }
        }

        const isImage = isImageFile(fileName);
        const isDocument = isDocumentFile(fileName);

        if (isDocument || isImage) {
          const url = await previewImage(file);
          const base64 = await convertToBase64(file);

          currentFiles.push({
            id: uuidv4(),
            name: fileName,
            size: formatFileSize(file?.size),
            type: mapFileType(fileName),
            extension: currentExtension(fileName),
            file,
            url,
            base64,
            ...(isImage && {width: base64?.width}),
            ...(isImage && {height: base64?.height}),
          });
        }
      }

      return currentFiles;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return {
    documentExtensions,
    imageExtensions,
    isDocumentFile,
    isImageFile,
    mapFileType,
    mapAllowedFiles,
    convertToBase64,
    previewImage,
  };
};
