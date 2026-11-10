import { ClipboardList } from "lucide-react";
import "./StubPage.css";

export default function AuditLogs() {
  return (
    <div className="stub-page">
      <div className="stub-card">
        <div className="stub-icon">
          <ClipboardList size={26} />
        </div>
        <h2 className="stub-title">Audit Logs</h2>
        <p className="stub-sub">
          A timestamped record of all administrative actions — clearance issuances,
          approvals, rejections, and configuration changes.
        </p>
        <div className="stub-table-placeholder">
          <div className="stub-table-row-header" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
        </div>
      </div>
    </div>
  );
}
