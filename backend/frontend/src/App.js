import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({ name: "", course: "" });
  const [students, setStudents] = useState([]);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", course: "" });
    fetchStudents();
  };

  // fetch data
  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      <h2>Students List</h2>

      {students.map((s, index) => (
        <div key={index}>
          <p>{s.name} - {s.course}</p>
        </div>
      ))}
    </div>
  );
}

export default App;