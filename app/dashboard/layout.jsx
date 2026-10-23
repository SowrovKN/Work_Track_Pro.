import DashLayout from "../../src/dashboard/DashboardLayout/DashLayout";
import PrivateRoute from "../../src/router/PrivateRoute";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <DashLayout>{children}</DashLayout>
    </PrivateRoute>
  );
}
