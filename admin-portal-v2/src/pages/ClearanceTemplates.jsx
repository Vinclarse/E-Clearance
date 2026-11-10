import { useState } from "react";
import { Lock, ArrowUpDown, Upload } from "lucide-react";
import { templateSteps, yearBreakdown } from "../data/mockData.js";
import "./ClearanceTemplates.css";

const maxYear = Math.max(...yearBreakdown.map((y) => y.count));

export default function ClearanceTemplates() {
  const [title, setTitle] = useState("Semestral Clearance");
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [semester, setSemester] = useState("2nd Semester");
  const [yearLevels, setYearLevels] = useState({
    "1st Year": true,
    "2nd Year": true,
    "3rd Year": true,
    "4th Year": true,
  });

  const toggleYear = (level) => {
    setYearLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  return (
    <div className="templates-page">
      {/* Template Configuration Card */}
      <div className="template-config-card">
        <div className="template-config-header">
          <div className="template-config-title-row">
            <h2>Template Configuration</h2>
            <span className="draft-badge">Draft</span>
          </div>
          <button className="btn-outline">Save Draft</button>
        </div>

        <div className="template-form-row">
          <div className="template-form-field">
            <label>Clearance Title</label>
            <input
              type="text"
              className="template-text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="template-form-field">
            <label>Academic Year</label>
            <select
              className="template-select"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            >
              <option value="2026-2027">2026–2027</option>
              <option value="2025-2026">2025–2026</option>
              <option value="2027-2028">2027–2028</option>
            </select>
          </div>

          <div className="template-form-field">
            <label>Semester</label>
            <select
              className="template-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className="year-levels-field">
            <label>Target Student Year Levels</label>
            <div className="year-checkboxes">
              {Object.keys(yearLevels).map((level) => (
                <label key={level} className="year-checkbox-label">
                  <input
                    type="checkbox"
                    checked={yearLevels[level]}
                    onChange={() => toggleYear(level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="templates-two-col">
        {/* Sequence Builder */}
        <div className="sequence-builder-card">
          <div className="sequence-builder-header">
            <h3>Sequential Requirement Builder</h3>
            <button className="reorder-btn">
              <ArrowUpDown size={12} />
              Reorder steps
            </button>
          </div>
          <p className="sequence-subtitle">
            Each step unlocks only after the one before it is cleared.
          </p>

          <div className="sequence-steps">
            {templateSteps.map((step) => (
              <div key={step.id} className="sequence-step">
                <span className="drag-handle">?</span>
                <div className="step-num-circle">{step.id}</div>
                <div className="step-info">
                  <p className="step-title">{step.title}</p>
                  <p className="step-desc">{step.description}</p>
                  <div className="step-role-row">
                    <span className="step-role-label">Authorizing Role:</span>
                    <span className="step-role-pill">{step.role}</span>
                  </div>
                </div>
                <div className="step-note">
                  {step.locked && <Lock size={12} className="lock-icon" />}
                  <span>{step.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sequence-footer">
            <span className="sequence-count">
              <span className="check-icon">?</span>
              6 of 6 steps configured
            </span>
            <button className="btn-dark">Save Sequence</button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="preview-card">
          <p className="preview-ready-label">Ready to Issue</p>
          <h3 className="preview-title">{title}</h3>
          <p className="preview-year">{academicYear} &middot; {semester}</p>

          <div className="preview-divider" />

          <div className="preview-info-list">
            <div className="preview-info-row">
              <span className="preview-info-label">Approval chain:</span>
              <span className="preview-info-value">6 sequential steps</span>
            </div>
            <div className="preview-info-row">
              <span className="preview-info-label">Target yr levels:</span>
              <span className="preview-info-value">1st to 4th Year</span>
            </div>
            <div className="preview-info-row">
              <span className="preview-info-label">Template status:</span>
              <span className="preview-info-value">Draft</span>
            </div>
          </div>

          <p className="preview-eligible-num">1,240</p>
          <p className="preview-eligible-label">eligible students</p>

          <div className="preview-year-bars">
            {yearBreakdown.map((yr) => (
              <div key={yr.label} className="preview-year-row">
                <span className="preview-year-name">{yr.label}</span>
                <div className="preview-year-bar-wrap">
                  <div
                    className="preview-year-bar-fill"
                    style={{
                      width: ((yr.count / maxYear) * 100) + "%",
                      background: yr.color,
                    }}
                  />
                </div>
                <span className="preview-year-count">{yr.count}</span>
              </div>
            ))}
          </div>

          <button className="preview-issue-btn">
            <Upload size={14} />
            Issue Clearance to Students
          </button>
          <p className="preview-note">
            One clearance record is created for every eligible student, and each student
            is notified automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
