'use client'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { CASES } from '@/content/cases'

// Хелпер: определяем до 2-х бейджей на основе текста кейса
function deriveTags(caseItem: {
  title?: string
  problem?: string
  solution?: string
  result?: string
  actions?: string[]
  keywords?: string[]
  category?: string
  region?: string
}) {
  const text = [
    caseItem.title,
    caseItem.problem,
    caseItem.solution,
    caseItem.result,
    (caseItem.actions || []).join(' '),
    (caseItem.keywords || []).join(' '),
    caseItem.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const rules: { label: string; re: RegExp }[] = [
    { label: 'Реклама', re: /(реклам|ддр|кампан|ставк|ретаргет|биддер)/i },
    { label: 'Трафик', re: /(трафик|seo|семантик|ключев|атрибут|выдач|bsr|позици)/i },
    { label: 'Склад', re: /(склад|логист|fbs|fbo|3pl|доставк|fulfill)/i },
    { label: 'Контент', re: /(контент|фото|видео|галере|ugc|инфограф|визуал)/i },
    { label: 'Ценообразование', re: /(цена|марж|прайс|скидк|купон)/i },
    { label: 'Качество', re: /(возврат|брак|упаков|качест|рейтинг)/i },
    { label: 'Retention', re: /(ltv|повтор|удержан|retent|подписк|бонус)/i },
  ]

  const tags: string[] = []
  for (const r of rules) {
    if (r.re.test(text)) {
      tags.push(r.label)
      if (tags.length >= 2) break
    }
  }
  return tags.length ? tags : ['Общее']
}

export default function CasesSection() {
  const [visibleCount, setVisibleCount] = useState(6)

  const visibleCases = useMemo(
    () => CASES.slice(0, Math.min(visibleCount, CASES.length)),
    [visibleCount]
  )

  return (
    <section id="cases" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Кейсы клиентов
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleCases.map((caseItem, index) => {
            const tags = deriveTags(caseItem)
            return (
              <motion.div
                key={caseItem.slug ?? index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="
                  group bg-gray-900/20 p-6 rounded-2xl border border-transparent
                  hover:border-blue-500/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                  transition duration-300 ease-in-out cursor-pointer
                  flex flex-col h-full
                "
              >
                {/* Верх: бейджи слева, регион справа */}
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          px-2.5 py-1 text-xs font-medium rounded-full
                          bg-blue-500/10 text-blue-300 border border-blue-500/30
                          group-hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]
                          transition
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {caseItem.region && (
                    <span className="shrink-0 px-2.5 py-1 text-xs text-gray-200 rounded-full bg-white/5 border border-white/10">
                      {caseItem.region}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {caseItem.title}
                </h3>

                {/* Стабильные высоты, чтобы ничего не «гуляло» */}
                <p className="text-gray-300 mb-4 min-h-[72px] overflow-hidden">
                  {caseItem.problem ?? ''}
                </p>

                <p className="text-blue-400 font-medium mb-6 min-h-[48px] overflow-hidden">
                  {caseItem.result ?? ''}
                </p>

                {/* Акцентная линия внизу карточки (не кнопка, SEO-дружелюбно) */}
                <div
                  className="
                    mt-auto h-[2px] w-full rounded-full
                    bg-gradient-to-r from-blue-500/60 via-indigo-500/60 to-blue-500/60
                    opacity-60 group-hover:opacity-100 transition
                    shadow-[0_0_16px_rgba(99,102,241,0.45)]
                  "
                />
              </motion.div>
            )
          })}
        </div>

        {visibleCount < CASES.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((v) => v + 6)}
              className="
                inline-block px-8 py-4 font-semibold text-white rounded-full
                bg-gradient-to-r from-blue-500 to-indigo-600
                shadow-md transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg hover:brightness-110
              "
            >
              Показать ещё
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
