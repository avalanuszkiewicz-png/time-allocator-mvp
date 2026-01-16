export default function Results({ results }) {
  return (
    <div>
      {results.map((r, i) => {
        const hours = Math.floor(r.hours || 0);
        const minutes = Math.round(((r.hours || 0) % 1) * 60);

        return (
          <div key={r.focusAreaId} style={{ marginBottom: 12 }}>
            <strong>
              {i + 1}. {r.focusAreaName}
            </strong>{' '}
            — {hours}h {minutes}m
            <div style={{ fontSize: 12, color: '#555' }}>
              {r.reason}
            </div>
          </div>
        );
      })}
    </div>
  );
}

