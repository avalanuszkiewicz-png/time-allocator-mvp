import { useState } from 'react';
import api from '../api/api';

export default function ResponsibilityForm({
  focusAreas,
  onCreated
}) {
  const [form, setForm] = useState({
    focusAreaId: '',
    title: '',
    impact: 3,
    priority: 3,
    effort: 2
  });

  const submit = async e => {
    e.preventDefault();
    if (!form.focusAreaId || !form.title) return;

    await api.post('/responsibilities', form);
    onCreated();

    setForm({
      focusAreaId: '',
      title: '',
      impact: 3,
      priority: 3,
      effort: 2
    });
  };

  return (
    <form onSubmit={submit}>
      <select
        value={form.focusAreaId}
        onChange={e =>
          setForm({ ...form, focusAreaId: e.target.value })
        }
      >
        <option value="">Select focus area</option>
        {focusAreas.map(fa => (
          <option key={fa._id} value={fa._id}>
            {fa.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Task"
        value={form.title}
        onChange={e =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <label>Impact</label>
      <input
        type="number"
        min="1"
        max="5"
        value={form.impact}
        onChange={e =>
          setForm({ ...form, impact: +e.target.value })
        }
      />

      <label>Priority</label>
      <input
        type="number"
        min="1"
        max="5"
        value={form.priority}
        onChange={e =>
          setForm({ ...form, priority: +e.target.value })
        }
      />

      <button>Add Task</button>
    </form>
  );
}
