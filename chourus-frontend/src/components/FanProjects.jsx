export default function FanProjects() {
  const projects = [
    { id: 1, title: "Bracelet Swap – DFW", desc: "Meetup at Gate A, 6:30pm", by: "@lexi" },
    { id: 2, title: "Poster Collab", desc: "Share printable posters", by: "@mario" },
    { id: 3, title: "Carpool Thread", desc: "Share rides + split parking", by: "@jay" },
  ];

  return (
    <section className="panel fanprojects">
      <h3 style={{ marginTop: 0 }}>Fan Projects</h3>
      <div className="fp-grid">
        {projects.map(p => (
          <div key={p.id} className="fp-card">
            <h4 style={{ margin: "0 0 4px" }}>{p.title}</h4>
            <p className="muted" style={{ margin: 0 }}>{p.desc}</p>
            <p className="muted" style={{ margin: "6px 0 0" }}>by {p.by}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
