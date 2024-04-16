import Layout from "./Layout";
import NavbarLogout from "./NavbarLogout";

const WithLayout = () => {
  return (
    <>
      <NavbarLogout />
      <Layout />
    </>
  );
};

export default WithLayout;
