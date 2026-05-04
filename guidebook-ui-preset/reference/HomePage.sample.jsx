import { Link } from 'react-router-dom'

const mainCards = [
  { to: '/section-a', num: 1, tone: 'orange', title: '섹션 A 제목', desc: '섹션 A의 한 줄 설명. 사용자가 이걸 읽고 바로 이해되도록.', tag: '1단계' },
  { to: '/section-b', num: 2, tone: 'teal',   title: '섹션 B 제목', desc: '섹션 B의 한 줄 설명.',                                    tag: '2단계' },
  { to: '/section-c', num: 3, tone: 'orange', title: '섹션 C 제목', desc: '섹션 C의 한 줄 설명.',                                    tag: '3단계' },
  { to: '/section-d', num: 4, tone: 'red',    title: '섹션 D 제목', desc: '섹션 D의 한 줄 설명.',                                    tag: '4단계' }
]

const optionalCards = [
  { to: '/optional-a', num: '+', tone: 'teal', title: '선택 항목 A', desc: '필요할 때만 보는 보조 항목.', tag: '선택' }
]

const toneClass = {
  orange: { tag: 'bg-accentsoft text-accent',    ring: 'hover:border-accent hover:bg-accentsoft/40' },
  teal:   { tag: 'bg-teal-soft text-teal',       ring: 'hover:border-teal hover:bg-teal-soft/50'    },
  red:    { tag: 'bg-[#FCE9E7] text-[#B4281E]',  ring: 'hover:border-[#B4281E] hover:bg-[#FCE9E7]/50' }
}

function Card({ c }) {
  return (
    <Link to={c.to}
      className={`group flex flex-col gap-3 bg-paper border border-line rounded-[18px] p-5 sm:p-6 no-underline text-ink shadow-sm2 transition
        ${toneClass[c.tone].ring} hover:-translate-y-0.5 hover:shadow-md2`}>
      <div className="flex items-center justify-between gap-2">
        <div className="w-10 h-10 rounded-[10px] bg-ink text-white grid place-items-center font-extrabold text-[15px] shadow-sm2">{c.num}</div>
        <span className={`text-[11px] font-bold tracking-[.06em] uppercase px-2 py-1 rounded-md ${toneClass[c.tone].tag}`}>{c.tag}</span>
      </div>
      <h3 className="text-[18px] sm:text-[19px] font-bold tracking-[-0.01em] m-0 mt-1">{c.title}</h3>
      <p className="text-[13.5px] text-inksoft m-0 leading-relaxed">{c.desc}</p>
      <div className="mt-auto pt-3 flex items-center justify-between text-[13px] font-semibold text-inksoft group-hover:text-accent transition">
        <span>열어보기</span>
        <span className="text-inkmuted group-hover:text-accent group-hover:translate-x-0.5 transition">→</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-[.04em] text-accent bg-accentsoft px-3 py-1.5 rounded-full uppercase">
          에이브로우 · 카테고리
        </span>
        <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-[-0.025em] mt-4 mb-4 font-extrabold max-w-[880px]">
          한 줄짜리 제목을 여기에<br />
          <span className="grad-text">강조하고 싶은 부분</span>
        </h1>
        <p className="text-[15px] sm:text-[17px] text-inksoft max-w-[680px]">
          사이트 성격을 설명하는 리드 문단. <b>1 → 2 → 3 → 4 순서</b>로 읽는 가이드라는 톤을 살려주세요.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-5 sm:px-7 mb-10">
        <h2 className="text-[13.5px] font-bold text-inksoft tracking-[.1em] uppercase mb-3">나는 어느 쪽?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 sm:p-6 bg-teal-soft border border-[#B7DDD5] rounded-r2">
            <span className="inline-block text-[11px] font-bold tracking-[.08em] uppercase text-teal bg-paper px-2 py-0.5 rounded mb-2">메인 대상</span>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-ink mb-1.5">대부분의 사용자용 경로</h3>
            <p className="text-[13.5px] sm:text-[14px] text-inksoft m-0 leading-relaxed">대부분 사용자는 이 흐름을 따라가세요.</p>
          </div>
          <div className="p-5 sm:p-6 bg-accentsoft border border-[#F3CBA9] rounded-r2">
            <span className="inline-block text-[11px] font-bold tracking-[.08em] uppercase text-accent bg-paper px-2 py-0.5 rounded mb-2">파워유저</span>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-ink mb-1.5">추가 학습용 경로</h3>
            <p className="text-[13.5px] sm:text-[14px] text-inksoft m-0 leading-relaxed">필요할 때만 아래 선택 섹션 참고.</p>
          </div>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-5 sm:px-7 pb-10">
        <h2 className="text-[13.5px] font-bold text-inksoft tracking-[.1em] uppercase mb-4">이 순서대로 보세요</h2>
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {mainCards.map(c => <Card key={c.to} c={c} />)}
        </div>
      </main>

      <section className="max-w-[1100px] mx-auto px-5 sm:px-7 pb-16">
        <h2 className="text-[13.5px] font-bold text-inksoft tracking-[.1em] uppercase mb-4">선택 · 필요할 때만</h2>
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {optionalCards.map(c => <Card key={c.to} c={c} />)}
        </div>
      </section>
    </>
  )
}
