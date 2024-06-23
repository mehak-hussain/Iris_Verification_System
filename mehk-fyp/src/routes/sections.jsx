import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";

export const IndexPage = lazy(() => import("../sections/overview/view/app-view"));
export const AllEmployeesPage = lazy(() => import("../pages/all-employees"));
export const LoginPage = lazy(() => import("../pages/login"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const FeedbackPage = lazy(() => import("../pages/feedback"));
export const FeedbackResponsePage = lazy(() => import("../pages/feedback-responses"));
export const AddEmployeePage = lazy(() => import("../pages/add-employee"));
export const EmployeeProfilePage = lazy(() => import("../pages/employee-profile"));
export const RegisterPage = lazy(() => import("../pages/register"));
export const DashboardPage = lazy(() => import("../pages/dashboard"));
export const PersonProfPage = lazy(() => import("../pages/person-profile"));
export const VerificationPage = lazy(() => import("../pages/verification"));
export const AccountSettingPage = lazy(() =>import("../pages/account-setting"));
export const ChangePasswordPage = lazy(() =>import("../pages/change-pwd-employee"));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "home", element: <IndexPage />, index: true },
        { path: "all-employee", element: <AllEmployeesPage /> },
        { path: "feedback", element: <FeedbackPage /> },
        { path: "feedback-responses", element: <FeedbackResponsePage /> },
        { path: "add-employee", element: <AddEmployeePage /> },
        { path: "employee-profile", element: <EmployeeProfilePage/>},
        { path: "person-profile", element: <PersonProfPage/>},
        { path: "register", element: <RegisterPage /> },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "verification", element: <VerificationPage /> },
        { path: "change-password", element: <ChangePasswordPage /> },
        { path: "account-setting", element: <AccountSettingPage /> },
      ],
    },
  ]);

  return routes;
}
