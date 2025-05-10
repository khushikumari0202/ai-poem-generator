import React from "react";

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className=" w-full h-screen bg-background text-foreground">
      {/* <!-- Header --> */}
      {children}
      {/* <!-- Footer --> */}
    </div>
  );
};
