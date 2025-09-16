import { ArrowRight } from 'lucide-react'

export default function CTAButton({ 
  text = 'Получить консультацию',
  onClick = () => {}
}: {
  text?: string
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className="btn-glow bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold relative overflow-hidden group"
    >
      <span className="relative z-10 flex items-center gap-2">
        {text}
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  )
}