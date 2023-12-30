import {useState} from "react";
import {FileItem} from "../../../../helpers/types";
import {ModalDialog} from "../../../ModalDialog/Index";
import {SvgIcon} from "../../../SvgIcon/Index";
import {ReactPainter} from "react-painter";
import {useExtensions} from "../../../../hooks/extensions";

import "./main.css";

type Props = {
  item: FileItem;
  className?: string;
  onChange?: (e) => void;
};

export const EditImage = ({item, onChange, className = ""}: Props) => {
  const [toggle, setToggle] = useState(false);
  const [key, setKey] = useState(0);

  const {previewImage, convertToBase64} = useExtensions();

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
  };

  // On save blob
  const onSaveBlob = async (value) => {
    if (!value) return;
    const url = await previewImage(value);
    const base64 = await convertToBase64(new File([value], item.name));
    onChange?.({...item, file: value, url, base64});
    onToggleAction();
  };

  // On force re rerender
  const onForceReRender = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <button type="button" onClick={onToggleAction} className={`${className}`}>
        <SvgIcon name="image-edit" className="fill-current w-6 h-6" />
      </button>

      <ModalDialog
        isOpen={toggle}
        onClose={onToggleAction}
        title={item?.name}
        size="xl"
      >
        <div className="preview-edit-image">
          <ReactPainter
            key={key}
            image={item?.base64?.url}
            width={item?.width}
            height={item?.height}
            initialColor="rgba(234,179,8)"
            initialLineWidth={5}
            onSave={onSaveBlob}
            render={({triggerSave, canvas}) => (
              <div>
                <div className="max-w-full overflow-x-auto">{canvas}</div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <button
                    type="button"
                    className="py-3 px-10 rounded-xl bg-blue-500 text-white block w-48 sm:w-auto"
                    onClick={triggerSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="py-3 px-10 rounded-xl bg-red-500 text-white block w-48 sm:w-auto"
                    onClick={onForceReRender}
                  >
                    Restart
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </ModalDialog>
    </>
  );
};
