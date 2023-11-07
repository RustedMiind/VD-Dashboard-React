import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
      <Route path="employees">
        <Route path="requests" element={<EmplyeesRequests />} />
      </Route>
    </Routes>
  );
}

export default RoutesComponent;
