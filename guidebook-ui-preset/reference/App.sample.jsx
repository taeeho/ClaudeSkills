import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <HashRouter>
      <Nav title="사이트 제목" sub="부제" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer org="© 팀/조직" email="you@example.com" />
    </HashRouter>
  )
}
