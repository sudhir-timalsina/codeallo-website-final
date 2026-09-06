import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import SiteLayout from './layouts/SiteLayout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminRoute from './routes/AdminRoute.jsx'
import LoadingState from './components/ui/LoadingState.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import ServicesIndex from './pages/ServicesIndex.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import CoursesIndex from './pages/CoursesIndex.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Schools from './pages/Schools.jsx'
import Teachers from './pages/Teachers.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'

// Code-split everything behind a login: none of this needs to be in the
// bundle a first-time, logged-out visitor downloads.
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses.jsx'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog.jsx'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects.jsx'))
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials.jsx'))
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads.jsx'))
const AdminEnrollments = lazy(() => import('./pages/admin/AdminEnrollments.jsx'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers.jsx'))

export default function App() {
  return (
    <Suspense fallback={<LoadingState label="Loading" />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/courses" element={<CoursesIndex />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />

          <Route path="/schools" element={<Schools />} />
          <Route path="/teachers" element={<Teachers />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
