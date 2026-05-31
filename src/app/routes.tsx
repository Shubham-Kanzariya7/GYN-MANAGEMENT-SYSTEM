import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { LoginPage } from "./components/pages/LoginPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { Dashboard } from "./components/pages/Dashboard";
import { Members } from "./components/pages/Members";
import { MembershipPlans } from "./components/pages/MembershipPlans";
import { Attendance } from "./components/pages/Attendance";
import { Payments } from "./components/pages/Payments";
import { Trainers } from "./components/pages/Trainers";
import { WorkoutPlans } from "./components/pages/WorkoutPlans";
import { ProfileSettings } from "./components/pages/ProfileSettings";
import { RequireAuth } from "./components/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/",
    Component: RequireAuth,
    children: [
      {
        path: "/",
        Component: DashboardLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: "members", Component: Members },
          { path: "plans", Component: MembershipPlans },
          { path: "attendance", Component: Attendance },
          { path: "payments", Component: Payments },
          { path: "trainers", Component: Trainers },
          { path: "workouts", Component: WorkoutPlans },
          { path: "settings", Component: ProfileSettings },
        ],
      },
    ],
  },
]);
