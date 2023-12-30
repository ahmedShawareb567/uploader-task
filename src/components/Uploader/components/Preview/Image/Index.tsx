import {ReactNode, useState} from "react";
import {ModalDialog} from "../../../../ModalDialog/Index";
import {FileItem} from "../../../../../helpers/types";

type Props = {
  item: FileItem;
  children: ReactNode;
};

export const PreviewImage = ({item, children}: Props) => {
  const [toggle, setToggle] = useState(false);

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        className="flex items-center justify-center"
        onClick={onToggleAction}
      >
        {children}
      </div>
      <ModalDialog
        isOpen={toggle}
        onClose={onToggleAction}
        title={item?.name}
        size="xl"
      >
        <div className="max-w-full overflow-x-auto">
          <div className="mt-6 w-max h-max mx-auto">
            <img src={item?.url} alt={item?.name} className="w-auto h-auto" />
          </div>
        </div>
      </ModalDialog>
    </>
  );
};
