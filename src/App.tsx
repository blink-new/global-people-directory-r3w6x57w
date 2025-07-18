import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Homepage from '@/pages/Homepage'
import ProfileView from '@/pages/ProfileView'
import ProfileEdit from '@/pages/ProfileEdit'
import ProfileCreate from '@/pages/ProfileCreate'
import SearchResults from '@/pages/SearchResults'
import AdminDashboard from '@/pages/AdminDashboard'
import AuthPages from '@/pages/AuthPages'
import ReportForm from '@/pages/ReportForm'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile/create" element={<ProfileCreate />} />
            <Route path="/profile/:slug" element={<ProfileView />} />
            <Route path="/profile/:slug/edit" element={<ProfileEdit />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<AuthPages />} />
            <Route path="/report/:profileId" element={<ReportForm />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App