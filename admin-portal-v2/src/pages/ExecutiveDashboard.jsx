import SidebarPanel from "../components/SidebarPanel.jsx";
import { statusDistribution, statCards, bottleneckData } from "../data/mockData.js";
import "./ExecutiveDashboard.css";

const maxBottleneck = Math.max(...bottleneckData.map((d) => d.total));

function ClearanceArt() {
  return (
    <div className="clearance-art">
      <div className="clearance-paper clearance-paper-1" />
      <div className="clearance-paper clearance-paper-2" />
      <div className="clearance-paper clearance-paper-3">
        <div className="clearance-paper-lines">
          <div className="clearance-paper-line" />
          <div className="clearance-paper-line clearance-paper-line-short" />
          <div className="clearance-paper-line" />
          <div className="clearance-paper-line clearance-paper-line-short" />
          <div className="clearance-paper-line" />
          <div className="clearance-paper-line" />
          <div className="clearance-paper-line clearance-paper-line-short" />
        </div>
        <div className="clearance-stamp">OK</div>
      </div>
    </div>
  );
}

export default function ExecutiveDashboard() {
  return (
    <div className="dashboard-layout">
      <SidebarPanel />

      <div className="dashboard-main">
        {/* Top row */}
        <div className="dashboard-top-row">
          {/* Status distribution card */}
          <div className="status-dist-card">
            <h3>Clearance Status Distribution</h3>
            <p className="status-dist-subtitle">Current term overview for all issued clearances</p>

            <div className="status-dist-graphic">
              <ClearanceArt />
              <div>
                <p className="status-dist-total-label">Total clearances</p>
                <p className="status-dist-total-num">1,240</p>
                <p className="status-dist-total-sub">Across all year levels</p>
              </div>
            </div>

            <div className="status-list">
              {statusDistribution.map((s) => (
                <div key={s.label} className="status-list-item">
                  <span className="status-dot" style={{ background: s.color }} />
                  <span className="status-name">{s.label}</span>
                  <div className="status-bar-wrap">
                    <div
                      className="status-bar-fill"
                      style={{ width: s.percent + "%", background: s.color }}
                    />
                  </div>
                  <span className="status-percent">{s.percent}%</span>
                  <span className="status-count">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards 2x2 */}
          <div className="stat-cards-grid">
            {statCards.map((c) => (
              <div
                key={c.id}
                className={"stat-card" + (c.border === "blue" ? " has-blue-border" : "")}
              >
                <span className="stat-card-label">{c.label}</span>
                <span className="stat-card-value">{c.value}</span>
                <span className="stat-card-sub">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck card */}
        <div className="bottleneck-card">
          <div className="bottleneck-header">
            <div className="bottleneck-header-left">
              <h3>Office Bottleneck Analysis</h3>
              <p className="bottleneck-subtitle">Unresolved clearance items per office</p>
            </div>
            <div className="bottleneck-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "var(--bar-green)" }} />
                Pending / Under Review
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "var(--bar-red)" }} />
                Deficiency
              </div>
            </div>
          </div>

          <div className="bottleneck-bars">
            {bottleneckData.map((d) => {
              const greenPct = (d.pending / maxBottleneck) * 100;
              const redPct = (d.deficiency / maxBottleneck) * 100;
              return (
                <div key={d.office} className="bottleneck-row">
                  <span className="bottleneck-office-name">{d.office}</span>
                  <div className="bottleneck-bar-wrap">
                    <div
                      className="bottleneck-bar-green"
                      style={{ width: greenPct + "%" }}
                    />
                    <div
                      className="bottleneck-bar-red"
                      style={{ width: redPct + "%" }}
                    />
                  </div>
                  <div className="bottleneck-row-right">
                    <span className="bottleneck-total">{d.total}</span>
                    {d.highest && (
                      <span className="bottleneck-badge">highest backlog</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
