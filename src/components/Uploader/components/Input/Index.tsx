import {useRef} from "react";
import {useExtensions} from "../../../../hooks/extensions";
import {SvgIcon} from "../../../SvgIcon/Index";
import {FileItem} from "../../../../helpers/types";

type Props = {
  multiple?: boolean;
  value: FileItem[];
  onChange?: (e) => void;
};

export const UploaderInput = ({
  multiple = true,
  onChange,
  value = [],
}: Props) => {
  const {mapAllowedFiles} = useExtensions();

  const inputRef = useRef<HTMLInputElement>(null);

  // On change func
  const onChangeFunc = async (files) => {
    if (!files) return;
    const allowedFiles = await mapAllowedFiles(files, value);
    onChange?.(allowedFiles);
  };

  // On input file change
  const onChangeAction = async (e) => {
    await onChangeFunc(e?.target?.files);
    e.target.value = "";
  };

  // On handle drag
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // On handle drop
  const handleDrop = async (e) => {
    e.preventDefault();
    await onChangeFunc(e?.dataTransfer?.files);
  };

  // On open camera
  const onOpenCamera = () => {
    inputRef?.current?.click();
  };

  return (
    <div className="relative">
      <label
        htmlFor="uploader-input"
        className="block w-full p-4 rounded-xl border border-gray-200 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p className="flex flex-col sm:flex-row items-center gap-3">
          <span className="block w-full sm:w-max py-2 px-4 border border-gray-200 bg-gray-100 rounded-xl text-center">
            Browse
          </span>
          or drop files here
        </p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          id="uploader-input"
          onChange={onChangeAction}
          multiple={multiple}
        />
      </label>
      <button
        type="button"
        className="sm:absolute sm:top-1/2 sm:end-4 sm:-translate-y-1/2 p-2 mx-auto block mt-4 sm:mt-0"
        onClick={onOpenCamera}
      >
        <SvgIcon name="camera" className="fill-current w-6 h-6" />
      </button>
    </div>
  );
};
