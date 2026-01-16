import { useState } from 'react';
import api from '../api/api';

export default function FocusAreaForm({ onCreated }) {
  const [name, setName] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!name) return;

    await api.post('/focus-areas', { name });
    setName('');
    onCreated();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="New focus area"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
