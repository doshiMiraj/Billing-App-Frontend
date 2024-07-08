import { Helmet } from 'react-helmet-async';
// sections
import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title>Generate A Bill</title>
      </Helmet>

      <UserListView />
    </>
  );
}
