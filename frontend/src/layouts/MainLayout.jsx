import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = ({ children }) => {
            return (
                        <div>
                                    {/* <nav className="p-4 bg-blue-500 text-white">Skillswap</nav> */}
                                    <main className="p-3 rounded-2xl"><Outlet /></main> 
                        </div>
            );
};
