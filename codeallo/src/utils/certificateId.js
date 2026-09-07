// Produces IDs like "CDL-INT-9F3K2LQ8" — short enough to read aloud or
// type into the /verify page, with enough randomness that collisions are
// not a practical concern for this scale of usage. The database still
// enforces uniqueness (certificates.id is a primary key) as a hard
// backstop.

const coursePrefixes = {
  'introduction-to-ai': 'INT',
  'machine-learning-basics': 'MLB',
  'practical-ai-and-prompting': 'PAI',
}

export function generateCertificateId(courseSlug) {
  const prefix = coursePrefixes[courseSlug] || 'GEN'
  const timePart = Date.now().toString(36).toUpperCase()
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `CDL-${prefix}-${timePart}${randomPart}`
}
