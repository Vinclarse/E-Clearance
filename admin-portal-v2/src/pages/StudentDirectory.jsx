import { Users } from "lucide-react";
import "./StubPage.css";

export default function StudentDirectory() {
  return (
    <div className="stub-page">
      <div className="stub-card">
        <div className="stub-icon">
          <Users size={26} />
        </div>
        <h2 className="stub-title">Student Directory</h2>
        <p className="stub-sub">
          Search, filter, and manage all enrolled students. View individual clearance
          progress and status across all offices.
        </p>
        <div className="stub-table-placeholder">
          <div className="stub-table-row-header" />
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
