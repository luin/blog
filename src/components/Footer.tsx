import config from '@/lib/config'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="base-footer">
      <p className="greeting">
        <mark>Have a lovely day.</mark>
      </p>
      <p className="copyright">
        © {year}, <a href={config.site}>Zihua Li</a>.
      </p>
    </footer>
  )
}
