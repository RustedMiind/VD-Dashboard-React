export enum Permission {
  USERS_VIEW = "users.view",
  USERS_CREATE = "users.create",
  USERS_EDIT = "users.edit",
  USERS_DELETE = "users.delete",
  USERS_ACTIVE = "users.active",
  ROLES_VIEW = "roles.view",
  ROLES_CREATE = "roles.create",
  ROLES_EDIT = "roles.edit",
  ROLES_DELETE = "roles.delete",
  BRANCHES_VIEW = "branches.view",
  BRANCHES_CREATE = "branches.create",
  BRANCHES_EDIT = "branches.edit",
  BRANCHES_DELETE = "branches.delete",
  MANAGEMENTS_VIEW = "managements.view",
  MANAGEMENTS_CREATE = "managements.create",
  MANAGEMENTS_EDIT = "managements.edit",
  MANAGEMENTS_DELETE = "managements.delete",
  DEPARTMENTS_VIEW = "departments.view",
  DEPARTMENTS_CREATE = "departments.create",
  DEPARTMENTS_EDIT = "departments.edit",
  DEPARTMENTS_DELETE = "departments.delete",
  JOB_TYPES_VIEW = "jobTypes.view",
  JOB_TYPES_CREATE = "jobTypes.create",
  JOB_TYPES_EDIT = "jobTypes.edit",
  JOB_TYPES_DELETE = "jobTypes.delete",
  JOB_NAMES_VIEW = "jobNames.view",
  JOB_NAMES_CREATE = "jobNames.create",
  JOB_NAMES_EDIT = "jobNames.edit",
  JOB_NAMES_DELETE = "jobNames.delete",
  JOB_GRADES_VIEW = "jobGrades.view",
  JOB_GRADES_CREATE = "jobGrades.create",
  JOB_GRADES_EDIT = "jobGrades.edit",
  JOB_GRADES_DELETE = "jobGrades.delete",
  CLIENTS_VIEW = "clients.view",
  CLIENTS_CREATE = "clients.create",
  CLIENTS_EDIT = "clients.edit",
  CLIENTS_DELETE = "clients.delete",
  BROKERS_VIEW = "brokers.view",
  BROKERS_CREATE = "brokers.create",
  BROKERS_EDIT = "brokers.edit",
  BROKERS_DELETE = "brokers.delete",
  EMPLOYEES_VIEW = "employees.view",
  EMPLOYEES_CREATE = "employees.create",
  EMPLOYEES_EDIT = "employees.edit",
  EMPLOYEES_DELETE = "employees.delete",
  CLIENT_REQUESTS_VIEW = "clientRequests.view",
  CLIENT_REQUESTS_CHANGE_STATUS = "clientRequests.changeStatus",
  DASHBOARD_SETTING_VIEW = "dashboardSetting.view",
  DASHBOARD_SETTING_BRANCHES = "dashboardSetting.branches",
  DASHBOARD_SETTING_BRANCHES_OFFICIAL_PAPER = "dashboardSetting.branches.officialPaper",
  DASHBOARD_SETTING_BRANCHES_OFFICIAL_PAPER_EDIT = "dashboardSetting.branches.officialPaper.edit",
  DASHBOARD_SETTING_BRANCHES_OFFICIAL_PAPER_DELETE = "dashboardSetting.branches.officialPaper.delete",
  DASHBOARD_SETTING_SHIFT_VIEW = "dashboardSetting.shift.view",
  DASHBOARD_SETTING_SHIFT_CREATE = "dashboardSetting.shift.create",
  DASHBOARD_SETTING_SHIFT_EDIT = "dashboardSetting.shift.edit",
  DASHBOARD_SETTING_SHIFT_DELETE = "dashboardSetting.shift.delete",
  PLATFORMS_VIEW = "platforms.view",
  PLATFORMS_SERVICES_VIEW = "platforms.services.view",
  PLATFORMS_SERVICES_CREATE = "platforms.services.create",
  PLATFORMS_SERVICES_EDIT = "platforms.services.edit",
  PLATFORMS_SERVICES_DELETE = "platforms.services.delete",
  PLATFORMS_PROJECTS_VIEW = "platforms.projects.view",
  PLATFORMS_PROJECTS_CREATE = "platforms.projects.create",
  PLATFORMS_PROJECTS_EDIT = "platforms.projects.edit",
  PLATFORMS_PROJECTS_DELETE = "platforms.projects.delete",
  PLATFORMS_PROJECT_TYPES_VIEW = "platforms.projectTypes.view",
  PLATFORMS_PROJECT_TYPES_CREATE = "platforms.projectTypes.create",
  PLATFORMS_PROJECT_TYPES_EDIT = "platforms.projectTypes.edit",
  PLATFORMS_PROJECT_TYPES_DELETE = "platforms.projectTypes.delete",
  PLATFORMS_NEWS_VIEW = "platforms.news.view",
  PLATFORMS_NEWS_CREATE = "platforms.news.create",
  PLATFORMS_NEWS_EDIT = "platforms.news.edit",
  PLATFORMS_NEWS_DELETE = "platforms.news.delete",
  PLATFORMS_ICONS_VIEW = "platforms.icons.view",
  PLATFORMS_ICONS_CREATE = "platforms.icons.create",
  PLATFORMS_ICONS_EDIT = "platforms.icons.edit",
  PLATFORMS_ICONS_DELETE = "platforms.icons.delete",
  PLATFORMS_MEMBERS_VIEW = "platforms.members.view",
  PLATFORMS_MEMBERS_CREATE = "platforms.members.create",
  PLATFORMS_MEMBERS_EDIT = "platforms.members.edit",
  PLATFORMS_MEMBERS_DELETE = "platforms.members.delete",
  PLATFORMS_BANNERS_VIEW = "platforms.banners.view",
  PLATFORMS_BANNERS_CREATE = "platforms.banners.create",
  PLATFORMS_BANNERS_EDIT = "platforms.banners.edit",
  PLATFORMS_BANNERS_DELETE = "platforms.banners.delete",
  PLATFORMS_CATEGORIES_VIEW = "platforms.categories.view",
  PLATFORMS_CATEGORIES_CREATE = "platforms.categories.create",
  PLATFORMS_CATEGORIES_EDIT = "platforms.categories.edit",
  PLATFORMS_CATEGORIES_DELETE = "platforms.categories.delete",
  PLATFORMS_INTRENAL_NEWS_VIEW = "platforms.intrenalNews.view",
  PLATFORMS_INTRENAL_NEWS_CREATE = "platforms.intrenalNews.create",
  PLATFORMS_INTRENAL_NEWS_EDIT = "platforms.intrenalNews.edit",
  PLATFORMS_INTRENAL_NEWS_DELETE = "platforms.intrenalNews.delete",
  PLATFORMS_MAIN_PAGE_EDIT = "platforms.mainPage.edit",
  PLATFORMS_ABOUT_US_EDIT = "platforms.aboutUs.edit",
  PLATFORMS_WEBSITE_SETTINGS = "platforms.website.settings",
  PLATFORMS_WEBSITE_REPORTS = "platforms.website.reports",
  ATTENDANCE_VIEW = "attendance.view",
  ATTENDANCE_REQUESTS_VIEW = "attendance.requests.view",
  ATTENDANCE_REQUESTS_CREATE = "attendance.requests.create",
  ATTENDANCE_REQUESTS_EDIT = "attendance.requests.edit",
  ATTENDANCE_REQUESTS_DELETE = "attendance.requests.delete",
  ATTENDANCE_REQUESTS_CHANGE_STATUS = "attendance.requests.changeStatus",
  ATTENDANCE_SUPPORT_VIEW = "attendance.support.view",
  ATTENDANCE_SUPPORT_CREATE = "attendance.support.create",
  ATTENDANCE_SUPPORT_EDIT = "attendance.support.edit",
  ATTENDANCE_SUPPORT_DELETE = "attendance.support.delete",
  ATTENDANCE_SUPPORT_CHANGE_STATUS = "attendance.support.changeStatus",
  TICKETS_VIEW = "tickets.view",
  TICKETS_CREATE = "tickets.create",
  TICKETS_EDIT = "tickets.edit",
  TICKETS_DELETE = "tickets.delete",
  TICKETS_CHANGE_STATUS = "tickets.changeStatus",
  DASHBOARD_SETTING_UNIVERSITIES_VIEW = "dashboardSetting.universities.view",
  DASHBOARD_SETTING_UNIVERSITIES_CREATE = "dashboardSetting.universities.create",
  DASHBOARD_SETTING_UNIVERSITIES_EDIT = "dashboardSetting.universities.edit",
  DASHBOARD_SETTING_UNIVERSITIES_DELETE = "dashboardSetting.universities.delete",
  DASHBOARD_SETTING_CITIES_VIEW = "dashboardSetting.cities.view",
  DASHBOARD_SETTING_CITIES_CREATE = "dashboardSetting.cities.create",
  DASHBOARD_SETTING_CITIES_EDIT = "dashboardSetting.cities.edit",
  DASHBOARD_SETTING_CITIES_DELETE = "dashboardSetting.cities.delete",
  MANAGERS_BRANCHES = "managers.branches",
  MANAGERS_MANAGEMENTS = "managers.managements",
  MANAGERS_DEPARTMENTS = "managers.departments",
  EMPLOYEES_PERSONAL_INFORMATION = "employees.personal-information",
  EMPLOYEES_ACADEMIC_INFO = "employees.academic-info",
  EMPLOYEES_EMPLOYMENT_INFO = "employees.employment-info",
  EMPLOYEES_EMPLOYEE_FINANCES = "employees.employee-finances",
  EMPLOYEES_ATTENDANCE = "employees.attendance",
  ATTENDANCE_PROJECTS_SHIFT_VIEW = "attendance.projectsShift.view",
  ATTENDANCE_PROJECTS_SHIFT_CREATE = "attendance.projectsShift.create",
  ATTENDANCE_PROJECTS_SHIFT_EDIT = "attendance.projectsShift.edit",
  ATTENDANCE_PROJECTS_SHIFT_DELETE = "attendance.projectsShift.delete",
  CLIENT_REQUESTS_STEP = "clientRequests.step",
  CLIENT_REQUESTS_ADDSTEP = "clientRequests.addstep",
  CLIENT_REQUESTS_EDITSTEP = "clientRequests.editStep",
  CONTRACTS_VIEW = "contracts.view",
  CONTRACTS_EDIT = "contracts.edit",
  CONTRACTS_CREATE = "contracts.create",
  CONTRACTS_DELETE = "contracts.delete",
  TENDERS_VIEW = "tenders.view",
  TENDERS_CREATE = "tenders.create",
  TENDERS_EDIT = "tenders.edit",
  TENDERS_DELETE = "tenders.delete",
  TENDERS_SHOW = "tenders.show",
}