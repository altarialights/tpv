import React from "react";
import NavBar from "../components/layoutComponent/NavBar";
import Account from "../components/layoutComponent/Account";

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex">
                <div className="">
                    <NavBar rol="admin" />
                    <Account rol="admin" />
                </div>
                <main className='w-screen h-screen'>{children}</main>
            </div>
        </>
    );
}

export default layout;
