import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import { capitalize, map, toArray } from 'lodash';
import currency from 'currency.js';
import Emoji from './Emoji';
import { victoryColorScaleArray } from '../utils';
const math = require('mathjs');

function CategoriesTable({ data }) {
const categoryArray = toArray(data?.categories);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{
          minWidth: 360,
          '.MuiTableRow-root.MuiTableRow-hover': {
            '&:hover': {
              backgroundColor: 'white',
            }
          }
          }} aria-label="simple table">
          <TableBody>
            {map(categoryArray, (category, index) => {
              return (
                <TableRow
                  hover
                  key={category.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    sx={{ padding: '6px' }}
                    align="left" component="th"
                    scope="row"
                  >
                    <Chip
                      size="small"
                      sx={{
                        borderRadius: 2,
                        color: 'white',
                        backgroundColor: `${victoryColorScaleArray[index]}`,
                      }}
                      label={`
                        ${
                          math
                            .chain(category.metadata.total)
                            .divide(data?.metadata.total)
                            .multiply(100)
                            .round(2)
                        } %
                      `}
                    />
                    {`
                    `}&nbsp;
                    {category.emoji && <Emoji unicode={category.emoji} />}&nbsp;{capitalize(category.name)}
                  </TableCell>
                  <TableCell sx={{ padding: '6px' }} align="right">
                    {currency(category.metadata.total, { separator: ',', symbol: '$'}).format()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CategoriesTable;