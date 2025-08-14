'use client'
import { motion } from 'framer-motion'

const cases = [
  {
    title: "Детская одежда (Москва)",
    problem: "Низкая конверсия (1.2%) из-за плохих фото",
    solution: "Ребрендинг карточек + профессиональная съемка",
    result: "Рост с 2 млн до 7 млн за 4 месяца (+250%)"
  },
  {
    title: "Косметика (Казань)",
    problem: "Высокий ДРР (18%) из-за логистических ошибок",
    solution: "Оптимизация склада + пересмотр ценовой политики",
    result: "Снижение ДРР до 5%, прибыль +120%"
  },
  {
    title: "Электроника (Екатеринбург)",
    problem: "Потеря 40% трафика из-за неправильных тегов",
    solution: "SEO-оптимизация + переработка описаний",
    result: "Трафик x3, оборот с 5 млн до 15 млн"
  },
  {
    title: "Спорттовары (Новосибирск)",
    problem: "Низкий средний чек (1200₽)",
    solution: "Внедрение комплектов + кросс-продажи",
    result: "Средний чек 3400₽ (+183%)"
  },
  {
    title: "Домашний текстиль (Краснодар)",
    problem: "Сезонные просадки продаж",
    solution: "Разработка круглогодичного ассортимента",
    result: "Стабильный оборот 8-10 млн ежемесячно"
  }
]

export default function CasesSection() {
  return (
    <section id="cases" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Наши кейсы
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">{caseItem.title}</h3>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Проблема:</h4>
                  <p className="text-gray-600">{caseItem.problem}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Решение:</h4>
                  <p className="text-gray-600">{caseItem.solution}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-1">Результат:</h4>
                  <p className="font-bold text-blue-600">{caseItem.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
