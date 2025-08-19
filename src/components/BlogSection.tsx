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
              className="group bg-gray-900/20 backdrop-blur-sm rounded-2xl 
                         border border-transparent hover:border-blue-500/60
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]
                         transition duration-300 ease-in-out cursor-pointer flex flex-col overflow-hidden"
            >
              <div className="relative">
                {/* Заглушка под превью */}
                <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-indigo-900/40 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-blue-400 opacity-80 group-hover:opacity-100 transition animate-pulse" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition">
                  {video.title}
                </h3>
                <p className="text-gray-300 flex-1">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="inline-block px-8 py-4 font-semibold text-white rounded-full
                       bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md
                       hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
                       transition-all duration-300"
          >
            Все видео (27+)
          </button>
        </div>
      </div>
    </section>
  )
}
