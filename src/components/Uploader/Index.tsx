import {useState} from "react";
import {ModalDialog} from "../ModalDialog/Index";
import {SvgIcon} from "../SvgIcon/Index";
import {UploaderInput} from "./components/Input/Index";
import {UploaderPreview} from "./components/Preview/Index";
import {FileItem} from "../../helpers/types";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "./main.css";

type Props = {
  className?: string;
  onUploadFile?: (e) => void;
};

export const Uploader = ({className = "", onUploadFile}: Props) => {
  const [toggle, setToggle] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
  };

  // On uploader input change
  const onUploaderInputChange = (files) => {
    setFiles((state) => [...files, ...state]);
  };

  // On delete file
  const onDeleteAction = (value) => {
    if (!value) return;
    const currentIndex = files?.findIndex((item) => item.id === value);
    const currentFiles = files;
    currentFiles.splice(currentIndex, 1);
    setFiles(() => [...currentFiles]);
  };

  // On clear all
  const onClearAllAction = () => {
    setFiles([]);
  };

  // On edit image action
  const onEditImageAction = (value) => {
    if (!value) return;
    const currentFiles = files?.map((item) =>
      item?.id === value?.id ? value : item
    );
    setFiles(() => currentFiles);
  };

  // On upload file change action
  const onUploadAction = (value) => {
    if (!value) return;
    onUploadFile?.(value);
  };

  return (
    <div className={`${className}`}>
      <button
        type="button"
        className="mx-auto font-medium flex items-center justify-center gap-x-3 bg-blue-500 text-white px-10 py-4 rounded-xl transition-all duration-200 hover:bg-blue-600"
        onClick={onToggleAction}
      >
        <SvgIcon name="upload" className="fill-current w-5 h-5" />
        Upload
      </button>

      <ModalDialog
        isOpen={toggle}
        onClose={onToggleAction}
        title="Upload request money files"
      >
        <div className="mt-4">
          <UploaderInput value={files} onChange={onUploaderInputChange} />
          <div className="mt-6">
            <TransitionGroup className="max-h-72 px-2 overflow-y-auto flex flex-col gap-y-3">
              {files?.map((item) => (
                <CSSTransition key={item?.id} timeout={500} classNames="fade">
                  <UploaderPreview
                    key={item?.id}
                    item={item}
                    onDelete={onDeleteAction}
                    onEditImage={onEditImageAction}
                    onUpload={onUploadAction}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>

          {files?.length ? (
            <>
              <button
                type="button"
                className="block mt-4 mx-auto px-6 py-3 rounded-xl bg-red-500 text-white transition-all duration-200 hover:bg-red-600"
                onClick={onClearAllAction}
              >
                Clear All
              </button>
            </>
          ) : null}
        </div>
      </ModalDialog>
    </div>
  );
};
