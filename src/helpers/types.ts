export enum FileTYPE {
  FILE = "FILE",
  IMAGE = "IMAGE",
}

export type Base64Type = {
  url: string;
  width: number;
  height: number;
};

export type FileItem = {
  id: string;
  name: string;
  extension: string;
  size: string;
  file: File;
  type: FileTYPE;
  url?: string;
  base64?: Base64Type;
  width?: number;
  height?: number;
};
