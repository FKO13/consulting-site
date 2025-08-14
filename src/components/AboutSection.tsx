'use client'

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-transparent">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Текст */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6 leading-snug">
            Мы создаём <span className="text-cyan-400">решения</span>, которые двигают ваш бизнес вперёд
          </h2>
          <p className="text-gray-300 mb-4">
            Наша команда — это синтез опыта в международном консалтинге, передовых технологий и глубокого понимания современных рынков.
            Мы работаем с компаниями от стартапов до корпораций, создавая стратегии, которые приносят измеримый результат.
          </p>
          <p className="text-gray-300 mb-4">
            Мы верим в силу аналитики, креативности и технологий. Наши проекты внедряются быстро, работают безотказно и повышают эффективность в реальном времени.
          </p>
          <p className="text-gray-300 font-semibold">
            <strong>Больше нуля</strong> — это не просто название. Это философия, которая гарантирует, что каждая инициатива, каждый проект и каждая стратегия дают нашим клиентам ощутимый рост.
          </p>
        </div>

        {/* Контейнер для 3D-анимации */}
        <div className="relative w-full h-80 md:h-[420px]">
          <div className="absolute inset-0">
            {/* Сам 3D блок рендерим в отдельном компоненте */}
            {/* Чтобы Canvas не был перекрыт, фон прозрачный */}
          </div>
        </div>
      </div>
    </section>
  )
}
