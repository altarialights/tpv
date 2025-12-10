import React from "react";
import NavBar from "../components/layoutComponent/NavBar";
import Account from "../components/layoutComponent/Account";

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar rol="admin" />
            <Account rol="admin" />
            <main>{children}</main>
        </div>
    );
}

export default layout;
