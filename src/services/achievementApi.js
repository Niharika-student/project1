import { apiUrl } from "../config/api";

const BASE_URL = apiUrl("/api/achievements");

export async function fetchAchievements() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createAchievement(form) {
  const studentId = (form.student_id || "").trim().toUpperCase();
  if (!studentId) throw new Error("Student ID is required");

  const res = await fetch(`${BASE_URL}/student/${studentId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: (form.title || "").trim(),
      category: form.category,
      level: form.level,
      date: form.date,
      description: (form.description || "").trim(),
      position_award: (form.position_award || "").trim(),
      student_name: (form.student_name || "").trim(),
      hours: form.hours ? Number(form.hours) : null,
      roll_number: form.roll_number ? (form.roll_number || "").trim() : null,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}