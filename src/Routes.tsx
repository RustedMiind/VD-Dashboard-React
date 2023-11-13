import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";
import EmploeesRequestsProcedures from "./pages/employees/procedures";
import ClientData from "./pages/clients/data";
import AddClient from "./pages/clients/addClient/AddClient";
import Contracts from "./pages/contracts/data";
import AddContracts from './pages/contracts/addContracts/ContractsNotFound.1';
import CreateContracts from "./pages/contracts/addContracts/CreateContracts";
import ContractsNotFound from './pages/contracts/addContracts/ContractsNotFound.1';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
      <Route path="employees">
        <Route path="requests" element={<EmplyeesRequests />} />
        <Route path="procedures" element={<EmploeesRequestsProcedures />} />
      </Route>
      <Route path="clients">
        <Route path="" element={<ClientData />} />
        <Route path="add" element={<AddClient />} />
      </Route>
      <Route path="contracts">
        <Route path="" element={<Contracts />} />
        <Route path="add" element={<ContractsNotFound />} />
        <Route path="create" element={<CreateContracts />} />
      </Route>

    </Routes>
  );
}

export default RoutesComponent;
