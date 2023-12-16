import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import EmplyeesRequests from "./pages/employees/requests";
import EmploeesRequestsProcedures from "./pages/employees/procedures";
import ClientData from "./pages/clients/data";
import AddClient from "./pages/clients/addClient/AddClient";
import Contracts from "./pages/contracts/data";
import ClientRequests from "./pages/clients/clientRequest";
import ClientProcess from "./pages/clients/clientsProcess";
import NotReactRoute from "./NotReactRoute";
import CreateContracts from "./pages/contracts/SetContract";
import ForTest from "./pages/forTest";
import VacationsTable from "./pages/vacations/VacationDetails";
import ClientDetails from "./pages/clients/clientDeatails";
import VacationDetails from "./pages/vacations/branchDetails";
import VacationsSettings from "./pages/vacations/VacationsSettings";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="react/*">
        <Route path="test" element={<ForTest />} />
        <Route path="" element={<MainPage />} />
        <Route path="employees">
          <Route path="requests" element={<EmplyeesRequests />} />
          <Route path="procedures" element={<EmploeesRequestsProcedures />} />
        </Route>
        <Route path="datalib">
          <Route path="" element={<>{/* Dashboard Settings Page */}</>} />
          <Route path="vacations">
            <Route path="" element={<VacationsSettings />} />
            <Route path=":branchId">
              <Route path="" element={<VacationDetails />} />
              <Route path=":yearId" element={<VacationsTable />} />
            </Route>
          </Route>
        </Route>
        <Route path="clients">
          <Route path="" element={<ClientData />} />
          <Route path="details/:id" element={<ClientDetails />} />

          <Route path="add" element={<AddClient />} />
          <Route path=":id/edit" element={<AddClient />} />
          <Route path="requests" element={<ClientRequests />} />
          <Route path="procedures" element={<ClientProcess />} />
        </Route>
        <Route path="contracts">
          <Route path="" element={<Contracts />} />
          {/* <Route path="add" element={<ContractsNotFound />} /> */}
          <Route
            path="create/:type"
            element={<CreateContracts type="create" />}
          />
          <Route path=":id">
            <Route path="" element={<div>Contract Page</div>} />
            <Route path="edit" element={<CreateContracts type="edit" />} />
          </Route>
        </Route>
        <Route path="*" element={<div>صفحة خاطئة</div>} />
      </Route>
      <Route path="*" element={<NotReactRoute />} />
    </Routes>
  );
}

export default RoutesComponent;
