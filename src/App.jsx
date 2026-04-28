import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AdminLayout from './admin/AdminLayout'
import AddTeacherForm from './admin/AddTeacherForm'
import AdminCourses from './admin/AdminCourses'
import AdminHome from './admin/AdminHome'
import AdminStudentApprovals from './admin/AdminStudentApprovals'
import AdminStudentDirectory from './admin/AdminStudentDirectory'
import AdminStudentRegistration from './admin/AdminStudentRegistration'
import AdminTeacherDirectory from './admin/AdminTeacherDirectory'
import StudentLayout from './student/StudentLayout'
import AssignedTeacher from './student/AssignedTeacher'
import CourseRegistration from './student/CourseRegistration'
import ImprovementSuggestions from './student/ImprovementSuggestions'
import StudentHome from './student/StudentHome'
import StudentShowcase from './student/StudentShowcase'
import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Signup from './pages/Signup'
import StudentLogin from './pages/StudentLogin'
import StudentRegistration from './pages/StudentRegistration'
import TeacherLogin from './pages/TeacherLogin'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={`/${role}/login`} replace />
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/student/register" element={<StudentRegistration />} />
      

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudentDirectory />} />
        <Route path="register-student" element={<AdminStudentRegistration />} />
        <Route path="teachers" element={<AdminTeacherDirectory />} />
        <Route path="approvals" element={<AdminStudentApprovals />} />
        <Route path="add-teacher" element={<AddTeacherForm />} />
        
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentHome />} />
        <Route path="showcase" element={<StudentShowcase />} />
        <Route path="assigned-teacher" element={<AssignedTeacher />} />
        <Route path="course-registration" element={<CourseRegistration />} />
        <Route path="improvement-suggestions" element={<ImprovementSuggestions />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
