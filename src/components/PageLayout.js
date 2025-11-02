export default function PageLayout({ children, className = "" }) {
  return (
    <div className="bg-white">
      <main
        className={`
        mx-auto my-8 lg:my-10 
        bg-[#fffdf7] 
        border border-gray-200 
        p-6 sm:p-8 lg:p-10
        transition-all duration-300 
        hover:border-gray-300
        w-[95%] sm:w-[90%] lg:w-full
        max-w-[210mm]
        print:w-[210mm] print:max-w-[210mm]
        print:m-0 print:border-0 print:bg-white
        ${className}
      `}
      >
        {children}
      </main>
    </div>
  );
}
