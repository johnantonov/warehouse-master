'use client'
import AuthWindow from '@/components/auth/AuthWindow/AuthWindow';

export default function Home() {
  return (
    <main>
      <AuthWindow prevPage={'login'} />
    </main>
  );
}