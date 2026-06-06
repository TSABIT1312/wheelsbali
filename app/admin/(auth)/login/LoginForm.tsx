'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  color: '#777777',
  marginBottom: 7,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #E0E0E0',
  background: '#FFFFFF',
  fontFamily: 'var(--font-barlow), sans-serif',
  fontSize: 14,
  color: '#0A0A0A',
  outline: 'none',
  fontWeight: 300,
}

export default function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        fontFamily: 'var(--font-barlow), sans-serif',
        padding: '0 24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Brand tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#777777',
            marginBottom: 36,
          }}
        >
          <span
            style={{ display: 'block', width: 32, height: 1, background: '#E0E0E0' }}
          />
          Wheels Bali Admin
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 52,
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            color: '#0A0A0A',
            marginBottom: 44,
          }}
        >
          Admin
          <br />
          login.
        </h1>

        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {next && <input type="hidden" name="next" value={next} />}
          {/* Email */}
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              autoFocus
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#0A0A0A')}
              onBlur={(e) => (e.target.style.borderColor = '#E0E0E0')}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#0A0A0A')}
              onBlur={(e) => (e.target.style.borderColor = '#E0E0E0')}
            />
          </div>

          {/* Error message */}
          {state?.error && (
            <p
              role="alert"
              style={{
                fontSize: 13,
                color: '#C0392B',
                fontWeight: 300,
                marginTop: -4,
              }}
            >
              {state.error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            style={{
              width: '100%',
              padding: '13px 0',
              background: pending ? '#777777' : '#0A0A0A',
              color: '#FFFFFF',
              border: 'none',
              fontFamily: 'var(--font-barlow), sans-serif',
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: pending ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, background 0.2s',
              marginTop: 8,
            }}
            onMouseEnter={(e) => {
              if (!pending) (e.currentTarget as HTMLElement).style.opacity = '0.75'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1'
            }}
          >
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
