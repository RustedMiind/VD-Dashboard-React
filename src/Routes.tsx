import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";
import EmploeesRequestsProcedures from "./pages/employees/procedures";
import ClientData from "./pages/clients/data";
import AddClient from "./pages/clients/addClient/AddClient";
import Contracts from "./pages/contracts/data";
import CreateContracts from "./pages/contracts/addContracts/CreateContracts";
import ContractsNotFound from "./pages/contracts/addContracts/ContractsNotFound.1";
import NotReactRoute from "./NotReactRoute";
import ClientRequests from "./pages/clients/clientRequest";
import ClientProcess from "./pages/clients/clientsProcess";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="react/*">
        <Route path="" element={<MainPage />} />
        <Route path="employees">
          <Route path="requests" element={<EmplyeesRequests />} />
          <Route path="procedures" element={<EmploeesRequestsProcedures />} />
        </Route>
        <Route path="clients">
          <Route path="" element={<ClientData />} />
          <Route path="add" element={<AddClient />} />
          <Route path=":name/edit" element={<AddClient />} />
          <Route path="requests" element={<ClientRequests />} />
          <Route path="procedures" element={<ClientProcess />} />
        </Route>
        <Route path="contracts">
          <Route path="" element={<Contracts />} />
          <Route path="add" element={<ContractsNotFound />} />
          <Route path="create" element={<CreateContracts />} />
        </Route>
        <Route path="*" element={<div>صفحة خاطئة</div>} />
      </Route>
      <Route path="*" element={<NotReactRoute />} />
    </Routes>
  );
}

export default RoutesComponent;
