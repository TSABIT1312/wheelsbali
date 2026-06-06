/* Admin bookings list skeleton */
export default function BookingsLoading() {
  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div
          className="skeleton"
          style={{ width: 200, height: 42, marginBottom: 8 }}
        />
        <div className="skeleton" style={{ width: 160, height: 14 }} />
      </div>

      {/* Stats strip */}
      <div
        className="admin-stats-4"
        style={{
          gap: 1,
          background: '#E0E0E0',
          border: '1px solid #E0E0E0',
          marginBottom: 32,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ background: '#FFFFFF', padding: '20px 24px' }}>
            <div
              className="skeleton"
              style={{ width: 48, height: 32, marginBottom: 8 }}
            />
            <div className="skeleton" style={{ width: 64, height: 11 }} />
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 24 }}>
        {[60, 72, 80, 72, 68, 80].map((w, i) => (
          <div key={i} className="skeleton" style={{ width: w, height: 32 }} />
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-scroll">
      <div className="admin-table-inner" style={{ background: '#FFFFFF', border: '1px solid #E0E0E0' }}>
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr 140px 160px 100px 80px',
            gap: 16,
            padding: '12px 20px',
            borderBottom: '1px solid #E0E0E0',
            background: '#FAFAFA',
          }}
        >
          {[48, 80, 72, 100, 72, 56].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: w, height: 10 }}
            />
          ))}
        </div>

        {/* Data rows */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 140px 160px 100px 80px',
              gap: 16,
              padding: '16px 20px',
              borderBottom: '1px solid #F0F0F0',
              alignItems: 'center',
            }}
          >
            <div className="skeleton" style={{ width: 72, height: 14 }} />
            <div>
              <div
                className="skeleton"
                style={{ width: '60%', height: 14, marginBottom: 6 }}
              />
              <div className="skeleton" style={{ width: '40%', height: 11 }} />
            </div>
            <div className="skeleton" style={{ width: 100, height: 14 }} />
            <div className="skeleton" style={{ width: 120, height: 14 }} />
            <div className="skeleton" style={{ width: 64, height: 22 }} />
            <div className="skeleton" style={{ width: 44, height: 30 }} />
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
