import { useEffect, useState } from 'react'
import Button from '../ui/Button.jsx'

const rotatingWords = [
  'Python',
  'JavaScript',
  'Websites',
  'Applications',
  'Artificial Intelligence',
  'School Systems',
  'Cybersecurity',
  'Robotics',
]

export default function HomeHero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="content-wrap grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-8">
          <p className="mb-6 text-sm text-paper/55">Codeallo Education and Technologies</p>
          <h1 className="text-balance font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem]">
            Technology that teaches.
            <br />
            Technology that works.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-paper/75">
            Codeallo teaches programming, AI and digital skills to students and
            schools, and builds websites, applications and digital solutions
            for institutions and businesses — from Kathmandu, for clients
            everywhere.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/services" variant="inverse" icon>
              Explore Services
            </Button>
            <Button to="/courses" variant="inverse-outline" icon>
              Explore Courses
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-end border-t border-paper/15 pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="text-sm text-paper/45">Right now, someone at Codeallo is teaching or building</p>
          <p
            key={index}
            aria-live="polite"
            className="mt-3 font-display text-3xl text-paper sm:text-4xl"
          >
            {rotatingWords[index]}
          </p>
          <p className="mt-6 text-sm text-paper/45">Education × Technology × Innovation</p>
        </div>
      </div>
    </section>
  )
}
