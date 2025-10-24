import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";

// Lazy load pages for performance
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));

export const AppRoutes = () => {
            return (
                        <Suspense fallback={<div>Loading...</div>}>
                                    <Routes>
                                                {/* Auth Routes */}
                                                <Route element={<AuthLayout />}>
                                                            <Route path="/signup" element={<Signup />} />
                                                            <Route path="/login" element={<Login />} />
                                                </Route>

                                                {/* Protected / Main App Routes */}
                                                <Route element={<MainLayout />}>
                                                            <Route path="/dashboard" element={<Dashboard />} />
                                                            <Route path="/profile" element={<Profile />} />
                                                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                                </Route>

                                                {/* 404 Page */}
                                                <Route path="*" element={<div>Page Not Found</div>} />
                                    </Routes>
                        </Suspense>
            );
};
