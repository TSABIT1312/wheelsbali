'use client'

import { useActionState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { uploadImageAction, deleteImageAction } from '@/actions/motorcycles'
import type { ImageUploadState } from '@/actions/motorcycles'
import type { MotorcycleImage } from '@/lib/types/database'

export default function ImageUploader({
  motorcycleId,
  images,
}: {
  motorcycleId: string
  images: MotorcycleImage[]
}) {
  const uploadAction = uploadImageAction.bind(null, motorcycleId)
  const [uploadState, uploadFormAction, uploading] = useActionState<
    ImageUploadState,
    FormData
  >(uploadAction, null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (uploadState?.success && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [uploadState])

  const sortedImages = [...images].sort(
    (a, b) =>
      a.sort_order - b.sort_order ||
      a.created_at.localeCompare(b.created_at),
  )

  return (
    <div>
      {/* Section label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 20,
            height: 1,
            background: '#E0E0E0',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#777777',
            flexShrink: 0,
          }}
        >
          Photos
        </span>
        <span style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
      </div>

      {/* Image grid */}
      {sortedImages.length > 0 && (
        <div
          className="admin-image-grid"
          style={{
            gap: 1,
            background: '#E0E0E0',
            marginBottom: 20,
          }}
        >
          {sortedImages.map((img) => (
            <div
              key={img.id}
              style={{
                position: 'relative',
                background: '#FFFFFF',
                aspectRatio: '4/3',
                overflow: 'hidden',
              }}
            >
              <Image
                src={img.url}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 800px) 25vw, 180px"
              />
              {img.is_primary && (
                <span
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    background: '#0A0A0A',
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    pointerEvents: 'none',
                  }}
                >
                  Primary
                </span>
              )}
              <form
                action={deleteImageAction.bind(
                  null,
                  img.id,
                  img.storage_path,
                  motorcycleId,
                )}
                style={{ position: 'absolute', top: 6, right: 6 }}
                onSubmit={(e) => {
                  if (!confirm('Remove this photo?')) e.preventDefault()
                }}
              >
                <button
                  type="submit"
                  aria-label="Remove photo"
                  style={{
                    width: 22,
                    height: 22,
                    background: 'rgba(10,10,10,0.75)',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    lineHeight: '22px',
                    textAlign: 'center',
                    padding: 0,
                    display: 'block',
                  }}
                >
                  ×
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {sortedImages.length === 0 && (
        <div
          style={{
            border: '1px dashed #E0E0E0',
            padding: '28px 24px',
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 13,
            color: '#777777',
            fontWeight: 300,
          }}
        >
          No photos yet. Upload the first one below.
        </div>
      )}

      {/* Upload form */}
      <form action={uploadFormAction}>
        {uploadState?.error && (
          <div
            style={{
              marginBottom: 10,
              fontSize: 13,
              color: '#dc2626',
            }}
          >
            {uploadState.error}
          </div>
        )}
        {uploadState?.success && (
          <div
            style={{
              marginBottom: 10,
              fontSize: 13,
              color: '#16a34a',
            }}
          >
            Photo uploaded.
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            required
            style={{
              fontSize: 13,
              fontFamily: 'var(--font-barlow), sans-serif',
              color: '#0A0A0A',
              flex: 1,
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '9px 20px',
              background: uploading ? '#999' : '#0A0A0A',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-barlow), sans-serif',
              flexShrink: 0,
            }}
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
        <p
          style={{
            fontSize: 11,
            color: '#777777',
            marginTop: 6,
            fontWeight: 300,
          }}
        >
          JPEG, PNG or WebP · Max 5 MB
        </p>
      </form>
    </div>
  )
}
