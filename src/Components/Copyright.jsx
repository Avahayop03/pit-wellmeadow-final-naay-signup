import { Typography, Link } from "@mui/material";

export default function Copyright(props) {
  return (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
  {'Copyright © '}

    Group 8 - PIT: WEB SYSTEMS AND IM {''}
  {new Date().getFullYear()}
  {'.'}
</Typography>
  )
}
