import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Printer } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import CertificateDisplay from '../components/certificate/CertificateDisplay.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { siteConfig } from '../lib/siteConfig.js'
import { buildLinkedInAddCertUrl } from '../utils/linkedin.js'

// lucide-react dropped brand/logo icons in recent versions, so the
// LinkedIn mark is a small inline SVG here rather than an import.
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15} aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

export default function Certificate() {
  const { certificateId } = useParams()
  const { user, loading: authLoading } = useAuth()
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      setLoading(false)
      return
    }

    let mounted = true
    supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single()
      .then(({ data }) => {
        if (mounted) {
          setCertificate(data)
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [certificateId, user, authLoading])

  if (authLoading || loading) return <LoadingState label="Loading certificate" />

  if (!user) {
    return (
      <div className="content-wrap flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">Log in to view this certificate</h1>
        <p className="max-w-sm text-sm text-graphite">
          Certificates are only visible to the person they were issued to (or an admin).
        </p>
        <Button to="/login" state={{ from: { pathname: `/certificate/${certificateId}` } }}>
          Log In
        </Button>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="content-wrap flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">Certificate not found</h1>
        <p className="max-w-sm text-sm text-graphite">
          This certificate ID doesn&rsquo;t exist, or isn&rsquo;t associated with
          your account.
        </p>
        <Button to="/dashboard" variant="secondary">Go to Dashboard</Button>
      </div>
    )
  }

  const verifyUrl = `${siteConfig.url}/verify/${certificate.id}`
  const linkedInUrl = buildLinkedInAddCertUrl({
    courseTitle: certificate.course_title,
    certificateId: certificate.id,
    issuedAt: certificate.issued_at,
    verifyUrl,
  })

  return (
    <>
      <Seo title={`Certificate — ${certificate.course_title}`} path={`/certificate/${certificate.id}`} />
      <div className="content-wrap py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link to="/dashboard" className="text-sm text-graphite hover:text-ink">&larr; Back to dashboard</Link>
          <div className="flex flex-wrap gap-3">
            <Button href={linkedInUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">
              <LinkedInIcon /> Add to LinkedIn Profile
            </Button>
            <Button onClick={() => window.print()} size="sm">
              <Printer size={15} /> Print / Save as PDF
            </Button>
          </div>
        </div>

        <CertificateDisplay
          fullName={certificate.full_name}
          courseTitle={certificate.course_title}
          hoursLabel={certificate.hours_label}
          certificateId={certificate.id}
          issuedAt={certificate.issued_at}
          scorePercent={certificate.score_percent}
        />

        <p className="mt-6 text-center text-xs text-ash print:hidden">
          This opens LinkedIn&rsquo;s official &ldquo;Add certification&rdquo; form, pre-filled
          with your course, Codeallo as the issuing organization, and a link
          back to this certificate&rsquo;s verification page.
        </p>
      </div>
    </>
  )
}
