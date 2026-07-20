import AdminSidebar from "../components/sidebar/AdminSidebar";
import VendorSidebar from "../components/sidebar/VendorSidebar";
import CustomerSidebar from "../components/sidebar/CustomerSidebar";

import Navbar from "../components/Navbar";

function MainLayout({ children }) {

  const role = localStorage.getItem("role");

  const renderSidebar = () => {

    switch (role) {

      case "ADMIN":
        return <AdminSidebar />;

      case "VENDOR":
        return <VendorSidebar />;

      case "CUSTOMER":
        return <CustomerSidebar />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {renderSidebar()}

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;