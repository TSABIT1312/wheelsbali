/* Home page skeleton — shown while the async Server Component streams */
export default function HomeLoading() {
  return (
    <div
      style={{
        background: '#FFFFFF',
      }}
    >
      {/* Skeleton nav */}
      <div
        style={{
          height: 64,
          borderBottom: '1px solid #E0E0E0',
          padding: '0 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="skeleton" style={{ width: 128, height: 20 }} />
        <div style={{ display: 'flex', gap: 32 }}>
          {[72, 64, 56, 48, 72].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: w, height: 11 }}
            />
          ))}
        </div>
        <div className="skeleton" style={{ width: 120, height: 38 }} />
      </div>

      {/* Skeleton hero */}
      <div
        style={{
          minHeight: '90vh',
          padding: '0 6vw 72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <div style={{ marginBottom: 40 }}>
          {[{ w: '58%' }, { w: '52%' }, { w: '28%' }].map((b, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: b.w, height: 'clamp(60px, 12vw, 150px)', marginBottom: 6 }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 420, width: '100%' }}>
            <div className="skeleton" style={{ height: 16, marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 16, width: '80%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="skeleton" style={{ width: 180, height: 46 }} />
            <div className="skeleton" style={{ width: 180, height: 46 }} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 56,
            paddingTop: 40,
            borderTop: '1px solid #E0E0E0',
            flexWrap: 'wrap',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div
                className="skeleton"
                style={{ width: 72, height: 48, marginBottom: 8 }}
              />
              <div className="skeleton" style={{ width: 88, height: 11 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton fleet */}
      <div style={{ padding: '88px 6vw' }}>
        <div
          className="skeleton"
          style={{ width: 200, height: 11, marginBottom: 20 }}
        />
        <div
          className="skeleton"
          style={{ width: 340, height: 48, marginBottom: 48 }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 1,
            background: '#E0E0E0',
            border: '1px solid #E0E0E0',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: '#FFFFFF' }}>
              <div className="skeleton" style={{ height: 220 }} />
              <div style={{ padding: 24 }}>
                <div
                  className="skeleton"
                  style={{ width: '65%', height: 24, marginBottom: 8 }}
                />
                <div
                  className="skeleton"
                  style={{ width: '85%', height: 14, marginBottom: 20 }}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 1,
                    background: '#E0E0E0',
                    border: '1px solid #E0E0E0',
                    marginBottom: 20,
                  }}
                >
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="skeleton" style={{ height: 58 }} />
                  ))}
                </div>
                <div className="skeleton" style={{ height: 40 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
