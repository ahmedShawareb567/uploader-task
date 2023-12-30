import {ReactNode, useState} from "react";
import {ModalDialog} from "../../../../ModalDialog/Index";
import {FileItem} from "../../../../../helpers/types";
import {pdfjs} from "react-pdf";
import {Document, Page} from "react-pdf";
import {times} from "lodash-es";
import {PreviewShimmer} from "../../../../Ui/Shimmer/Index";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "./main.css";

type Props = {
  item: FileItem;
  children: ReactNode;
};

export const PreviewFile = ({item, children}: Props) => {
  const [toggle, setToggle] = useState(false);

  const [numPages, setNumPages] = useState<number[]>([]);

  // On document load success
  const onDocumentLoadSuccess = ({numPages}: {numPages: number}): void => {
    setNumPages(() => times(numPages));
  };

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center"
        onClick={onToggleAction}
      >
        {children}
      </div>
      <ModalDialog
        isOpen={toggle}
        onClose={onToggleAction}
        title={item.name}
        size="xl"
      >
        <div className="max-w-full overflow-x-auto">
          {item?.extension !== ".pdf" ? (
            <iframe src={item?.url} className="preview-iframe"></iframe>
          ) : (
            <Document
              file={item?.file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="mt-6"
              loading={<PreviewShimmer className="mt-6" />}
            >
              <div className="flex flex-col gap-y-4">
                {numPages?.map((i) => (
                  <Page
                    key={i}
                    pageIndex={i}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={800}
                    loading={<PreviewShimmer className="mt-6" />}
                  />
                ))}
              </div>
            </Document>
          )}
        </div>
      </ModalDialog>
    </>
  );
};
