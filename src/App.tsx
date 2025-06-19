import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Career from './pages/Career'
import Contact from './pages/Contact'
import AdminPanel from './admin/AdminPanel'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ueber-uns" element={<About />} />
                  <Route path="/leistungen" element={<Services />} />
                  <Route path="/projekte" element={<Projects />} />
                  <Route path="/karriere" element={<Career />} />
                  <Route path="/kontakt" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
