/**
 * App Root
 * --------
 * Handles routing and top-level navigation.
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TimeAllocator from './pages/TimeAllocator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/allocate" />} />
        <Route path="/allocate" element={<TimeAllocator />} />
      </Routes>
    </BrowserRouter>
  );
}
