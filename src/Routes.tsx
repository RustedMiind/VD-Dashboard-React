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
import VacationsTable from "./pages/vacations/VacationDetails";
import ClientDetails from "./pages/clients/clientDeatails";
import VacationDetails from "./pages/vacations/branchDetails";
import VacationsSettings from "./pages/vacations/VacationsSettings";
import TendersData from "./pages/tenders/data";
import CreateAndUpdateTender from "./pages/tenders/createAndUpdate";
import TenderDetails from "./pages/tenders/details";
import ControlPanal from "./pages/tenders/controlPanel";
import ForTest from "./pages/forTest";
import DesignReports from "./pages/DesignReports";
import usePermissions from "./Permissions/hook";
import { Permission } from "./constants/Permission";
import FormsSection from "./pages/soilSection/Forms";
import SoilSection from "./pages/soilSection";
// import ForTest from "./pages/forTest";
import CreateOrUpdateDesign from "./pages/designs/CreateOrUpdate";
import NotFoundPage from "./pages/NotFound/Index";
import DesignStructurePage from "./pages/designs/DesignStructure";
import DesignDataPage from "./pages/designs/DesignsData";
import SoilDetails from "./pages/soilSection/details";
import EnvoysDataPage from "./pages/envoy/data";
import MyTasks from "./pages/Tasks/MyTasks";
import ElectricityConstractors from "./pages/electricity/contractors";
import WorkOrderPage from "./pages/electricity/workOrderTypes";
import CreateOrUpdateWorkOrderType from "./pages/electricity/workOrderTypes/Add";
import WorkOrdersTypesDetails from "./pages/electricity/workOrdersTypesDetails";
import FollowUpEmployees from "./pages/electricity/FollowUpEmployees";
import WorkOrdersPage from "./pages/electricity/workOrders";
import CreateOrUpdateWorkOrder from "./pages/electricity/workOrders/Add";

function RoutesComponent() {
  const { hasPermission, hasAnyOfPermissions } = usePermissions();

  return (
    <Routes>
      <Route path="react/*">
        <Route path="test" element={<ForTest />} />
        <Route path="" element={<MainPage />} />
        {/* Employees Section */}
        <Route path="employees">
          {hasPermission(Permission.ATTENDANCE_REQUESTS_VIEW) && (
            <Route path="procedures" element={<EmploeesRequestsProcedures />} />
          )}
          {hasPermission(Permission.ATTENDANCE_REQUESTS_VIEW) && (
            <Route path="requests" element={<EmplyeesRequests />} />
          )}
        </Route>
        <Route path="datalib">
          <Route path="" element={<>{/* Dashboard Settings Page */}</>} />
          {
            <Route path="vacations">
              <Route path="" element={<VacationsSettings />} />
              <Route path=":branchId">
                <Route path="" element={<VacationDetails />} />
                <Route path=":yearId" element={<VacationsTable />} />
              </Route>
            </Route>
          }
        </Route>
        <Route path="clients">
          {hasPermission(Permission.CLIENTS_VIEW) && (
            <Route path="" element={<ClientData />} />
          )}
          {hasPermission(Permission.CLIENTS_VIEW) && (
            <Route path="details/:id" element={<ClientDetails />} />
          )}

          {hasPermission(Permission.CLIENTS_CREATE) && (
            <>
              <Route path="add" element={<AddClient />} />
              <Route path=":id/edit" element={<AddClient />} />
            </>
          )}

          {hasPermission(Permission.CLIENT_REQUESTS_STEP) && (
            <Route path="procedures" element={<ClientProcess />} />
          )}
          {hasPermission(Permission.CLIENT_REQUESTS_VIEW) && (
            <Route path="requests" element={<ClientRequests />} />
          )}
        </Route>
        <Route path="mytasks" element={<MyTasks />} />
        <Route path="envoy">
          <Route path="" element={<EnvoysDataPage />} />
        </Route>
        <Route path="electricity">
          <Route path="contractors" element={<ElectricityConstractors />} />
          <Route path="workorders">
            <Route path="" element={<WorkOrdersPage />} />
            <Route path="add" element={<CreateOrUpdateWorkOrder />} />
            <Route path="edit/:id" element={<CreateOrUpdateWorkOrder />} />
            <Route path="show/:id" element={<CreateOrUpdateWorkOrder show={true}/>} />
          </Route>
          <Route path="workordertypes">
            <Route path="" element={<WorkOrderPage />} />
            <Route path="add" element={<CreateOrUpdateWorkOrderType />} />
            <Route path="edit/:id" element={<CreateOrUpdateWorkOrderType />} />
            <Route path="details/:id" element={<WorkOrdersTypesDetails />} />
          </Route>
            <Route path="FollowUpEmployees" element={<FollowUpEmployees/>} />
        </Route>
        {hasAnyOfPermissions([
          Permission.TENDERS_SHOW,
          Permission.TENDERS_VIEW,
          Permission.TENDERS_CREATE,
          Permission.TENDERS_EDIT,
          Permission.TASKS_SHOW,
        ]) && (
          <Route path="tenders">
            {hasPermission(Permission.TENDERS_VIEW) && (
              <Route path="" element={<TendersData />} />
            )}

            {hasPermission(Permission.TENDERS_CREATE) && (
              <Route path="create" element={<CreateAndUpdateTender />} />
            )}

            {hasPermission(Permission.TENDERS_EDIT) && (
              <Route path="edit/:id" element={<CreateAndUpdateTender />} />
            )}

            {hasAnyOfPermissions([
              Permission.TASKS_SHOW,
              Permission.TENDERS_SHOW,
            ]) && <Route path="controlpanel" element={<MyTasks />} />}

            {hasPermission(Permission.TENDERS_SHOW) && (
              <Route path=":id" element={<TenderDetails />} />
            )}
          </Route>
        )}
        <Route path="services">
          <Route path="design">
            {hasPermission(Permission.DESIGN_SHOW) && (
              <Route path="" element={<DesignDataPage />} />
            )}

            {hasPermission(Permission.DESIGN_CREATE) && (
              <Route path="create" element={<CreateOrUpdateDesign />} />
            )}

            {hasPermission(Permission.DESIGN_CREATE) && (
              <Route path="edit/:designId" element={<CreateOrUpdateDesign />} />
            )}

            {hasPermission(Permission.DESIGN_CREATE) && (
              <Route path="structure" element={<DesignStructurePage />} />
            )}
          </Route>
          <Route path="soil">
            {hasPermission(Permission.SOIL_EDIT) && (
              <Route path="create" element={<FormsSection />} />
            )}

            {hasPermission(Permission.SOIL_SHOW) && (
              <Route path="" element={<SoilSection />} />
            )}

            {hasPermission(Permission.SOIL_SHOW) && (
              <Route path="show/:id" element={<SoilDetails />} />
            )}
            {hasPermission(Permission.SOIL_SHOW) && (
              <Route path="showtask/:id" element={<SoilDetails />} />
            )}
          </Route>
        </Route>

        <Route path="contracts">
          {hasPermission(Permission.CONTRACTS_VIEW) && (
            <Route path="" element={<Contracts />} />
          )}
          {/* <Route path="add" element={<ContractsNotFound />} /> */}
          {hasPermission(Permission.CONTRACTS_CREATE) && (
            <Route
              path="create/:type"
              element={<CreateContracts type="create" />}
            />
          )}
          <Route path=":id">
            {hasPermission(Permission.CONTRACTS_VIEW) && (
              <Route path="" element={<div>Contract Page</div>} />
            )}
            {hasPermission(Permission.CONTRACTS_EDIT) && (
              <Route path="edit" element={<CreateContracts type="edit" />} />
            )}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotReactRoute />} />
    </Routes>
  );
}

export default RoutesComponent;
