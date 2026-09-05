import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactWidgets from './components/ContactWidgets'
import Home from './pages/Home'
import BookDemo from './pages/BookDemo'
import ExploreSubjects from './pages/ExploreSubjects'
import Jobs from './pages/Jobs'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { TeacherAuthProvider } from './context/TeacherAuthContext'
import AdminGuard from './pages/admin/AdminGuard'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ManageJobs from './pages/admin/ManageJobs'
import ManageDemos from './pages/admin/ManageDemos'
import ManageSubjects from './pages/admin/ManageSubjects'
import ManageTeachers from './pages/admin/ManageTeachers'
import './App.css'
import { useEffect } from 'react'
import { getFirebaseDatabase, isFirebaseConfigured } from './lib/firebase'
import { seedDemoDataIfEmpty } from './services/seedDemoData'
import TeacherRegister from './pages/teacher/TeacherRegister'
import TeacherLogin from './pages/teacher/TeacherLogin'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherGuard from './pages/teacher/TeacherGuard'
import TeacherProfile from './pages/teacher/TeacherProfile'

function App() {
  useEffect(() => {
    if (!isFirebaseConfigured()) return
    const db = getFirebaseDatabase()
    if (!db) return
    seedDemoDataIfEmpty(db).catch((err) => {
      console.error('Failed to seed demo data', err)
    })
  }, [])

  return (
    <AdminAuthProvider>
      <TeacherAuthProvider>
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
                <Route path="teachers" element={<ManageTeachers />} />
                </Route>

                {/* Teacher Auth Routes */}
                <Route path="/teacher/register" element={<TeacherRegister />} />
                <Route path="/teacher/login" element={<TeacherLogin />} />
                <Route
                  path="/teacher"
                  element={
                    <TeacherGuard>
                      <TeacherDashboard />
                    </TeacherGuard>
                  }
                />
                <Route
                  path="/teacher/profile"
                  element={
                    <TeacherGuard>
                      <TeacherProfile />
                    </TeacherGuard>
                  }
                />

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/book-demo" element={<BookDemo />} />
                <Route path="/explore-subjects" element={<ExploreSubjects />} />
              </Routes>
            </main>

            {/* Public Footer — hidden on /admin routes */}
            <Routes>
              <Route path="/admin/*" element={null} />
              <Route
                path="*"
                element={
                  <>
                    <Footer />
                    <ContactWidgets />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </TeacherAuthProvider>
    </AdminAuthProvider>
  )
}

export default App
