"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRole } from '../utils/auth'

export default function UserDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (getRole() !== 'user') router.push('/login')
  }, [])

  return <div>Welcome User</div>
}
