'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
  {
    question: "What is the InnerCity Mission Gifting Platform?",
    answer: "It is a free online fundraising and gifting platform created by The InnerCity Mission for Children. The platform allows anyone to create campaigns or donate to support indigent (underprivileged) children and families, with the core mission #EndChildPovertyNOW. It turns personal milestones (like birthdays) into opportunities to “gift” impact instead of receiving presents."
  },
  {
    question: "Who can use the platform?",
    answer: "Anyone passionate about ending child poverty — individuals, pastors, church groups, families, or organizations. No membership in a specific church is required, though it is inspired by the mandate of Pastor Chris Oyakhilome."
  },
  {
    question: "What causes and campaign categories are supported?",
    answer: "Common categories include: Child Health & Nutrition, Send Children Back to School, Emergency Food Response, 5 Billion Meals, Women Empowerment, and Community Development."
  },
  {
    question: "How does the platform work?",
    answer: "1. Browse active campaigns. 2. Create a Campaign (Sign up, choose category, set goal). 3. Promote on social media. 4. Donate in real-time. 5. Track Impact via live updates and success rates."
  },
  {
    question: "Is it free to create a campaign?",
    answer: "Yes, the platform is completely free to use for creating and managing campaigns. There are no platform fees for fundraisers."
  },
  {
    question: "How can I donate or support a campaign?",
    answer: "Browse campaigns on the homepage or /campaigns page. You can search by the fundraiser’s name or campaign title. Select a campaign, choose an amount, and complete your payment."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept Credit/Debit cards, Fundraise Vouchers (purchasable at InnerCity Mission offices), and 'Pay with Espee'. For assistance, email fundraise@theinnercitymission.org."
  },
  {
    question: "What are the platform’s key statistics and impact?",
    answer: "Over 10,000 campaigns created, more than $2 million raised, and a 98% success rate. Donations directly support feeding, education, and scholarships for children globally."
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Common Questions
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to know about the Gifting Platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Icon 
            icon="solar:magnifer-linear" 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" 
          />
          <input
            type="text"
            placeholder="Search for a question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <span className="font-bold text-gray-800 pr-4">{faq.question}</span>
                  <div className={`p-1 rounded-full transition-transform duration-300 ${activeIndex === index ? 'bg-blue-50 rotate-180' : 'bg-gray-50'}`}>
                    <Icon 
                      icon="solar:alt-arrow-down-linear" 
                      className={activeIndex === index ? 'text-blue-600' : 'text-gray-400'} 
                      width={20} 
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <Icon icon="solar:shield-warning-linear" className="mx-auto text-gray-300 mb-3" width={48} />
              <p className="text-gray-400">No results found for &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>

        {/* Support Footer */}
        <div className="mt-12 bg-blue-600 rounded-[2rem] p-8 text-center text-white shadow-xl shadow-blue-100">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-blue-100 text-sm mb-6">We&apos;re here to help you end child poverty.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="mailto:fundraise@theinnercitymission.ngo"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              Email Support
            </a>
            <a 
              href="https://theinnercitymission.ngo"
              target="_blank"
              className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}