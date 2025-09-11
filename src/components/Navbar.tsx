"use client"

import React, { useEffect, useState, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import ConsultationFormModal from "./ConsultationFormModal"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [themeColor] = useState<string>("var(--col-accent)")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const body = document.body
    body.style.overflow = isOpen ? "hidden" : ""
    return () => { body.style.overflow = "" }
  }, [isOpen])

  const navItems = [
    { name: "Услуги", href: "#services" },
    { name: "Кейсы", href: "#cases" },
    { name: "Процесс", href: "#process" },
    { name: "Блог", href: "#blog" },
    { name: "Контакты", href: "#contacts" },
  ]

  const handleNavClick = useCallback((href: string) => {
    const el = document.querySelector<HTMLElement>(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setIsOpen(false)
  }, [])

  const openModal = () => setIsModalOpen(true)

  /* ------------------ Hi-Tech Logo: анимированный плюс + кольцо ------------------ */
  function AnimatedLogo() {
    const prefersReduced = useReducedMotion()

    return (
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
        aria-label="Больше Нуля — на главную"
        className="group relative inline-flex items-center gap-3 md:gap-4 overflow-x-clip"
      >
        <div className="relative h-9 w-9 md:h-10 md:w-10">
          <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden role="img">
            <defs>
              <linearGradient id="gn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#44E6FF" />
                <stop offset="100%" stopColor="#7B5CFF" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* внешнее неоновое кольцо */}
            <circle
              cx="32" cy="32" r="20"
              fill="none"
              stroke="url(#gn)"
              strokeWidth="2.6"
              filter="url(#glow)"
              className={prefersReduced ? "" : "logo-ring"}
            />

            {/* пробегающий «блик» по кольцу */}
            <circle
              cx="32" cy="32" r="20"
              fill="none"
              stroke="#EAF8FF"
              strokeOpacity="0.9"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="18 120"
              className={prefersReduced ? "" : "logo-sweep"}
            />

            {/* ПЛЮС — базовый слой (градиентный, толще) */}
            <g className="plus-base" stroke="url(#gn)" strokeLinecap="round" strokeLinejoin="round">
              <line x1="32" y1="22.5" x2="32" y2="41.5" strokeWidth="4.4" />
              <line x1="22.5" y1="32" x2="41.5" y2="32" strokeWidth="4.4" />
            </g>

            {/* ПЛЮС — светлая «искра», бегущая по линиям */}
            <g className={prefersReduced ? "" : "plus-sweep"} strokeLinecap="round">
              <line x1="32" y1="22.5" x2="32" y2="41.5"
                    stroke="#FFFFFF" strokeOpacity=".95" strokeWidth="2.2"
                    strokeDasharray="10 28" />
              <line x1="22.5" y1="32" x2="41.5" y2="32"
                    stroke="#FFFFFF" strokeOpacity=".95" strokeWidth="2.2"
                    strokeDasharray="10 28" />
            </g>

            {/* лёгкое «дыхание» и свечение всего плюса */}
            <g className={prefersReduced ? "" : "logo-plus-pulse"}>
              <rect x="0" y="0" width="0" height="0" fill="none" />{/* «якорь» для CSS-класса */}
            </g>
          </svg>

          {/* отблеск при ховере */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(68,230,255,.35), transparent 60%)" }}
          />
        </div>

        {/* вордмарк */}
        <div className="leading-none select-none">
          <div
            className="text-[22px] md:text-[26px] font-extrabold tracking-wide"
            style={{
              backgroundImage: prefersReduced
                ? "linear-gradient(90deg, #EAF6FF, #FFFFFF)"
                : "linear-gradient(90deg, #44E6FF, #7B5CFF, #44E6FF)",
              backgroundSize: prefersReduced ? "100% 100%" : "220% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 18px rgba(68,230,255,.15)",
            }}
          >
            <motion.span
              initial={false}
              animate={prefersReduced ? { backgroundPositionX: "0%" } : { backgroundPositionX: ["0%","100%","0%"] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              Больше&nbsp;Нуля
            </motion.span>
          </div>

          <div className="mt-0.5 text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-white/60">
            маркетплейсы • рост • прибыль
          </div>
        </div>

        {/* локальные анимации SVG/CSS */}
        <style jsx>{`
          .logo-ring { animation: ringPulse 4.5s ease-in-out infinite; }
          .logo-sweep { transform-origin: 32px 32px; animation: sweepRotate 6s linear infinite; }

          /* бегущая искра по линиям плюса */
          .plus-sweep line {
            animation: plusDash 2.4s linear infinite;
          }

          /* лёгкое дыхание и свечение всего плюса */
          .logo-plus-pulse, .plus-base {
            transform-origin: 32px 32px;
            animation: plusBreath 3.6s ease-in-out infinite, plusGlow 3s ease-in-out infinite;
          }

          @keyframes ringPulse {
            0%,100% { opacity:.92; filter:drop-shadow(0 0 6px rgba(68,230,255,.35)); }
            50%     { opacity:1;   filter:drop-shadow(0 0 10px rgba(123,92,255,.45)); }
          }
          @keyframes sweepRotate {
            0% { transform: rotate(0deg);   stroke-dashoffset: 0; }
            100%{ transform: rotate(360deg); stroke-dashoffset: -138; }
          }
          @keyframes plusDash {
            0%   { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -38; }
          }
          @keyframes plusBreath {
            0%,100% { transform: scale(1); }
            50%     { transform: scale(1.06); }
          }
          @keyframes plusGlow {
            0%,100% { filter: drop-shadow(0 0 4px rgba(68,230,255,.25)); }
            50%     { filter: drop-shadow(0 0 8px rgba(123,92,255,.5)); }
          }

          @media (prefers-reduced-motion: reduce) {
            .logo-ring, .logo-sweep, .plus-sweep line, .logo-plus-pulse { animation: none !important; }
          }
        `}</style>
      </a>
    )
  }
  /* ------------------ end logo ------------------ */

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all ${
          scrolled ? "bg-black/70 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center overflow-x-clip">
          <div className="max-w-full overflow-x-clip">
            <AnimatedLogo />
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative text-gray-200 hover:text-white transition-colors duration-300
                           after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
                           after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500
                           hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={openModal}
            className="hidden md:block px-6 py-2 font-semibold text-white rounded-full
                       bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg cursor-pointer
                       transition-all duration-300 transform
                       hover:-translate-y-0.5 hover:scale-105
                       hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]
                       active:scale-95"
          >
            Консультация
          </button>

          <button
            className="md:hidden text-gray-200 z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Открыть меню"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl text-gray-200 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => { setIsOpen(false); openModal() }}
                className="px-8 py-3 font-semibold text-white rounded-full
                           bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg cursor-pointer
                           transition-all duration-300 transform
                           hover:-translate-y-0.5 hover:scale-105
                           hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]
                           active:scale-95"
              >
                Консультация
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ConsultationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        themeColor={themeColor}
      />
    </>
  )
}
