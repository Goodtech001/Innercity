import React from 'react'
import Ctacard from '@/components/cta-card'

function CtaSection() {
  return (
    // <section className="relative bg-ctabg min-h-full bg-[100%,100%]">
    //   {/* <Ctaimg /> */}
    //   <div className='justify-self-center'>
    //     <Ctacard />
    //   </div>
    // </section>
    <section className="relative bg-ctabg min-h-full bg-[100%,100%] flex items-center justify-center">
  <Ctacard />
</section>
  )
}

export default CtaSection
