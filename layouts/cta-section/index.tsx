import React from 'react'
import Ctaimg from '@/components/cta-Image/page'
import Ctacard from '@/components/cta-card/page'

function CtaSection() {
  return (
    
        <section className='relative'>
          <Ctaimg />
            <div >
                <Ctacard />
            </div>
        </section>
  )
}

export default CtaSection