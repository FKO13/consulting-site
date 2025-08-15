'use client'
import { PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const videos = [
  { title: "Как увеличить продажи на WB на 300%", desc: "Разбор реального кейса из нашей практики", duration: "12:45" },
  { title: "5 критических ошибок в карточках товаров", desc: "Что мешает вашему магазину расти", duration: "8:23" },
  { title: "Секреты работы с рекламой на маркетплейсах", desc: "Как снизить стоимость клика в 2 раза", duration: "15:17" }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-transparent relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-white"
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
              className="bg-transparent rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group border border-gray-700 p-4"
            >
              <div className="relative">
                <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
                  <PlayCircle className="w-16 h-16 text-blue-500 opacity-80 group-hover:opacity-100 transition" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition text-white">{video.title}</h3>
                <p className="text-gray-300">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition">
            Все видео (27+)
          </button>
        </div>
      </div>
    </section>
  )
}
