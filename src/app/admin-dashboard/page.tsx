"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRole } from '../utils/auth'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (getRole() !== 'admin') router.push('/login')
  }, [])

  return <div>Welcome Admin</div>
}
