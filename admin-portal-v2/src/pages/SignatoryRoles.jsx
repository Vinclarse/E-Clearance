import { ShieldCheck } from "lucide-react";
import "./StubPage.css";

export default function SignatoryRoles() {
  return (
    <div className="stub-page">
      <div className="stub-card">
        <div className="stub-icon">
          <ShieldCheck size={26} />
        </div>
        <h2 className="stub-title">Signatory Roles</h2>
        <p className="stub-sub">
          Configure office roles and assign personnel authorized to approve or
          clear student clearance steps.
        </p>
        <div className="stub-table-placeholder">
          <div className="stub-table-row-header" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
          <div className="stub-table-row" />
        </div>
      </div>
    </div>
  );
}
