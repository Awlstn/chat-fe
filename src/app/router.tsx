import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/features/auth/ui/Login";
import Signup from "@/features/auth/ui/Signup";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/login" replace />, // ✅ 리디렉션
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
  { basename: "/chat" }
);

export default router;
