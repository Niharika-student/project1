import { useState } from "react";

function AddAchievement() {
  const [studentId, setStudentId] = useState("STU001");

  const [achievement, setAchievement] = useState({
    title: "",
    category: "Sports",
    level: "School",
    date: "",
    position: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAchievement({
      ...achievement,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/achievements/student/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(achievement)
        }
      );

      if (response.ok) {
        setMessage("Achievement added successfully");

        setAchievement({
          title: "",
          category: "Sports",
          level: "School",
          date: "",
          position: "",
          description: ""
        });
      } else {
        const errorText = await response.text();
        setMessage("Failed: " + errorText);
      }
    } catch (error) {
      setMessage("Backend connection error");
    }
  };

  return (
    <div>
      <h2>Add New Achievement</h2>
      <p>Record a new student achievement</p>

      <form onSubmit={handleSubmit}>
        <label>Student *</label>
        <br />
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="STU001">Test Student (STU001)</option>
          <option value="STU010">Test Student (STU010)</option>
          <option value="2400031788">niharika (2400031788)</option>
          <option value="admin1">rama (admin1)</option>
          <option value="sree">sree (sree)</option>
        </select>

        <br /><br />

        <label>Achievement Title *</label>
        <br />
        <input
          type="text"
          name="title"
          placeholder="e.g., First Place - State Science Fair"
          value={achievement.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Category *</label>
        <br />
        <select
          name="category"
          value={achievement.category}
          onChange={handleChange}
          required
        >
          <option value="Sports">Sports</option>
          <option value="Academic Competition">Academic Competition</option>
          <option value="Arts">Arts</option>
          <option value="Cultural">Cultural</option>
          <option value="Technical">Technical</option>
        </select>

        <br /><br />

        <label>Level *</label>
        <br />
        <select
          name="level"
          value={achievement.level}
          onChange={handleChange}
          required
        >
          <option value="School">School</option>
          <option value="College">College</option>
          <option value="State">State</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>

        <br /><br />

        <label>Date *</label>
        <br />
        <input
          type="date"
          name="date"
          value={achievement.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Position/Award *</label>
        <br />
        <input
          type="text"
          name="position"
          placeholder="e.g., 1st Place, Winner"
          value={achievement.position}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Description</label>
        <br />
        <textarea
          name="description"
          placeholder="Describe the achievement..."
          value={achievement.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Add Achievement</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default AddAchievement;