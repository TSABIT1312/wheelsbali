/* Bike detail page skeleton */
export default function BikeDetailLoading() {
  return (
    <div
      style={{
        background: '#FFFFFF',
      }}
    >
      {/* Skeleton header */}
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
        <div className="skeleton" style={{ width: 88, height: 14 }} />
      </div>

      {/* Skeleton hero: image + info */}
      <div
        className="bike-detail-hero"
        style={{ display: 'grid', padding: '56px 6vw', alignItems: 'start' }}
      >
        {/* Left: image */}
        <div>
          <div
            className="skeleton"
            style={{ width: '100%', aspectRatio: '4 / 3', marginBottom: 12 }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton"
                style={{ aspectRatio: '1 / 1' }}
              />
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div style={{ paddingTop: 8 }}>
          <div
            className="skeleton"
            style={{ width: 100, height: 22, marginBottom: 16 }}
          />
          <div
            className="skeleton"
            style={{ width: '70%', height: 56, marginBottom: 12 }}
          />
          <div
            className="skeleton"
            style={{ width: '50%', height: 14, marginBottom: 8 }}
          />
          <div
            className="skeleton"
            style={{ width: '35%', height: 12, marginBottom: 32 }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 1,
              background: '#E0E0E0',
              border: '1px solid #E0E0E0',
              marginBottom: 28,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton" style={{ height: 72 }} />
            ))}
          </div>
          <div
            className="skeleton"
            style={{ height: 52, marginBottom: 12 }}
          />
          <div className="skeleton" style={{ height: 14, width: '60%', margin: '0 auto' }} />
        </div>
      </div>
    </div>
  )
}
