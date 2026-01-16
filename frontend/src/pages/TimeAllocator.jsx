import { useEffect, useState } from 'react';
import api from '../api/api';
import TaskForm from '../components/TaskForm';
import Results from '../components/Results';

export default function TimeAllocator() {
  const [focusAreas, setFocusAreas] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [totalTime, setTotalTime] = useState({
    hours: '',
    minutes: ''
  });
  const [results, setResults] = useState(null);
  const [newFocusArea, setNewFocusArea] = useState('');

  const load = async () => {
    const [faRes, rRes] = await Promise.all([
      api.get('/focus-areas'),
      api.get('/responsibilities')
    ]);
    setFocusAreas(faRes.data);
    setResponsibilities(rRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* --------------------
     Focus Area Actions
  -------------------- */

  const addFocusArea = async e => {
    e.preventDefault();
    if (!newFocusArea) return;

    await api.post('/focus-areas', { name: newFocusArea });
    setNewFocusArea('');
    load();
  };

  const deleteFocusArea = async id => {
    await api.delete(`/focus-areas/${id}`);
    load();
  };

  /* --------------------
     Calculation
  -------------------- */

  const calculate = async () => {
    const hours = Number(totalTime.hours) || 0;
    const minutes = Number(totalTime.minutes) || 0;

    const totalHoursDecimal = hours + minutes / 60;
    if (totalHoursDecimal <= 0) return;

    try {
      const res = await api.post('/calculate', {
        totalHours: totalHoursDecimal
      });
      setResults(res.data);
    } catch (err) {
      console.error('Calculation failed:', err);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      {/* ======================
         HEADER
      ====================== */}
      <h1>Time Allocation MVP</h1>
      <p style={{ color: '#555', maxWidth: 700 }}>
       This tool helps you allocate time across core responsibilities.
Input your total amount of working hours, add focus areas and tasks, rate impact, priority, and difficulty, then press calculate.
The output will be a recommended distribution of how to use your time efficiently.
      </p>

      {/* Divider below header */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #e5e5e5',
          margin: '32px 0'
        }}
      />

      {/* ======================
         TIME YOU CAN ALLOCATE
      ====================== */}
      <section>
        <h2>Time You Can Allocate</h2>
        <p style={{ color: '#555', marginTop: 6, maxWidth: 700 }}>
          Enter the total amount of working time you can realistically allocate.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <div>
            <label>Hours</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 10"
              value={totalTime.hours}
              onChange={e =>
                setTotalTime({
                  ...totalTime,
                  hours: e.target.value
                })
              }
            />
          </div>

          <div>
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="e.g. 30"
              value={totalTime.minutes}
              onChange={e =>
                setTotalTime({
                  ...totalTime,
                  minutes: e.target.value
                })
              }
            />
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
          Time is calculated in hours (e.g. 1h 30m = 1.5 hours)
        </p>
      </section>

      {/* Divider */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #e5e5e5',
          margin: '32px 0'
        }}
      />

      {/* ======================
         FOCUS AREAS
      ====================== */}
      <section style={{ marginBottom: 32 }}>
        <h2>Focus Areas</h2>
        <p style={{ color: '#555', marginTop: 6, maxWidth: 700 }}>
          Add the responsibility buckets you want to allocate time across
          (company, role, project, or anything else).
        </p>

        <form onSubmit={addFocusArea} style={{ marginTop: 12 }}>
          <input
            placeholder="New focus area"
            value={newFocusArea}
            onChange={e => setNewFocusArea(e.target.value)}
          />
          <button>Add Focus Area</button>
        </form>
      </section>

      {/* ======================
         FOCUS AREA CARDS
      ====================== */}
      {focusAreas.map(fa => (
        <div
          key={fa._id}
          style={{
            border: '1px solid #ddd',
            padding: 16,
            marginTop: 20,
            borderRadius: 8
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3>{fa.name}</h3>
            <button onClick={() => deleteFocusArea(fa._id)}>
              Delete
            </button>
          </div>

          {/* TASK LIST */}
          <ul style={{ marginTop: 8 }}>
            {responsibilities
              .filter(r => r.focusAreaId?._id === fa._id)
              .map(r => (
                <li key={r._id}>
                  <strong>{r.title}</strong>{' '}
                  <span style={{ fontSize: 12, color: '#555' }}>
                    (Impact {r.impact}, Priority {r.priority}, Difficulty {r.difficulty ?? 3})
                  </span>
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={async () => {
                      await api.delete(`/responsibilities/${r._id}`);
                      load();
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>

          {/* ADD TASK */}
          <TaskForm focusAreaId={fa._id} onCreated={load} />
        </div>
      ))}

      {/* ======================
         CALCULATE
      ====================== */}
      <div style={{ marginTop: 32 }}>
        <button onClick={calculate}>Calculate</button>
      </div>

      {/* ======================
         RESULTS (ALWAYS VISIBLE)
      ====================== */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #e5e5e5',
          margin: '32px 0'
        }}
      />

      <section>
        <h2>Recommended Time Allocation</h2>
        <p style={{ color: '#555', marginTop: 6, maxWidth: 700 }}>
          Based on your inputs, this section shows a recommended distribution
          of how to allocate your time.
        </p>

        {results ? (
          <Results results={results} />
        ) : (
          <p style={{ fontSize: 12, color: '#999', marginTop: 12 }}>
            Enter your time, focus areas, and tasks, then click calculate to
            see results.
          </p>
        )}
      </section>
    </div>
  );
}

