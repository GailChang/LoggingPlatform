import { FormControl, FormLabel, Grid, TextField } from '@mui/material'

export default function DetailFormSection() {
  return (
    <Grid size={{ sm: 6, md: 4, lg: 3 }}>
      <FormControl fullWidth>
        <FormLabel>所屬服務</FormLabel>
        <TextField
          variant='standard'
          defaultValue='123'
          slotProps={{
            htmlInput: {
              readOnly: true,
              disabled: true,
            },
          }}
        />
      </FormControl>
    </Grid>
  )
}
