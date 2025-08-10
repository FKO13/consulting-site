import ServicesGrid from '@/components/ServicesGrid'

export default function Services() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Наши решения
        </h2>
        <ServicesGrid />
      </div>
    </section>
  )
}