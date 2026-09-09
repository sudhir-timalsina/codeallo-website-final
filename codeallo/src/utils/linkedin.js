// LinkedIn supports a documented deep link that opens their "Add
// certification" form pre-filled with the details below — this adds a
// real entry under the person's Licenses & Certifications section (not
// just a status post), which is what makes it worth having on their
// profile long-term and keeps Codeallo's name visible whenever anyone
// views it.
//
// No API key or LinkedIn app registration is required for this — it's a
// public URL scheme.
export function buildLinkedInAddCertUrl({ courseTitle, certificateId, issuedAt, verifyUrl }) {
  const issued = new Date(issuedAt)

  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: courseTitle,
    organizationName: 'Codeallo Education and Technologies',
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certUrl: verifyUrl,
    certId: certificateId,
  })

  return `https://www.linkedin.com/profile/add?${params.toString()}`
}
