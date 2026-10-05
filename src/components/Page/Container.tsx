import React from "react";

const Container = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={"p-4 m-2 rounded shadow-lg bg-white h-full"}>
            {children}
        </div>
    );
};

export default Container;