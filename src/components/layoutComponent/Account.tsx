import React from "react";

function Account({ rol }: { rol: string }) {
    if (rol == "admin") {
        return (
            <div className="">
                <img src="" alt="" />
                <h4></h4>
            </div>
        );
    } else if (rol == "camarero") {
        return (
            <div>
                <img src="" alt="" />
                <h4>{rol}</h4>
            </div>
        );
    } else if (rol == "cocinero") {
        return (
            <div>
                <img src="" alt="" />
                <h4></h4>
            </div>
        );
    }
}

export default Account;
