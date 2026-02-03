'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Loading from '../components/Loading'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const router = useRouter()
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login')
      } else if (requireAdmin && user?.role !== 'admin') {
        router.push('/')
      }
    }
  }, [isAuthenticated, user, loading, requireAdmin, router])

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return null
  }

  if (requireAdmin && user?.role !== 'admin') {
    return null
  }

  return <>{children}</>
}

