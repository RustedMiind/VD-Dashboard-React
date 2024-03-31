import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconBox from "./IconBox";
import { Stack, SvgIconTypeMap } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Icons
import SecurityIcon from "@mui/icons-material/Security";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BiotechIcon from "@mui/icons-material/Biotech";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { AdminUrl } from "../../../constants/AdminUrl";
import { Permission } from "../../../constants/Permission";
import usePermissions from "../../../Permissions/hook";

const routesCollections: RoutesCollectionType[] = [
  {
    name: "الادوار والمستخدمين",
    icon: SecurityIcon,
    isPrivate: [Permission.ROLES_VIEW, Permission.USERS_VIEW],
    routes: [
      {
        name: "الادوار",
        path: "roles/index",
        isPrivate: Permission.ROLES_VIEW,
      },
      { name: "المستخدمين", path: "users", isPrivate: Permission.USERS_VIEW },
    ],
  },
  // {
  //   name: "مكتبة البيانات",
  //   icon: AutoAwesomeMosaicIcon,
  //   routes: [{ name: "إدارة الإجازات", path: "/vacations", react: true}],
  // },
  {
    name: "الهيكل التنظيمي",
    icon: AutoAwesomeMosaicIcon,
    isPrivate: [
      Permission.MANAGEMENTS_VIEW,
      Permission.JOB_GRADES_VIEW,
      Permission.EMPLOYEES_VIEW,
    ],
    routes: [
      { name: "الفروع", path: "branches", isPrivate: Permission.BRANCHES_VIEW },
      {
        name: "الادارة والاقسام",
        path: "managements",
        isPrivate: Permission.MANAGEMENTS_VIEW,
      },
      {
        name: "التسلسل الوظيفي",
        path: "job_types",
        isPrivate: Permission.JOB_GRADES_VIEW,
      },
      {
        name: "بيانات الموظفين",
        path: "employees",
        isPrivate: Permission.EMPLOYEES_VIEW,
      },
    ],
  },
  {
    name: "مشاريعي",
    icon: AccountTreeIcon,
    isPrivate: [
      Permission.TENDERS_SHOW,
      Permission.TASKS_SHOW,
      Permission.TENDERS_VIEW,
      Permission.SOIL_SHOW,
    ],
    routes: [
      {
        name: "المنافسات",
        path: "/tenders",
        react: true,
        isPrivate: Permission.TENDERS_VIEW,
      },
      {
        name: "مهامي",
        path: "/tenders/controlpanel",
        react: true,
        isPrivate: Permission.TASKS_SHOW,
      },
      {
        name: "التربة والخرسانة",
        path: "/services/soil",
        react: true,
        isPrivate: Permission.SOIL_SHOW,
      },
    ],
  },
  {
    name: "الكهرباء",
    icon: ElectricBoltIcon,
    routes: [
      {
        name: "المناديب",
        path: "/envoy",
        react: true,
      },
      {
        name: "المقاولين",
        path: "/electricity/contractors",
        react: true,
      },
      {
        name: "أوامر العمل",
        path: "/electricity/workOrders",
        react: true,
      },
      {
        name: "أنواع أوامر العمل",
        path: "/electricity/workordertypes",
        react: true,
      },
      {
        name: "متابعة الموظفين",
        path: "/electricity/FollowUpEmployees",
        react: true,
      },
    ],
  },
  {
    name: "العملاء",
    icon: GroupIcon,
    isPrivate: [
      Permission.CLIENTS_VIEW,
      Permission.CONTRACTS_VIEW,
      Permission.BROKERS_VIEW,
      Permission.CLIENT_REQUESTS_VIEW,
      Permission.CLIENT_REQUESTS_ADDSTEP,
    ],
    routes: [
      {
        name: "بيانات العملاء",
        path: "/clients",
        react: true,
        isPrivate: Permission.CLIENTS_VIEW,
      },
      {
        name: "ادارة العقود",
        path: "/contracts",
        react: true,
        isPrivate: Permission.CONTRACTS_VIEW,
      },
      {
        name: "بيانات الوسطاء",
        path: "brokers",
        isPrivate: Permission.BROKERS_VIEW,
      },
      {
        name: "طلبات العملاء",
        path: "/clients/requests",
        react: true,
        isPrivate: Permission.CLIENT_REQUESTS_VIEW,
      },
      {
        name: "اجراءات العملاء",
        path: "/clients/procedures",
        react: true,
        isPrivate: Permission.CLIENT_REQUESTS_ADDSTEP,
      },
    ],
  },
  {
    name: "الحضور والطلبات",
    icon: AssignmentIcon,
    isPrivate: [
      Permission.ATTENDANCE_VIEW,
      Permission.TICKETS_VIEW,
      Permission.DASHBOARD_SETTING_SHIFT_VIEW,
      Permission.ATTENDANCE_REQUESTS_VIEW,
    ],
    routes: [
      {
        name: "حضور الموظفين",
        path: "employee/reports",
        isPrivate: Permission.ATTENDANCE_VIEW,
      },
      {
        name: "طلبات الموظفين",
        path: "/employees/requests",
        react: true,
        isPrivate: Permission.ATTENDANCE_REQUESTS_VIEW,
      },
      {
        name: "اجراءات الطلبات",
        path: "/employees/procedures",
        react: true,
        isPrivate: Permission.ATTENDANCE_REQUESTS_CREATE,
      },
      {
        name: "الشكاوي والدعم",
        path: "attendance/support",
        isPrivate: Permission.TICKETS_VIEW,
      },
      {
        name: "محددات المشاريع",
        path: "attendance/projects-shifts",
        isPrivate: Permission.DASHBOARD_SETTING_SHIFT_VIEW,
      },
    ],
  },
  {
    name: "الخدمات",
    icon: DesignServicesIcon,
    isPrivate: [Permission.DESIGN_SHOW, Permission.DESIGN_CREATE],
    routes: [
      {
        name: "خدمات التصاميم",
        path: "/services/design",
        react: true,
        isPrivate: Permission.DESIGN_SHOW,
      },
      {
        name: "هيكل تصميم المباني",
        path: "/services/design/structure",
        react: true,
        isPrivate: Permission.DESIGN_CREATE,
      },
    ],
  },
  {
    name: "الاعدادات",
    icon: AdminPanelSettingsIcon,
    isPrivate: [
      Permission.DASHBOARD_SETTING_VIEW,
      Permission.PLATFORMS_VIEW,
      Permission.SOIL_CREATE,
    ],
    routes: [
      {
        name: "اعدادات لوحة التحكم",
        path: "settings/dashboard",
        isPrivate: Permission.DASHBOARD_SETTING_VIEW,
      },
      {
        name: "اعدادات الموقع والتطبيق",
        path: "settings/platforms",
        isPrivate: Permission.PLATFORMS_VIEW,
      },
      {
        name: "اعدادات الاجازات",
        path: "/datalib/vacations",
        react: true,
        isPrivate: Permission.DASHBOARD_SETTING_VIEW,
      },
      {
        name: "اعدادات التربة",
        path: "/services/soil/create",
        react: true,
        isPrivate: Permission.SOIL_CREATE,
      },
    ],
  },
  {
    name: "اعدادات التطبيق",
    icon: AppSettingsAltIcon,
    routes: [
      {
        name: "الاعلانات",
        path: "/announcements",
        react: true,
      },
      {
        name: "تواصل معنا",
        path: "/communication",
        react: true,
      },
      {
        name: "القصص",
        path: "/stories",
        react: true,
      },
      {
        name: "خدمات التطبيق",
        path: "/mobile-services",
        react: true,
      },
    ],
  },
  {
    name: "تحت التطوير",
    icon: BiotechIcon,
    routes: [],
  },
];

function DrawerComponent(props: PropsType) {
  const [currentCollection, setCurrentCollection] = useState<null | number>();
  const { hasPermission, hasAnyOfPermissions } = usePermissions();
  return (
    <Drawer
      sx={{
        width: props.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.width,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "*": {
            color: "primary.contrastText",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <IconBox />
      <List>
        {routesCollections.map((collection, index) => {
          let allowed = !collection.isPrivate;
          if (!allowed && collection.isPrivate) {
            allowed = hasAnyOfPermissions(collection.isPrivate);
          }

          return (
            allowed && (
              <Accordion
                key={index}
                sx={{
                  backgroundColor: "transparent",
                }}
                expanded={currentCollection === index}
                onChange={(e, x) => {
                  if (x) {
                    setCurrentCollection(index);
                  } else {
                    setCurrentCollection(null);
                  }
                }}
                elevation={0}
                disableGutters
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  component={Button}
                  sx={{ width: 1 }}
                  key={collection.name}
                >
                  {collection.icon && <collection.icon />}
                  <Typography ml={collection.icon ? 0.5 : 0}>
                    {collection.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack
                    sx={{
                      button: {
                        width: 1,
                        justifyContent: "start",
                      },
                    }}
                  >
                    {collection.routes.map((route, i) => {
                      let allowed = !route.isPrivate;
                      if (!allowed && route.isPrivate) {
                        allowed = hasPermission(route.isPrivate);
                      }
                      return (
                        allowed && (
                          <Button
                            key={i}
                            disabled={!route.path}
                            sx={{ justifyContent: "start" }}
                            {...(route.react
                              ? {
                                  component: NavLink,
                                  to: `/react${route.path}`,
                                }
                              : { component: "a", href: AdminUrl(route.path) })}
                          >
                            {route.name}
                          </Button>
                        )
                      );
                    })}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )
          );
        })}
      </List>
    </Drawer>
  );
}

type PropsType = {
  width: number;
};

type RoutesCollectionType = {
  name: string;
  routes: RouteType[];
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  isPrivate?: Permission[];
};

type RouteType = {
  name: string;
  path: string;
  react?: boolean;
  isPrivate?: Permission;
};

export default DrawerComponent;
