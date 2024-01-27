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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { AdminUrl } from "../../../constants/AdminUrl";
import { Permission } from "../../../constants/Permission";
import usePermissions from "../../../Permissions/hook";

const routesCollections: RoutesCollectionType[] = [
  {
    name: "الادوار والمستخدمين",
    icon: SecurityIcon,
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
    isPrivate: Permission.TENDERS_VIEW,
    routes: [
      {
        name: "اعدادات المنافسات",
        path: "/tenders",
        react: true,
      },
      {
        name: "منافساتي",
        path: "/tenders/controlpanel",
        react: true,
      },
    ],
  },
  {
    name: "العملاء",
    icon: GroupIcon,
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
    routes: [
      {
        name: "حضور الموظفين",
        path: "employee/reports",

        isPrivate: Permission.ATTENDANCE_VIEW,
      },
      { name: "طلبات الموظفين", path: "/employees/requests", react: true },
      { name: "اجراءات الطلبات", path: "/employees/procedures", react: true },
      {
        name: "الشكاوي والدعم",
        path: "attendance/support",

        isPrivate: Permission.ATTENDANCE_SUPPORT_VIEW,
      },
      {
        name: "محددات المشاريع",
        path: "attendance/projects-shifts",
        isPrivate: Permission.DASHBOARD_SETTING_SHIFT_VIEW,
      },
    ],
  },
  {
    name: "الاعدادات",
    icon: AdminPanelSettingsIcon,
    routes: [
      {
        name: "اعدادات لوحة التحكم",
        path: "settings/dashboard",
      },
      { name: "اعدادات الموقع والتطبيق", path: "settings/platforms" },
      {
        name: "اعدادات الاجازات",
        path: "/datalib/vacations",
        react: true,
      },
    ],
  },
  // {
  //   name: "الموظفين",
  //   icon: BadgeIcon,
  //   routes: [
  //     { name: "حضور الموظفين", path: "" },
  //     { name: "محددات المشاريع", path: "" },
  //   ],
  // },
];

function DrawerComponent(props: PropsType) {
  const [currentCollection, setCurrentCollection] = useState<null | number>();
  const { hasPermission } = usePermissions();
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
            allowed = hasPermission(collection.isPrivate);
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
  isPrivate?: Permission;
};

type RouteType = {
  name: string;
  path: string;
  react?: boolean;
  isPrivate?: Permission;
};

export default DrawerComponent;
