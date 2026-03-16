import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactWidgets from './components/ContactWidgets'
import Home from './pages/Home'
import BookDemo from './pages/BookDemo'
import ExploreSubjects from './pages/ExploreSubjects'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminGuard from './pages/admin/AdminGuard'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ManageJobs from './pages/admin/ManageJobs'
import ManageDemos from './pages/admin/ManageDemos'
import ManageSubjects from './pages/admin/ManageSubjects'
import './App.css'

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="app">
          {/* Public Navbar — hidden on /admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<Navbar />} />
          </Routes>

          <main className="main-content">
            <Routes>
              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminGuard>
                    <AdminLayout />
                  </AdminGuard>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="demos" element={<ManageDemos />} />
                <Route path="subjects" element={<ManageSubjects />} />
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/book-demo" element={<BookDemo />} />
              <Route path="/explore-subjects" element={<ExploreSubjects />} />
            </Routes>
          </main>

          {/* Public Footer — hidden on /admin routes */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={
              <>
                <Footer />
                <ContactWidgets />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AdminAuthProvider>
  )
}

export default App
