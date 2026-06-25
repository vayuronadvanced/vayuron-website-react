import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageBanner, CyanDivider } from '../components/ui'
import { SITE } from '../data/siteData'

const enquiryTypes = [
  'Product Enquiry',
  'Partnership / Integration',
  'Defence / Government',
  'Media / Press',
  'Careers',
  'General',
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: connect to your backend / Formspree / EmailJS
    console.log('Form submitted:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-surface border border-[rgba(0,212,255,0.2)] p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-display text-2xl font-bold text-cyan mb-3">Message Received</h3>
        <p className="text-muted">Our team will review your enquiry and respond within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
            Full Name *
          </label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-dim"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
            Organisation
          </label>
          <input
            name="org"
            value={form.org}
            onChange={handleChange}
            placeholder="Company / Agency"
            className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-dim"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-dim"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 00000 00000"
            className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-dim"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
          Enquiry Type *
        </label>
        <select
          name="type"
          required
          value={form.type}
          onChange={handleChange}
          className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors appearance-none"
        >
          <option value="" disabled>Select enquiry type</option>
          {enquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-mono text-xs tracking-widest uppercase text-cyan mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your requirements or enquiry..."
          className="w-full bg-black border border-[rgba(0,212,255,0.15)] focus:border-cyan text-text px-4 py-3 font-mono text-sm outline-none transition-colors placeholder-dim resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all px-8 py-3 font-mono text-xs tracking-widest uppercase"
      >
        Send Enquiry →
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Vayuron Advanced Systems</title>
        <meta name="description" content="Contact Vayuron Advanced Systems for product enquiries, partnerships, and defence briefings." />
      </Helmet>
      <main>
        <PageBanner
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Speak with our engineering and commercial team about your operational requirements."
          crumbs={[{ label: 'Contact' }]}
        />

        <section className="py-24 px-6 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">Direct Contact</p>
                <div className="space-y-3">
                  <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 text-muted hover:text-white transition-colors font-mono text-sm">
                    <span className="text-cyan">📞</span> {SITE.phone}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-muted hover:text-white transition-colors font-mono text-sm">
                    <span className="text-cyan">✉</span> {SITE.email}
                  </a>
                </div>
              </div>

              <CyanDivider />

              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">Headquarters</p>
                <p className="text-muted font-mono text-sm leading-relaxed">
                  Vayuron Advanced Systems<br />
                  Bhopal, Madhya Pradesh<br />
                  India
                </p>
              </div>

              <CyanDivider />

              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">Response Time</p>
                <p className="text-muted font-mono text-sm">
                  We respond to all enquiries within 2 business days. For urgent operational requirements, call directly.
                </p>
              </div>

              <CyanDivider />

              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan mb-3">Defence Enquiries</p>
                <p className="text-muted font-mono text-sm">
                  For classified or sensitive defence requirements, please contact us directly by phone to arrange a secure channel.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-white mb-8">Send an Enquiry</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
