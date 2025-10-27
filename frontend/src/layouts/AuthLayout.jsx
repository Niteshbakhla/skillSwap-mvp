import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = ({ children }) => {
            return (
                        <div className=" ">
                                    {/* {children} */}
                                    <Outlet />
                        </div>
            );
};
