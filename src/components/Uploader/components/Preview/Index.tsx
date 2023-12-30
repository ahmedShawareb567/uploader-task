import {FileItem, FileTYPE} from "../../../../helpers/types";
import {SvgIcon} from "../../../SvgIcon/Index";
import {EditImage} from "../EditImage/Index";
import {PreviewFile} from "./File/Index";
import {PreviewImage} from "./Image/Index";

type Props = {
  className?: string;
  item: FileItem;
  onDelete?: (e) => void;
  onEditImage?: (e) => void;
  onUpload?: (e) => void;
};

export const UploaderPreview = ({
  className = "",
  item,
  onDelete,
  onEditImage,
  onUpload,
}: Props) => {
  // On delete action
  const onDeleteAction = () => {
    onDelete?.(item?.id);
  };

  // Change preview component depending on item type {image, file}
  const PreviewType = item?.type === FileTYPE.FILE ? PreviewFile : PreviewImage;

  //On edit image change
  const onEditImageChange = (value) => {
    if (!value) return;
    onEditImage?.(value);
  };

  // On upload action
  const onUploadAction = () => {
    onUpload?.(item);
  };

  return (
    <div
      className={`relative p-4 rounded-xl border border-gray-200 ${className}`}
    >
      <button
        type="button"
        className="absolute top-4 end-4 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center"
        onClick={onDeleteAction}
      >
        <SvgIcon name="delete" className="fill-current w-5 h-5" />
      </button>

      <SvgIcon
        name={item?.type == FileTYPE.IMAGE ? "image" : "file"}
        className="fill-current w-6 h-6"
      />
      <h3 className="mt-4 font-medium break-words">{item?.name}</h3>
      <p className="text-sm text-gray-500 mt-2">Size: {item?.size}</p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
        <div className="flex items-center gap-x-2">
          <PreviewType item={item}>
            <button type="button">
              <SvgIcon name="eye" className="fill-current w-6 h-6" />
            </button>
          </PreviewType>

          {item?.type == FileTYPE.IMAGE ? (
            <EditImage
              item={item}
              onChange={onEditImageChange}
              className="hidden lg:block"
            />
          ) : null}
        </div>
        <button
          type="button"
          className="py-2 px-4 bg-red-500 text-white rounded-xl"
          onClick={onUploadAction}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
