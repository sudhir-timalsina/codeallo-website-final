import logoBlack from '../../assets/icon-black.png'
import { signatories } from '../../data/signatories.js'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function CertificateDisplay({
  fullName,
  courseTitle,
  hoursLabel,
  certificateId,
  issuedAt,
  scorePercent,
}) {
  return (
    <div className="certificate-print-area mx-auto w-full max-w-3xl border-[3px] border-double border-ink bg-paper p-8 sm:p-14">
      <div className="flex flex-col items-center text-center">
        <img src={logoBlack} alt="" className="h-14 w-auto" />
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-ash">
          Codeallo Education and Technologies
        </p>

        <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">Certificate of Completion</h1>

        <p className="mt-8 text-sm uppercase tracking-[0.15em] text-ash">This certifies that</p>
        <p className="mt-3 font-display text-4xl text-ink sm:text-5xl">{fullName}</p>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-graphite">
          has successfully completed the free online course
        </p>
        <p className="mt-2 font-display text-xl text-ink sm:text-2xl">{courseTitle}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite">
          consisting of {hoursLabel} of self-paced Basic AI Knowledge Training,
          including a passing score of {scorePercent}% on the course
          assessment.
        </p>

        <div className="mt-14 grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {signatories.map((person) => (
            <div key={person.name} className="flex flex-col items-center">
              <p
                className="text-3xl text-ink"
                style={{ fontFamily: person.signatureFont }}
              >
                {person.name}
              </p>
              <div className="mt-1 h-px w-full bg-line" />
              <p className="mt-2 text-xs font-medium text-ink">{person.name}</p>
              {person.title && <p className="text-[0.7rem] text-ash">{person.title}</p>}
            </div>
          ))}
        </div>

        <div className="mt-12 flex w-full flex-col items-center gap-1 border-t border-line pt-5 text-xs text-ash sm:flex-row sm:justify-between">
          <span>Certificate ID: {certificateId}</span>
          <span>Issued: {formatDate(issuedAt)}</span>
        </div>
        <p className="mt-3 text-[0.7rem] text-ash">
          Verify this certificate at codeallo.com.np/verify/{certificateId}
        </p>
      </div>
    </div>
  )
}
