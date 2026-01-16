import { useState } from 'react';
import api from '../api/api';

export default function TaskForm({ focusAreaId, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    impact: 3,
    priority: 3,
    difficulty: 3
  });

  const clamp = value =>
    Math.max(1, Math.min(5, Number(value) || 1));

  const submit = async e => {
    e.preventDefault();
    if (!form.title) return;

    await api.post('/responsibilities', {
      ...form,
      focusAreaId
    });

    setForm({
      title: '',
      impact: 3,
      priority: 3,
      difficulty: 3
    });

    onCreated();
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 12 }}>
      {/* INPUT ROW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 120px 140px auto',
          gap: 12,
          alignItems: 'start'
        }}
      >
        {/* TASK */}
        <div>
          <label>Task</label>
          <input
            placeholder="e.g. Write Proposal "
            value={form.title}
            onChange={e =>
              setForm({ ...form, title: e.target.value })
            }
            style={{ width: '100%' }}
          />
        </div>

        {/* IMPACT */}
        <div>
          <label>Impact (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={form.impact}
            onChange={e =>
              setForm({
                ...form,
                impact: clamp(e.target.value)
              })
            }
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666' }}>
            How much does this materially move outcomes if completed?
          </div>
        </div>

        {/* PRIORITY */}
        <div>
          <label>Priority (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={form.priority}
            onChange={e =>
              setForm({
                ...form,
                priority: clamp(e.target.value)
              })
            }
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666' }}>
            How urgent is this relative to your other responsibilities?
          </div>
        </div>

        {/* DIFFICULTY */}
        <div>
          <label>Difficulty (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={form.difficulty}
            onChange={e =>
              setForm({
                ...form,
                difficulty: clamp(e.target.value)
              })
            }
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: 12, color: '#666' }}>
            How mentally or operationally demanding is this task?
          </div>
        </div>

        {/* ADD BUTTON */}
        <div style={{ paddingTop: 18 }}>
          <button type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}
