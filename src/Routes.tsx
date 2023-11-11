import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";
import EmploeesRequestsProcedures from "./pages/employees/procedures";
import ClientData from "./pages/clients/data";
import AddClient from "./pages/clients/data/addClient/AddClient";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
      <Route path="employees">
        <Route path="requests" element={<EmplyeesRequests />} />
        <Route path="procedures" element={<EmploeesRequestsProcedures />} />
      </Route>
      <Route path="clients">
        <Route path="data" element={<ClientData />} />
      </Route>
      <Route path="addClient" element={<AddClient />} />

    </Routes>
  );
}

export default RoutesComponent;
