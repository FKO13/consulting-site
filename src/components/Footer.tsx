export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-4">Больше нуля</h3>
          <p>Профессиональный аудит и консалтинг для Wildberries</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Услуги</h4>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-blue-400 transition">Платный аудит</a></li>
            <li><a href="#services" className="hover:text-blue-400 transition">Консалтинг PRO</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Контакты</h4>
          <p>info@bolshe-nulya.ru</p>
          <p>+7 (999) 123-45-67</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Соцсети</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition">Telegram</a>
            <a href="#" className="hover:text-blue-400 transition">WhatsApp</a>
            <a href="#" className="hover:text-blue-400 transition">YouTube</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-gray-800">
        <p>© {new Date().getFullYear()} Больше нуля. Все права защищены.</p>
      </div>
    </footer>
  )
}