"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
 useEffect(() => {
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') router.push('/dashboard');
  };

  verifyToken();
}, []);


  return (<h1>Admin Panel</h1>);
}
