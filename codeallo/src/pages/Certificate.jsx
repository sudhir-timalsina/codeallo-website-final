import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Printer } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import CertificateDisplay from '../components/certificate/CertificateDisplay.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabaseClient.js'

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

  return (
    <>
      <Seo title={`Certificate — ${certificate.course_title}`} path={`/certificate/${certificate.id}`} />
      <div className="content-wrap py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link to="/dashboard" className="text-sm text-graphite hover:text-ink">&larr; Back to dashboard</Link>
          <Button onClick={() => window.print()} size="sm">
            <Printer size={15} /> Print / Save as PDF
          </Button>
        </div>

        <CertificateDisplay
          fullName={certificate.full_name}
          courseTitle={certificate.course_title}
          hoursLabel={certificate.hours_label}
          certificateId={certificate.id}
          issuedAt={certificate.issued_at}
          scorePercent={certificate.score_percent}
        />
      </div>
    </>
  )
}
