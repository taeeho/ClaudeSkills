import { PageShell, Section, Steps, Step, Callout, Kbd, CodeBlock, CodeLine, Tabs, TabList, Tab, TabPane, OsBanner } from '../components/primitives.jsx'

export default function SamplePage() {
  return (
    <PageShell backTo="/" backLabel="홈으로">
      {/* 섹션 1: teal 톤 (일반 설명용) */}
      <Section id="intro" tone="teal" eyebrow="01 · 소개" title="이 페이지가 하는 일" desc="이 섹션의 한 줄 설명. 너무 길지 않게, 독자가 무엇을 배울지 먼저 말해주세요.">
        <Callout tone="info">섹션 첫 블록에 요약 박스 하나 두면 읽는 사람 친절해집니다.</Callout>
        <Steps>
          <Step n={1} title="첫 번째 단계">간단한 설명 한 줄.</Step>
          <Step n={2} title="두 번째 단계">
            <div>두 줄 이상이면 이렇게 내부 요소로. <Kbd>Ctrl</Kbd>+<Kbd>C</Kbd> 같은 키 표시도 가능.</div>
          </Step>
        </Steps>
      </Section>

      {/* 섹션 2: orange 톤 (주의·실습용) */}
      <Section id="hands-on" tone="orange" eyebrow="02 · 실습" title="실제로 해보기" desc="복사해 쓸 수 있는 명령이나 코드는 다크 박스로.">
        <OsBanner>macOS</OsBanner>
        <CodeBlock copyText="npm install">
          <CodeLine>npm install</CodeLine>
          <CodeLine>npm run dev</CodeLine>
        </CodeBlock>
        <Callout tone="warn">주의사항은 warn 톤으로 강조.</Callout>
      </Section>

      {/* 섹션 3: tabs */}
      <Section id="os-tabs" tone="teal" eyebrow="03 · OS별" title="OS별 안내가 필요하면 탭" desc="Tabs / TabList / Tab / TabPane 묶음으로.">
        <Tabs initial="mac">
          <TabList>
            <Tab id="mac">macOS</Tab>
            <Tab id="win">Windows</Tab>
          </TabList>
          <TabPane id="mac"><p className="text-[14px] text-inksoft">mac용 안내 내용.</p></TabPane>
          <TabPane id="win"><p className="text-[14px] text-inksoft">win용 안내 내용.</p></TabPane>
        </Tabs>
      </Section>
    </PageShell>
  )
}
