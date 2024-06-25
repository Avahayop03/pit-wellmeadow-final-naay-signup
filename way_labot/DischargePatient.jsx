import {Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';



export default function DischargePatient() {
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableCell>Patient Number</TableCell>
        <TableCell>Patient Name</TableCell>
        <TableCell>Ward Name</TableCell>
        <TableCell>Bed Number</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Row 1, Cell 1</TableCell>
        <TableCell>Row 1, Cell 2</TableCell>
        <TableCell>Row 1, Cell 3</TableCell>
        <TableCell>Row 1, Cell 3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Row 2, Cell 1</TableCell>
        <TableCell>Row 2, Cell 2</TableCell>
        <TableCell>Row 2, Cell 3</TableCell>
        <TableCell>Row 1, Cell 3</TableCell>
      </TableRow>
      {/* Add more rows as needed */}
    </TableBody>
  </Table>
  )
}
