import { useState } from 'react';
import {
  Stack,
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFTextField } from 'src/components/hook-form';
import UserTableRow from '../user-table-row';

const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr. No.' },
  { id: 'productName', label: 'Product Name' },
  { id: 'boxQuantity', label: 'Box Quantity' },
  { id: 'piecesPerBox', label: 'Pieces Per Box' },
  { id: 'totalPieces', label: 'Total Pieces' },
  { id: 'codePrice', label: 'Code Price' },
  { id: 'actualPrice', label: 'Actual Price' },
  { id: 'totalAmount', label: 'Total Amount' },
];

const BillSchema = Yup.object().shape({
  billNo: Yup.string().required('Bill number is required'),
  customerName: Yup.string().required('Customer name is required'),
  customerCity: Yup.string().required('Customer city is required'),
  date: Yup.date().required('Date is required'),
});

export default function BillForm() {
  const [products, setProducts] = useState([
    {
      productName: '',
      boxQuantity: 0,
      piecesPerBox: 0,
      totalPieces: 0,
      codePrice: 0,
      actualPrice: 0,
      totalAmount: 0,
    },
  ]);

  const methods = useForm({
    resolver: yupResolver(BillSchema),
  });

  const { control, handleSubmit } = methods;

  const handleProductChange = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const addProductRow = () => {
    setProducts([
      ...products,
      {
        productName: '',
        boxQuantity: 0,
        piecesPerBox: 0,
        totalPieces: 0,
        codePrice: 0,
        actualPrice: 0,
        totalAmount: 0,
      },
    ]);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log('Form data:', data);
    console.log('Products:', products);
  };

  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Typography variant="h4">New Bill</Typography>
      </Stack>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ mb: { xs: 1, md: 2 } }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <RHFTextField name="billNo" label="Bill Code" />
            <RHFTextField name="customerName" label="Customer Name" />
            <RHFTextField name="customerCity" label="Customer City" />
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </Stack>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id}>{headCell.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <UserTableRow
                      key={index}
                      index={index}
                      product={product}
                      onChangeProduct={handleProductChange}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
              <Button onClick={addProductRow}>Add Product</Button>
            </Stack>
          </Card>

          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
}
