import {createPortal} from "react-dom";
import {ReactNode, useRef} from "react";
import {SvgIcon} from "../SvgIcon/Index";
import {Transition} from "react-transition-group";

import "./main.css";

interface Props {
  children?: ReactNode;
  isOpen?: boolean;
  disableClose?: boolean;
  closeButton?: boolean;
  title?: string;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export const ModalDialog = ({
  children = null,
  isOpen = false,
  closeButton = true,
  disableClose = false,
  onClose,
  title = "",
  size = "sm",
}: Props) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `all 400ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: {opacity: 1, transform: "translateX(0%)"},
    entered: {opacity: 1, transform: "translateX(0%)"},
    exiting: {opacity: 0, transform: "translateY(100%)"},
    exited: {opacity: 0, transform: "translateY(-100%)"},
  };

  // On close action
  const onCloseAction = () => {
    if (!disableClose) onClose?.();
  };

  return createPortal(
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={400}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        return (
          <div
            className="modalDialog fixed top-0 start-0 w-full h-full flex items-center justify-center p-6"
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div
              className="absolute z-[1] top-0 start-0 w-full h-full bg-blue-500/10"
              onClick={onCloseAction}
            ></div>

            <div
              className={`modalDialog-content relative z-[2] bg-white rounded-2xl p-4 sm:p-6 overflow-x-hidden ${size}`}
            >
              <div>
                <div className="flex justify-between items-center gap-x-6">
                  <h4 className="break-words w-3/4">{title}</h4>
                  {closeButton && !disableClose ? (
                    <button
                      className="w-8 h-8 flex items-center justify-center shrink-0"
                      onClick={onCloseAction}
                    >
                      <SvgIcon name="close" className="w-5 h-5 fill-current" />
                    </button>
                  ) : null}
                </div>
              </div>
              {children}
            </div>
          </div>
        );
      }}
    </Transition>,
    document?.getElementById("app-portal") as HTMLElement
  );
};
