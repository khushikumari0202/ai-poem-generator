import React from "react";
import { Props as SelectProps } from "react-select";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  variant?: "outlined" | "contained";
  isLoading?: boolean;
  color?: string;
};

export type PrimaryDropDownProps = SelectProps & {
  label?: string;
  title?: { text?: string; className?: string };
  children?: React.ReactNode;
  isOpen?: boolean;
  doneButton?: ButtonProps;
  cancelButton?: ButtonProps;
  isContentPadding?: boolean;
  className?: string;
  minHeight?: string;
  minWidth?: string;
};

const PrimaryDialog = ({
  label,
  title,
  doneButton,
  cancelButton,
  isContentPadding = false,
  minHeight = "auto",
  minWidth = "auto",
  isOpen,
  children,
  className,
  ...restProps
}: PrimaryDropDownProps) => {
  const id = React.useId();
  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0  z-50 flex h-full w-full items-center justify-center bg-backdrop"
          onClick={(e) => {
            e.stopPropagation();
            cancelButton?.onClick?.();
          }}
        >
          <div
            className={`flex max-h-[80vh] w-full min-w-[500px]  max-w-[700px] flex-col overflow-hidden rounded-lg bg-background ${className}`}
            onClick={(e) => e.stopPropagation()}
            style={{ minHeight: minHeight, minWidth: minWidth }}
          >
            <div
              className={` bg-background  p-5 font-styrene text-2xl font-bold ${title?.className}`}
            >
              {title?.text}
            </div>
            <div
              className={`flex flex-grow flex-col gap-5 overflow-auto bg-background px-5 pb-5`}
            >
              {children}
            </div>
            <div className="flex w-full justify-end border-t border-border bg-background p-3">
              <div className="flex gap-5">
                <button
                  className="rounded-md border px-3 py-2"
                  title={cancelButton?.text || "Cancel"}
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelButton?.onClick?.();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-primary px-3 py-2 text-primary-foreground"
                  style={{ maxHeight: "40px" }}
                  title={doneButton?.text || "Done"}
                  onClick={(e) => {
                    e.stopPropagation();
                    doneButton?.onClick?.();
                  }}
                  color={doneButton?.color}
                >
                  Publish Poem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PrimaryDialog.displayName = "PrimaryDialog";

export { PrimaryDialog };
// import "./CustomDialog.css";
// import {SimpleButton} from "components/Buttons/SimpleButton";

// export const CustomDialog = ({
//   title,
//   children,
//   isOpen,
//   doneButton,
//   cancelButton,
//   isContentPadding = false,
//   className,
//   minHeight = "auto",
//   minWidth = "auto",
// }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="dialogBackdrop"
//           onClick={(e) => {
//             e.stopPropagation();
//             cancelButton?.onClick();
//           }}
//         >
//           {/* Alert : Avoid OutsideClickHandler due to conflicts with open drawer and dialog. */}
//           <div
//             className={`dialogWrapper ${className}`}
//             onClick={(e) => e.stopPropagation()}
//             style={{minHeight: minHeight, minWidth: minWidth}}
//           >
//             <div className={`dialogTitle ${title?.className}`}>
//               {title?.text}
//             </div>
//             <div
//               className={`dialogContent ${
//                 isContentPadding && "contentPadding"
//               }`}
//             >
//               {children}
//             </div>
//             <div className="dialogBottomSection">
//               <div className="flexRow">
//                 <SimpleButton
//                   title={cancelButton?.text || "Cancel"}
//                   margin={12}
//                   click={(e) => {
//                     e.stopPropagation();
//                     cancelButton?.onClick();
//                   }}
//                   variant={cancelButton?.variant ?? "outlined"}
//                 />
//                 <SimpleButton
//                   style={{maxHeight: "40px"}}
//                   margin={12}
//                   loader={doneButton?.isLoading}
//                   title={doneButton?.text || "Done"}
//                   click={(e) => {
//                     e.stopPropagation();
//                     doneButton?.onClick();
//                   }}
//                   variant={doneButton?.variant ?? "contained"}
//                   color={doneButton?.color}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
