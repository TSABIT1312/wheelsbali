import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { MobileMenuProvider } from '@/components/admin/MobileMenuContext'

export const metadata: Metadata = {
  title: 'Admin — Wheels Bali',
  robots: { index: false, follow: false },
}

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Secondary auth guard — middleware handles the primary redirect,
  // but this catches any edge case (e.g. expired token after page load).
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <MobileMenuProvider>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#F5F5F5',
        }}
      >
        <AdminSidebar />

        {/* Main area — desktop offset by sidebar width, mobile no offset */}
        <div
          className="admin-main"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: 0,
          }}
        >
          <AdminHeader email={user.email ?? ''} />

          <main id="main-content" className="admin-content" style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  )
}
