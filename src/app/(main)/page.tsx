import { Container, Paper, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Log Intelligence
        </Typography>
        <Typography variant='body1'>
          A log analysis tool built with Next.js and TypeScript.
        </Typography>
      </Paper>
    </Container>
  )
}
