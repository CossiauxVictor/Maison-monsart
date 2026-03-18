import { useEffect, useRef, useState } from 'react'
import logoSrc from '../assets/logo.svg'

const CONTACT_EMAIL = 'contact@maisonmonsart.fr'

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function Partenaires() {
  const hero = useFadeIn(0.2)
  const blocs = useFadeIn(0.15)
  const form = useFadeIn(0.15)

  const [sent, setSent] = useState(false)
  const [data, setData] = useState({
    brand: '',
    contactName: '',
    email: '',
    website: '',
    category: '',
    message: '',
  })

  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = 'Partenariat — Maison Monsart'
    const body = [
      `Marque / Atelier : ${data.brand}`,
      `Contact : ${data.contactName}`,
      `Email : ${data.email}`,
      data.website ? `Site : ${data.website}` : null,
      data.category ? `Catégorie : ${data.category}` : null,
      '',
      'Message :',
      data.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-monsart-night/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex items-center gap-2 text-white font-display font-medium tracking-tight">
            <img src={logoSrc} alt="" className="h-16 w-auto object-contain" aria-hidden />
          </a>
          <div className="flex items-center gap-6 text-sm font-light text-white/90">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <a href="/#newsletter" className="hover:text-white transition-colors">Newsletter</a>
            <a href="/partenaires" className="hover:text-white transition-colors">Partenaires</a>
            <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <header
        ref={hero.ref}
        className={`pt-28 sm:pt-32 pb-14 sm:pb-18 px-6 sm:px-8 md:px-12 bg-[#f8f8f8] transition-all duration-700 ${hero.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-monsart-night font-medium tracking-tight leading-tight">
              Partenaires
            </h1>
            <p className="mt-5 text-[#333] font-light leading-relaxed text-base sm:text-lg">
              Maison Monsart est une maison de sélection : une marketplace curatée, exigeante et lisible, dédiée au Made in France.
              Nous recherchons des marques et ateliers capables de prouver l’origine, la qualité et la cohérence de leur démarche.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#candidature"
                className="inline-block px-8 py-3 bg-monsart-night text-white text-sm font-medium tracking-wide hover:bg-monsart-night/90 transition-colors duration-300 border border-monsart-night text-center"
              >
                Proposer ma marque
              </a>
              <a
                href="/#approche"
                className="inline-block px-8 py-3 border border-monsart-night/30 text-monsart-night text-sm font-medium tracking-wide hover:bg-monsart-night/5 transition-colors duration-300 text-center"
              >
                Découvrir notre approche
              </a>
            </div>
          </div>
        </div>
      </header>

      <section
        ref={blocs.ref}
        className={`py-16 sm:py-20 px-6 sm:px-8 md:px-12 transition-all duration-700 ${blocs.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              title: 'Sélection & éditorialisation',
              text: 'Une offre volontairement limitée, expliquée, avec des preuves : ateliers, matières, fabrication, savoir-faire.',
            },
            {
              title: 'Transparence avant storytelling',
              text: 'Nous mettons en avant ce qui est vérifiable : origine, étapes de production, sourcing, engagements concrets.',
            },
            {
              title: 'Relation durable',
              text: 'Un partenariat construit sur le long terme : cohérence de la marque, qualité de service et confiance.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 border border-[#e8e8e8] shadow-sm hover:shadow-lg hover:border-monsart-night/15 transition-all duration-300"
            >
              <h2 className="font-display text-lg text-monsart-night font-medium mb-2 sm:mb-3">
                {item.title}
              </h2>
              <p className="text-[#555] text-sm leading-relaxed font-light">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="candidature"
        ref={form.ref}
        className={`py-16 sm:py-20 px-6 sm:px-8 md:px-12 bg-monsart-night text-white transition-all duration-700 ${form.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-xl sm:text-2xl text-white mb-2 font-medium tracking-tight text-center">
            Candidature partenaire
          </h2>
          <p className="text-white/70 font-light text-sm sm:text-base mb-8 text-center">
            Envoyez-nous quelques informations : nous reviendrons vers vous rapidement.
          </p>

          {sent ? (
            <div className="p-6 border border-white/30 bg-white/5 text-white text-center">
              <p className="font-medium mb-1">Email prêt à être envoyé</p>
              <p className="text-sm font-light text-white/80">
                Votre client de messagerie va s’ouvrir avec le message pré-rempli.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-white/90 mb-2">Marque / Atelier</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  required
                  value={data.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="Nom de la marque"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-white/90 mb-2">Contact</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={data.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="Prénom / Nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={data.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="contact@marque.fr"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-white/90 mb-2">Site (optionnel)</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-white/90 mb-2">Catégorie (optionnel)</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                    placeholder="Prêt-à-porter, maroquinerie…"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={data.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors resize-y min-h-[140px]"
                  placeholder="Décrivez votre marque, vos ateliers, vos matières, vos preuves (certifications, traçabilité, etc.)."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-white text-monsart-night text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-300 border border-white"
              >
                Envoyer ma candidature
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-[#888] text-sm font-light">
        © Maison Monsart
      </footer>
    </div>
  )
}

