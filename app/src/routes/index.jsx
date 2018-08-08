import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
// import AdminPage from "views/AdminPage/AdminPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

var indexRoutes = [
  // { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/how-it-works", name: "LandingPage", component: LandingPage },
  // { path: "/admin", name: "AdminPage", component: AdminPage },
  { path: "/profile/:id", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/components", name: "Components", component: Components }
];

export default indexRoutes;
