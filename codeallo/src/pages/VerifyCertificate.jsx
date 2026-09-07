import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, XCircle, Search } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import FormField from '../components/ui/FormField.jsx'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import CertificateDisplay from '../components/certificate/CertificateDisplay.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function VerifyCertificate() {
  const { certificateId } = useParams()
  const navigate = useNavigate()
  const [inputId, setInputId] = useState(certificateId || '')
  const [result, setResult] = useState(null) // undefined = not searched, null = not found, object = found
  const [loading, setLoading] = useState(false)

  const runVerification = async (id) => {
    if (!id) return
    setLoading(true)
    setResult(undefined)
    // This calls a SECURITY DEFINER function (see supabase/002_certificates.sql)
    // that returns only the display fields for one matching certificate —
    // it does NOT expose the ability to list every certificate in the system.
    const { data, error } = await supabase.rpc('get_certificate', { cert_id: id.trim() })
    setLoading(false)
    if (error || !data || data.length === 0) {
      setResult(null)
      return
    }
    setResult(data[0])
  }

  useEffect(() => {
    if (certificateId) runVerification(certificateId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateId])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/verify/${inputId.trim()}`)
    runVerification(inputId)
  }

  return (
    <>
      <Seo
        title="Verify a Certificate"
        description="Verify the authenticity of a Codeallo free course certificate."
        path="/verify"
      />
      <PageHero
        eyebrow="Verification"
        title="Verify a Codeallo certificate"
        description="Enter a certificate ID to confirm it was genuinely issued by Codeallo."
      />

      <section className="content-wrap max-w-2xl py-16 sm:py-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <FormField
              label="Certificate ID"
              name="certificateId"
              placeholder="e.g. CDL-INT-9F3K2LQ8"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="shrink-0">
            <Search size={15} /> Verify
          </Button>
        </form>

        <div className="mt-10">
          {loading && <LoadingState label="Checking certificate" />}

          {result === null && !loading && (
            <div className="flex items-start gap-3 border border-line bg-bone/40 p-6">
              <XCircle size={20} className="mt-0.5 shrink-0 text-ash" />
              <div>
                <p className="font-display text-lg text-ink">Certificate not found</p>
                <p className="mt-1 text-sm text-graphite">
                  No certificate matches that ID. Double-check it against the
                  certificate document and try again.
                </p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div>
              <div className="mb-6 flex items-start gap-3 border border-ink bg-bone/50 p-6">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-ink" />
                <div>
                  <p className="font-display text-lg text-ink">This certificate is genuine</p>
                  <p className="mt-1 text-sm text-graphite">
                    Issued by Codeallo Education and Technologies Pvt. Ltd.
                  </p>
                </div>
              </div>
              <CertificateDisplay
                fullName={result.full_name}
                courseTitle={result.course_title}
                hoursLabel={result.hours_label}
                certificateId={certificateId || inputId.trim()}
                issuedAt={result.issued_at}
                scorePercent={result.score_percent}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
