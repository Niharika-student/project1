import { apiUrl } from '../config/api'

const BASE_URL = apiUrl('/api/courses')

export async function fetchCourses() {
  try {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  } catch (error) {
    console.warn('Failed to fetch courses from backend:', error.message)
    return []
  }
}

export async function createCourse(course) {
  const payload = {
    name: course.name || '',
    category: course.category || 'Academic',
    instructor: course.instructor || '',
  }

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  } catch (error) {
    throw new Error(error.message || 'Failed to create course')
  }
}
