import styles from './Hint.module.css'

interface HintProps {
  type?: 'info' | 'warning'
  title?: string
  children: React.ReactNode
}

export default function Hint({ type = 'info', title, children }: HintProps) {
  return (
    <div data-hint-type={type} className={styles.hint}>
      {title && <div className={styles.calloutTitle}>{title}</div>}
      {children}
    </div>
  )
}
