import { Helmet } from 'react-helmet-async';
// sections
import { ProductListView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
      <Helmet>
        <title>Bill List</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
