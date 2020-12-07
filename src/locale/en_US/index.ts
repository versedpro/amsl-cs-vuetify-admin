import route from "./route";
import * as components from "@/demo/locale/en_US/components";

export default {
  route,
  components,
  toolbar: {
    appname: "Application",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout"
  },
  settings: {
    title: "Theme Settings",
    default: "Set Default",
    version: "Version",
    position: "Position of elements",
    theme: "Theme",
    dark: "Dark theme",
    toolbarDense: "Toolbar dense",
    navbarDense: "Navbar dense",
    navbarLogo: "Navbar logo",
    settingsBtn: "Setting btn",
    footer: "Footer"
  },
  login: {
    titleIn: "Sing In Form",
    titleUn: "Sing Un Form",
    appTitle: "Customer Service",
    login: "Login",
    register: "Register",
    email: "Email",
    phone: "Phone",
    password: "Password",
    confirm: "Confirm"
  },
  orders: {
    referredBy: "Referred By",
    clientName: "Client",
    productName: "Product",
    status: "Status",
    email: "Email",
    password: "Password",
    confirm: "Confirm"
  },
  ongoing: {
    title: "Ongoing Orders"
  },
  completed: {
    title: "Successful Orders"
  },
  rejected: {
    title: "Rejected Orders"
  },
  industry: {
    add: "Add Industry",
    edit: "Edit Industry",
    title: "Industry"
  },
  supplier: {
    add: "Add Supplier",
    edit: "Edit Supplier",
    title: "Supplier"
  },
  products: {
    add: "Add Products",
    edit: "Edit Products",
    title: "Products"
  },
  supplier_products: {
    add: "Add Supplier Products",
    edit: "Edit Supplier Products",
    title: "Supplier Products"
  },
  referal: {
    clientName: "Client",
    phone: "Phone",
    email: "Email",
    address: "Address",
    productName: "Product",
    remark: "Remark"
  },
  home:{
    title: "REFER",
    itemTitle: "Card1",
    total: "Total Eng",
    moreInfo: "MORE INFO Eng"
  },
  homeData: [
      {
        title: "Card1",
        total: "Total Eng",
        moreInfo: "MORE INFO Eng"
      },
      {
        title: "Card2",
        total: "Total Eng",
        moreInfo: "MORE INFO Eng"
      },
      {
        title: "Card3",
        total: "Total Eng",
        moreInfo: "MORE INFO Eng"
      },
      {
        title: "Card4",
        total: "Total Eng",
        moreInfo: "MORE INFO Eng"
      }

  ],
  errors: {
    whoops: "Whoops",
    back: "Get me out of here!",
    301: "Moved Permanently",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error"
  },
  input: {
    cancel: "Cancel",
    save: "Save"
  },
  guide: {
    description:
      "The guide page is useful for some people who entered the project for " +
      "the first time. You can briefly introduce the features of the project. Demo is based on",
    button: "Show Guide"
  },
  ui: {
    switch: "Switch Language",
    theme: "Switch Theme",
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
    primary: "Primary",
    secondary: "Secondary",
    default: "Default",
    accent: "Accent",
    firstName: "First Name",
    lastName: "Last Name",
    email: "E-mail"
  }
};
