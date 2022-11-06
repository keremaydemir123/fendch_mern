import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar';

function Admin() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default Admin;
