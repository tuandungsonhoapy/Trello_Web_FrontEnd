import React from 'react'
import Header from '@/layouts/Header'
import Container from '@mui/material/Container'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      {children}
    </Container>
  )
}

export default Layout
