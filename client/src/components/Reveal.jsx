import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as = 'div', className = '', children, ...rest }) {
  const Component = as
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Component ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  )
}
