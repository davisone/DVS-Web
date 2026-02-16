import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'intro'
}

const sizeConfig = {
  sm: { width: 40, height: 40, className: 'w-10 h-10' },
  md: { width: 48, height: 48, className: 'w-12 h-12' },
  lg: { width: 56, height: 56, className: 'w-14 h-14' },
  xl: { width: 72, height: 72, className: 'w-18 h-18' },
  intro: { width: 160, height: 160, className: 'w-32 h-32 md:w-40 md:h-40' },
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const config = sizeConfig[size]

  return (
    <div className={cn('relative', config.className, className)}>
      <Image
        src="/images/logo-final.png"
        alt="DVS Web"
        width={config.width}
        height={config.height}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
