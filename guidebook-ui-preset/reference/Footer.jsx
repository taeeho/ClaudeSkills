export default function Footer({ org = '팀/조직', email, link }) {
  return (
    <footer className="max-w-[1200px] mx-auto px-5 sm:px-7 py-8 sm:py-10 pb-14 text-inkmuted text-[13px] flex flex-wrap justify-between items-center gap-3 border-t border-line mt-12">
      <div>© {org}</div>
      <div>
        {email && <a href={`mailto:${email}`} className="text-inksoft no-underline border-b border-dashed border-linestrong hover:text-accent hover:border-accent">{email}</a>}
        {email && link && <>&nbsp;·&nbsp;</>}
        {link && <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-inksoft no-underline border-b border-dashed border-linestrong hover:text-accent hover:border-accent">{link.label}</a>}
      </div>
    </footer>
  )
}
