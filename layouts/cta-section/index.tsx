import React from 'react'
import Ctaimg from '@/components/cta-image'
import Ctacard from '@/components/cta-card'

function CtaSection() {
  return (
    <section className="relative">
      <Ctaimg />
      <div>
        <Ctacard />
      </div>
    </section>
  )
}

export default CtaSection
