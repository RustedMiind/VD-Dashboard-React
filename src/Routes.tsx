import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";
import EmploeesRequestsProcedures from "./pages/employees/procedures";
import ClientData from "./pages/clients/data";
import AddClient from "./pages/clients/addClient/AddClient";
import Contracts from "./pages/contracts/data";
import AddContracts from "./pages/contracts/CreateContract/ContractsNotFound.1";
import CreateContracts from "./pages/contracts/CreateContract";
import ContractsNotFound from "./pages/contracts/CreateContract/ContractsNotFound.1";
import NotReactRoute from "./NotReactRoute";

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
        </Route>
        <Route path="contracts">
          <Route path="" element={<Contracts />} />
          <Route path="add" element={<ContractsNotFound />} />
          <Route path="create/:type" element={<CreateContracts />} />
          <Route path=":id">
            <Route path="" element={<div>Contract Page</div>} />
            <Route path="edit" element={<div>Contract Page Edit</div>} />
          </Route>
        </Route>
        <Route path="*" element={<div>صفحة خاطئة</div>} />
      </Route>
      <Route path="*" element={<NotReactRoute />} />
    </Routes>
  );
}

export default RoutesComponent;
