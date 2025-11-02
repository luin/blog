export function H1({ children, className = "" }) {
  return (
    <h1 className={`text-3xl sm:text-4xl font-bold mb-4 text-gray-900 print:text-[2em] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }) {
  return (
    <h2 className={`text-xl sm:text-2xl font-bold mb-4 text-gray-800 font-funnel-display print:text-[1.5em] ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }) {
  return (
    <h3 className={`text-lg sm:text-xl font-semibold mb-2 text-gray-800 print:text-[larger] ${className}`}>
      {children}
    </h3>
  );
}

export function P({ children, className = "", large = false }) {
  return (
    <p className={`${large ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} leading-relaxed text-gray-700 mb-4 last:mb-0 ${className}`}>
      {children}
    </p>
  );
}

export function Link({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline text-inherit hover:text-blue-600 transition-colors print:text-inherit print:no-underline ${className}`}
    >
      {children}
    </a>
  );
}

export function Section({ children, className = "" }) {
  return (
    <section className={`mb-8 sm:mb-10 ${className}`}>
      {children}
    </section>
  );
}
