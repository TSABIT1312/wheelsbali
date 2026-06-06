/* Admin motorcycles list skeleton */
export default function MotorcyclesLoading() {
  return (
    <div style={{ maxWidth: 900, fontFamily: 'var(--font-barlow), sans-serif' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}
      >
        <div>
          <div
            className="skeleton"
            style={{ width: 220, height: 42, marginBottom: 8 }}
          />
          <div className="skeleton" style={{ width: 180, height: 14 }} />
        </div>
        <div className="skeleton" style={{ width: 140, height: 38 }} />
      </div>

      {/* Table */}
      <div className="admin-table-scroll">
      <div
        className="admin-table-inner"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr 140px 120px 80px 120px',
            gap: 16,
            padding: '12px 20px',
            borderBottom: '1px solid #E0E0E0',
            background: '#FAFAFA',
          }}
        >
          {[40, 80, 72, 60, 52, 60].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: w, height: 10 }}
            />
          ))}
        </div>

        {/* Data rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr 140px 120px 80px 120px',
              gap: 16,
              padding: '16px 20px',
              borderBottom: '1px solid #F0F0F0',
              alignItems: 'center',
            }}
          >
            {/* Thumbnail */}
            <div className="skeleton" style={{ width: 52, height: 40 }} />
            {/* Name */}
            <div>
              <div
                className="skeleton"
                style={{ width: '60%', height: 15, marginBottom: 6 }}
              />
              <div className="skeleton" style={{ width: '40%', height: 11 }} />
            </div>
            {/* Category */}
            <div className="skeleton" style={{ width: 90, height: 22 }} />
            {/* Prices */}
            <div className="skeleton" style={{ width: 80, height: 14 }} />
            {/* Availability */}
            <div className="skeleton" style={{ width: 52, height: 24 }} />
            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="skeleton" style={{ width: 44, height: 30 }} />
              <div className="skeleton" style={{ width: 44, height: 30 }} />
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
