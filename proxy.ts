import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(req: NextRequest) {
  let res = NextResponse.next({ request: req })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    // Never 500 the edge — let the page render so the user sees a real UI
    // instead of the browser downloading an error body with no Content-Type.
    return res
  }

  try {
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          res = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    })

    const { data: { user } } = await supabase.auth.getUser()

    const pathname = req.nextUrl.pathname
    const isDashboard = pathname.startsWith('/dashboard')
    const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password'

    if (isDashboard && !user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (isAuthPage && user) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
  } catch (err) {
    console.error('[proxy] middleware error:', err)
    return res
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password'],
}
