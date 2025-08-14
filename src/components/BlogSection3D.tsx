'use client'
import { PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const videos = [
  {
    title: "Как увеличить продажи на WB на 300%",
    desc: "Разбор реального кейса из нашей практики",
    duration: "12:45"
  },
  {
    title: "5 критических ошибок в карточках товаров",
    desc: "Что мешает вашему магазину расти",
    duration: "8:23"
  },
  {
    title: "Секреты работы с рекламой на маркетплейсах",
    desc: "Как снизить стоимость клика в 2 раза",
    duration: "15:17"
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Видеоблог
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group"
            >
              <div className="relative">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-blue-600 opacity-80 group-hover:opacity-100 transition" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">{video.title}</h3>
                <p className="text-gray-600">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition">
            Все видео (27+)
          </button>
        </div>
      </div>
    </section>
  )
}