import CustomLink from '../CustomLink';

function AdminNavbar() {
  return (
    <nav className="flex items-center bg-gray p-2 gap-4">
      <CustomLink to="users">Users</CustomLink>
      <CustomLink to="create-challenge">Create Challenge</CustomLink>
      <CustomLink to="challenges/secret">Secret Challenges</CustomLink>
      <CustomLink to="challenges/old">Old Challenges</CustomLink>
      <CustomLink to="challenges/active">Active Challenges</CustomLink>
      <CustomLink to="suggestions">Suggestions</CustomLink>
    </nav>
  );
}

export default AdminNavbar;
