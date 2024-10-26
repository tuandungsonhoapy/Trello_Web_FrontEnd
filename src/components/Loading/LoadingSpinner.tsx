import { Box, CircularProgress, Typography } from '@mui/material'

function LoadingSpinner({ caption }: { caption?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: (theme) => theme.trelloCustom.contentLayoutHeight
      }}
    >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
      <Typography
        variant="h6"
        sx={{
          marginTop: '8px'
        }}
      >
        {caption || 'Loading...'}
      </Typography>
    </Box>
  )
}

export default LoadingSpinner
