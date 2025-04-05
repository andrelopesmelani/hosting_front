import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import PrivateRoute from "@/components/PrivateRoute";
import Plans from "@/pages/Private/Plans";
import AdminLayout from "@/components/Layouts/AdminLayout";
import UserLayout from "@/components/Layouts/UserLayout";
import Hosting from "@/pages/Private/Hosting";
import Users from "@/pages/Private/Users";
import UserDetail from "@/pages/Private/Users/UserDetail";
import MyDomains from "@/pages/Private/MyDomains";
import SignDomain from "@/pages/Private/SignDomain";

export enum Roles {
  USER = 0,
  ADMIN = 1,
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute allowedRoles={[Roles.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={[Roles.USER]} />}>
          <Route element={<UserLayout />}>
            <Route path="/plans" element={<Plans />} />
            <Route path="/sign-domain" element={<SignDomain />} />
            <Route path="/my-domains" element={<MyDomains />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
