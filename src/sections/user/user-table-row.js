import PropTypes from 'prop-types';
// @mui
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

export default function UserTableRow({ index, product, onChangeProduct }) {
  const handleChange = (field, value) => {
    let updatedProduct = { ...product, [field]: value };

    if (field === 'boxQuantity' || field === 'piecesPerBox') {
      updatedProduct.totalPieces = updatedProduct.boxQuantity * updatedProduct.piecesPerBox;
    }
    if (field === 'codePrice') {
      updatedProduct.actualPrice = updatedProduct.codePrice / 2;
    }
    updatedProduct.totalAmount = updatedProduct.totalPieces * updatedProduct.actualPrice;

    onChangeProduct(index, updatedProduct);
  };

  const handleFocus = (field) => {
    if (product[field] === 0) {
      handleChange(field, '');
    }
  };

  const handleBlur = (field, value) => {
    if (value === '') {
      handleChange(field, 0);
    }
  };

  return (
    <TableRow hover>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <TextField
          fullWidth
          value={product.productName}
          onChange={(e) => handleChange('productName', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.boxQuantity}
          onChange={(e) => handleChange('boxQuantity', Number(e.target.value))}
          onFocus={() => handleFocus('boxQuantity')}
          onBlur={(e) => handleBlur('boxQuantity', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.piecesPerBox}
          onChange={(e) => handleChange('piecesPerBox', Number(e.target.value))}
          onFocus={() => handleFocus('piecesPerBox')}
          onBlur={(e) => handleBlur('piecesPerBox', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.totalPieces}
          InputProps={{ readOnly: true }}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.codePrice}
          onChange={(e) => handleChange('codePrice', Number(e.target.value))}
          onFocus={() => handleFocus('codePrice')}
          onBlur={(e) => handleBlur('codePrice', e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.actualPrice}
          InputProps={{
            readOnly: true,
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          type="number"
          value={product.totalAmount}
          InputProps={{
            readOnly: true,
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.number,
  product: PropTypes.object,
  onChangeProduct: PropTypes.func,
};
