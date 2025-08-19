'use client'

export default function AboutSection() {
  return (
    <section className="relative py-28 bg-transparent">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Текст */}
        <div className="max-w-xl mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-snug text-white">
            Мы создаём <span className="text-cyan-400">решения</span>, которые двигают ваш бизнес вперёд
          </h2>

          <p className="text-gray-300 mb-5 text-lg">
            Наша команда — это синтез опыта в международном консалтинге, передовых технологий и глубокого понимания современных рынков.
            Мы работаем с компаниями от стартапов до корпораций, создавая стратегии, которые приносят измеримый результат.
          </p>

          <p className="text-gray-300 mb-5 text-lg">
            Мы верим в силу аналитики, креативности и технологий. Наши проекты внедряются быстро, работают безотказно и повышают эффективность в реальном времени.
          </p>

          <p className="text-gray-100 font-semibold text-lg">
            <strong>Больше нуля</strong> — это не просто название. Это философия, которая гарантирует, что каждая инициатива, каждый проект и каждая стратегия дают нашим клиентам ощутимый рост.
          </p>
        </div>

        {/* Фото/изображение (плейсхолдер) */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gray-800/40 border border-gray-700 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Скоро тут будет фото нашей команды</span>
        </div>
      </div>
    </section>
  )
}
