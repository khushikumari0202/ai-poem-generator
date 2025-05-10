import React from "react";

interface LoadingProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  barColor?: string;
}

const Loading: React.FC<LoadingProps> = ({
  width = 200,
  height = 20,
  backgroundColor = "#e0e0e0",
  barColor = "var(--primary)",
}) => {
  return (
    <div className="bg-white s rounded-lg p-5">
      <div className="loading-container">
        <div className="loading-bar"></div>
      </div>
      <div className="loading-text">Generating...</div>
      <style jsx>{`
        .loading-container {
          width: ${width}px;
          height: ${height}px;
          background-color: ${backgroundColor};
          border-radius: ${height / 2}px;
          overflow: hidden;
          position: relative;
        }
        .loading-bar {
          width: ${height * 2}px;
          height: 100%;
          background-color: ${barColor};
          border-radius: ${height / 2}px;
          position: absolute;
          animation: move 1.5s infinite linear;
        }
        @keyframes move {
          0% {
            left: -${height * 2}px;
          }
          100% {
            left: 100%;
          }
        }
        .loading-text {
          text-align: center;
          margin-top: 10px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Loading;
// import React from "react";

// interface LoadingProps {
//   width?: number;
//   height?: number;
//   backgroundColor?: string;
//   barColor?: string;
// }

// const Loading: React.FC<LoadingProps> = ({
//   width = 200,
//   height = 20,
//   backgroundColor = "#e0e0e0",
//   barColor = "#000",
// }) => {
//   return (
//     <div className="p-5 bg-white rounded-lg shadow-md">
//       <div
//         className={`w-[${width}px] h-[${height}px] bg-[${backgroundColor}] rounded-[${height / 2}px] overflow-hidden relative`}
//       >
//         <div
//           className={`w-[${height * 2}px] h-full bg-[${barColor}] rounded-[${height / 2}px] absolute loading-bar`}
//         ></div>
//       </div>
//       <div className="text-center mt-3 text-primary">Loading...</div>
//       <style jsx>{`
//         .loading-bar {
//           animation: move 1.5s infinite linear;
//         }
//         @keyframes move {
//           0% {
//             left: -${height * 2}px;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Loading;
