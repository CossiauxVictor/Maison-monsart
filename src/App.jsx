import { useEffect, useRef, useState } from 'react'
import logoSrc from './assets/logo.svg'

const CONTACT_EMAIL = 'contact@maisonmonsart.fr'

// Image hero : public/image/Atilise couture.png
const HERO_IMAGE = '/image/Atilise%20couture.png'

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function App() {
  const hero = useFadeIn(0.2)
  const constat = useFadeIn(0.15)
  const newsletter = useFadeIn(0.15)
  const positionnement = useFadeIn(0.1)
  const role = useFadeIn(0.1)
  const engagements = useFadeIn(0.1)
  const finale = useFadeIn(0.1)

  const [heroVisible, setHeroVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [formSent, setFormSent] = useState(false)
  const [newsletterSent, setNewsletterSent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const subj = subject.trim() || 'Contact Maison Monsart'
    const body = `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setFormSent(true)
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      const body = `Inscription newsletter : ${newsletterEmail.trim()}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Inscription newsletter')}&body=${encodeURIComponent(body)}`
      setNewsletterSent(true)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Nav minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-monsart-night/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between h-14 sm:h-16">
          <a href="#" className="flex items-center gap-2 text-white font-display font-medium tracking-tight">
            <img src={logoSrc} alt="" className="h-16 w-auto object-contain" aria-hidden />
          </a>
          <div className="flex items-center gap-6 text-sm font-light text-white/90">
            <a href="#approche" className="hover:text-white transition-colors">Notre approche</a>
            <a href="#newsletter" className="hover:text-white transition-colors">Newsletter</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* 1. Hero : image en fond, texte centré par-dessus */}
      <header
        ref={hero.ref}
        className={`relative min-h-[90vh] flex flex-col justify-center items-center text-center pt-20 overflow-hidden transition-all duration-700 ${(hero.visible || heroVisible) ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Image en plein écran */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Voile sombre pour lisibilité du texte */}
        <div className="absolute inset-0 z-[1] bg-monsart-night/60" aria-hidden />
        {/* Contenu centré par-dessus */}
        <div className="relative z-10 px-6 sm:px-8 md:px-12 py-16 w-full max-w-2xl mx-auto">
          <img
            src={logoSrc}
            alt="Maison Monsart"
            className="h-36 w-auto mb-8 mx-auto max-w-full object-contain"
          />
          <h1 className="sr-only">Maison Monsart</h1>
          <p className="text-lg sm:text-xl text-white font-light mb-6">
            Une sélection exigeante du Made in France.
          </p>
          <p className="text-base sm:text-lg text-white/95 font-light leading-relaxed mb-10">
            Nous ne vendons pas plus.<br />
            Nous sélectionnons mieux.
          </p>
          <a
            href="#newsletter"
            className="inline-block border border-white/70 px-6 py-3 text-sm font-medium tracking-wide text-white hover:bg-white/15 transition-colors duration-300"
          >
            Rester informé
          </a>
        </div>
      </header>

      {/* 2. Notre constat */}
      <section
        id="approche"
        ref={constat.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 transition-all duration-700 ${constat.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-monsart-night mb-12 font-medium tracking-tight border-b border-monsart-night/20 pb-4 inline-block">
            Notre constat
          </h2>
          <div className="space-y-6 text-[#333] leading-relaxed font-light">
            <p>
              Le Made in France est devenu un prérequis. Pourtant la confiance des clients exigeants s’érode : discours flous, greenwashing, marketplaces généralistes sans exigence éditoriale.
            </p>
            <p>
              La valeur ne réside ni dans l’abondance de l’offre ni dans le marketing démonstratif, mais dans la capacité à sélectionner, prouver et expliquer.
            </p>
            <p>
              Le principal frein n’est pas le prix, c’est le doute : sur l’origine réelle, sur la sincérité du discours, sur la cohérence entre promesse et réalité. Le vrai luxe aujourd’hui est la clarté.
            </p>
            <p>
              Aucun acteur ne combine aujourd’hui pleinement marketplace, premium, Made in France et éditorialisation forte. Cette absence crée une opportunité claire.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        ref={newsletter.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-[#f8f8f8] transition-all duration-700 ${newsletter.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-monsart-night mb-4 font-medium tracking-tight border-b border-monsart-night/20 pb-4 inline-block">
            Newsletter
          </h2>
          <p className="text-[#555] font-light leading-relaxed mb-8">
            Restez informé de notre actualité, de nos sélections et de l’évolution de Maison Monsart.
          </p>
          {newsletterSent ? (
            <div className="p-6 border border-monsart-night/20 bg-white text-monsart-night text-center">
              <p className="font-medium mb-1">Demande envoyée</p>
              <p className="text-sm font-light text-[#555]">Votre client de messagerie va s’ouvrir pour confirmer votre inscription.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                placeholder="votre@email.fr"
                className="flex-1 px-4 py-3 border border-[#e0e0e0] bg-white text-[#333] font-light focus:outline-none focus:border-monsart-night/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-monsart-night text-white text-sm font-medium tracking-wide hover:bg-monsart-night/90 transition-colors duration-300 border border-monsart-night"
              >
                S’inscrire
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 3. Notre positionnement */}
      <section
        ref={positionnement.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-[#f8f8f8] transition-all duration-700 ${positionnement.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-monsart-night mb-12 sm:mb-16 font-medium tracking-tight border-b border-monsart-night/20 pb-4 inline-block">
            Notre positionnement
          </h2>

          <div className="grid lg:grid-cols-[1fr,minmax(320px,420px)] gap-10 lg:gap-14 items-start">
            {/* Cartes à gauche */}
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 order-2 lg:order-1">
              {[
                { title: 'Marketplace curatée, pas exhaustive', text: 'Nous priorisons une sélection déjà pensée pour eux. 5 à 8 marques minimum, critères stricts et visibles, offre volontairement limitée.' },
                { title: 'Preuve et transparence au centre', text: 'Le prix premium n’a de valeur que s’il est justifié et compris. Fiches détaillées, ateliers, matières et fabrication mis en avant. Ton pédagogique et factuel.' },
                { title: 'Expérience premium sobre', text: 'Rassurante et lisible, jamais démonstrative. Peu de produits mais très bien présentés. Aucune pression commerciale.' },
                { title: 'Une maison, pas un vendeur de masse', text: 'Nous nous positionnons comme curateur exigeant. La valeur repose sur la crédibilité, la fidélité et la recommandation, pas sur le volume.' },
                { title: 'Crédibilité avant scalabilité', text: 'Cohérence avant vitesse. Sélection avant exhaustivité. Nous validons d’abord la proposition de valeur.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 sm:p-8 border border-[#e8e8e8] shadow-sm hover:shadow-lg hover:border-monsart-night/15 transition-all duration-300"
                >
                  <h3 className="font-display text-lg text-monsart-night font-medium mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed font-light">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Image à droite */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-white shadow-xl border border-[#e8e8e8]">
                <div className="absolute inset-0 ring-1 ring-inset ring-monsart-night/5 pointer-events-none" aria-hidden />
                <img
                  src="/image/Vetement.png"
                  alt="Vêtement Maison Monsart"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Notre rôle */}
      <section
        ref={role.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-white transition-all duration-700 ${role.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-monsart-night mb-10 font-medium tracking-tight border-b border-monsart-night/20 pb-4 inline-block">
            Un tiers de confiance
          </h2>
          <p className="text-[#333] leading-relaxed font-light mb-6">
            La stratégie repose sur une posture assumée de tiers de confiance : curateur exigeant plutôt qu’intermédiaire commercial. Maison Monsart agit comme une maison au sens noble :
          </p>
          <ul className="space-y-4 text-[#333] font-light">
            <li className="flex gap-3">
              <span className="text-monsart-night font-medium">—</span>
              Nous sélectionnons
            </li>
            <li className="flex gap-3">
              <span className="text-monsart-night font-medium">—</span>
              Nous expliquons
            </li>
            <li className="flex gap-3">
              <span className="text-monsart-night font-medium">—</span>
              Nous justifions
            </li>
            <li className="flex gap-3">
              <span className="text-monsart-night font-medium">—</span>
              Nous assumons nos choix
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Nos engagements */}
      <section
        ref={engagements.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-[#f8f8f8] transition-all duration-700 ${engagements.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-monsart-night mb-12 sm:mb-16 font-medium tracking-tight border-b border-monsart-night/20 pb-4 inline-block">
            Nos engagements
          </h2>

          <div className="grid lg:grid-cols-[minmax(280px,380px),1fr] gap-10 lg:gap-14 items-start">
            {/* Image à gauche */}
            <div className="order-1 lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-white shadow-xl border border-[#e8e8e8]">
                <div className="absolute inset-0 ring-1 ring-inset ring-monsart-night/5 pointer-events-none" aria-hidden />
                <img
                  src="/image/Jean.png"
                  alt="Jean Maison Monsart"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>

            {/* Cartes à droite */}
            <div className="order-2 grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                'Sélection avant volume',
                'Transparence avant storytelling',
                'Cohérence avant croissance',
                'Qualité avant rotation',
                'Relation durable avant conversion rapide',
              ].map((line, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 px-5 bg-white border border-[#eee] shadow-sm hover:shadow-md hover:border-monsart-night/15 transition-all duration-300"
                >
                  <span className="text-monsart-night font-display text-lg font-medium shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[#333] font-light pt-0.5">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section finale + Contact */}
      <section
        id="contact"
        ref={finale.ref}
        className={`py-24 sm:py-32 px-6 sm:px-8 md:px-12 bg-monsart-night text-white transition-all duration-700 ${finale.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-6 tracking-tight">
            Moins de marques.<br />
            Plus d’exigence.<br />
            Plus de confiance.
          </p>
          <p className="text-white/80 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Un MVP conçu comme preuve de sérieux et de cohérence. Les fondations d’un modèle extensible, sans jamais sacrifier l’exigence éditoriale ni la sincérité qui constituent le cœur de notre proposition.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-xl sm:text-2xl text-white mb-2 font-medium tracking-tight text-center">
            Nous contacter
          </h2>
          <p className="text-white/70 font-light text-sm sm:text-base mb-8 text-center">
            Une question, un partenariat ou une demande d’information ?
          </p>
          {formSent ? (
            <div className="p-6 border border-white/30 bg-white/5 text-white text-center">
              <p className="font-medium mb-1">Message préparé</p>
              <p className="text-sm font-light text-white/80">Votre client de messagerie va s’ouvrir avec le message pré-rempli. Il vous suffit d’envoyer l’email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="votre@email.fr"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">Sujet <span className="font-light text-white/50">(optionnel)</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="Objet de votre message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/5 text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 transition-colors resize-y min-h-[120px]"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-white text-monsart-night text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-300 border border-white"
              >
                Envoyer
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
