import { useState } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [plans, setPlans] = useState([]);

  const addPlan = () => {
    if (!subject || !time || !topic) return;

    setPlans([
      ...plans,
      
      {
        id: Date.now(),
        subject,
        time,
        topic,
        completed: false,
      },
    ]);

    setSubject("");
    setTime("");
    setTopic("");
  };

  const toggleComplete = (id) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id
          ? { ...plan, completed: !plan.completed }
          : plan
      )
    );
  };

  const removePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="app">
      <h1>📚 Study Planner</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time (e.g. 1.5 hrs)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button onClick={addPlan}>Add Plan</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Time</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr
              key={plan.id}
              className={plan.completed ? "completed" : ""}
            >
              <td>{plan.subject}</td>
              <td>{plan.time}</td>
              <td>{plan.topic}</td>
              <td>
                <button onClick={() => toggleComplete(plan.id)}>
                  {plan.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="remove"
                  onClick={() => removePlan(plan.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        
        </tbody>
      </table>
    </div>
  );
}

export default App;
