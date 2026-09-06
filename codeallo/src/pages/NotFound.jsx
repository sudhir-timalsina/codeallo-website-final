import Seo from '../components/Seo.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <div className="content-wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="font-display text-8xl text-ink/15">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink">This page doesn&rsquo;t exist</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-graphite">
          The page you&rsquo;re looking for may have moved or been removed.
          Here are a few places to start instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/">Back to Home</Button>
          <Button to="/services" variant="secondary">Explore Services</Button>
          <Button to="/courses" variant="secondary">Explore Courses</Button>
        </div>
      </div>
    </>
  )
}
