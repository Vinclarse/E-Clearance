import { useEffect, useState } from 'react'
import arrowRight from './assets/arrow-right.svg'
import dashboardIllustration from './assets/clearance-dashboard-illustration.svg'
import eyeIcon from './assets/eye.png'
import featureMobile from './assets/feature-mobile-friendly.svg'
import featureOffice from './assets/feature-office-approval.svg'
import featureProgress from './assets/feature-progress-tracking.svg'
import featureQr from './assets/feature-qr-verification.svg'
import featureRoles from './assets/feature-role-based-access.svg'
import featureSecure from './assets/feature-secure-records.svg'
import officeAccounting from './assets/office-accounting.svg'
import officeLibrary from './assets/office-library.svg'
import officeStudentAffairs from './assets/office-student-affairs.svg'
import googleIcon from './assets/google.png'
import roleAdmin from './assets/role-administrator.svg'
import roleOfficer from './assets/role-clearance-officer.svg'
import roleStudent from './assets/role-student.svg'
import shieldCheck from './assets/shield-check.svg'
import statusApproved from './assets/status-approved.svg'
import statusCompleted from './assets/status-completed.svg'
import statusProgress from './assets/status-in-progress.svg'
import statusPending from './assets/status-pending.svg'
import statusRejected from './assets/status-rejected.svg'


const processSteps = [
  {
    title: 'Log In',
    description:
      'Access ClearanceDNSC using your registered account and view your student clearance dashboard.',
  },
  {
    title: 'Start Your Clearance',
    description:
      'Submit your clearance request and check the list of offices that need to review your requirements.',
  },
  {
    title: 'Offices Review and Approve',
    description:
      'Assigned clearance officers review your records and update the status of their respective office items.',
  },
  {
    title: 'Track Until Completed',
    description:
      'Monitor your clearance progress and check which offices have approved your request until completion.',
  },
]

const features = [
  {
    title: 'Progress Tracking',
    description:
      'Monitor your clearance status in real time and easily identify which offices have completed their reviews.',
    image: featureProgress,
  },
  {
    title: 'Role-Based Access',
    description:
      'Separate access for students, clearance officers, and administrators based on their assigned responsibilities.',
    image: featureRoles,
  },
  {
    title: 'Office Approval',
    description:
      'Allow assigned offices to review clearance items, approve requests, or provide remarks when necessary.',
    image: featureOffice,
  },
  {
    title: 'Secure Records',
    description:
      'Keep clearance information organized and accessible to authorized users through a centralized system.',
    image: featureSecure,
  },
  {
    title: 'Mobile Friendly',
    description:
      'Access your clearance dashboard using a desktop, laptop, tablet, or mobile device wherever needed.',
    image: featureMobile,
  },
  {
    title: 'QR-Verified Clearance',
    description:
      'Support clearance verification through QR codes for convenient checking of completed clearance records.',
    image: featureQr,
  },
]

const roles = [
  {
    title: 'Student',
    description:
      'Submit clearance requests, view required offices, monitor approval statuses, and track overall clearance progress.',
    image: roleStudent,
  },
  {
    title: 'Clearance Officer',
    description:
      'View assigned student clearance requests, review submitted items, approve or reject requests, and provide remarks.',
    image: roleOfficer,
  },
  {
    title: 'Administrator',
    description:
      'Manage system users, offices, clearance requirements, reports, and system activity records.',
    image: roleAdmin,
  },
]

const clearanceStatuses = [
  { title: 'Pending', image: statusPending, className: 'status-pending' },
  { title: 'In Progress', image: statusProgress, className: 'status-progress' },
  { title: 'Approved', image: statusApproved, className: 'status-approved' },
  { title: 'Rejected', image: statusRejected, className: 'status-rejected' },
  { title: 'Completed', image: statusCompleted, className: 'status-completed' },
]

function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  return (
    <main className="login-page">
      <section className="login-intro" aria-labelledby="login-intro-title">
        <a className="login-brand" href="/" aria-label="ClearanceDNSC home">
          <span className="login-brand-mark" aria-hidden="true" />
          <span>ClearanceDNSC</span>
        </a>
        <div className="login-intro-copy">
          <p className="login-kicker">Student Clearance Management System</p>
          <h1 id="login-intro-title">
            Your clearance,<br />
            <span>made simpler.</span>
          </h1>
          <p className="login-intro-description">
            Manage your student clearance, follow office approvals, and monitor
            your progress through one convenient online system.
          </p>
          <ul className="login-benefits">
            <li>
              <span className="login-benefit-icon" aria-hidden="true">
                <img src={statusApproved} alt="" />
              </span>
              Track your clearance progress
            </li>
            <li>
              <span className="login-benefit-icon" aria-hidden="true">
                <img src={officeAccounting} alt="" />
              </span>
              Check office approval statuses
            </li>
            <li>
              <span className="login-benefit-icon" aria-hidden="true">
                <img src={shieldCheck} alt="" />
              </span>
              Access your clearance securely
            </li>
          </ul>
        </div>
        <footer className="login-intro-footer">
          <strong>Davao del Norte State College</strong>
          <span>A Web-Based Student Clearance Management System</span>
          <span>© {new Date().getFullYear()} ClearanceDNSC · Student Project</span>
        </footer>
      </section>

      <section className="login-form-panel" aria-labelledby="login-title">
        <div className="login-form-content">
          <p className="eyebrow">Welcome back</p>
          <h2 id="login-title">Sign in to your account</h2>
          <p className="login-form-description">
            Enter your account details to access your student clearance.
          </p>
          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault()
              setLoginMessage('Sign-in is not connected yet.')
            }}
          >
            <label htmlFor="student-identifier">Student ID or Email</label>
            <input
              id="student-identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="Enter your student ID or email"
              required
            />
            <div className="login-password-label">
              <label htmlFor="login-password">Password</label>
              <button
                className="login-text-button"
                type="button"
                onClick={() => setLoginMessage('Password recovery is not connected yet.')}
              >
                Forgot password?
              </button>
            </div>
            <div className="login-password-field">
              <input
                id="login-password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                className="password-visibility-toggle"
                type="button"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isPasswordVisible}
                onClick={() => setIsPasswordVisible((visible) => !visible)}
              >
                <img src={eyeIcon} alt="" />
                {!isPasswordVisible && <span className="password-eye-slash" aria-hidden="true" />}
              </button>
            </div>
            <button className="login-submit-button" type="submit">
              <span className="login-submit-icon" aria-hidden="true">
                <img src={arrowRight} alt="" />
              </span>
              Sign In
            </button>
            <button
              className="login-google-button"
              type="button"
              onClick={() => setLoginMessage('Google sign-in is not connected yet.')}
            >
              <img className="google-icon" src={googleIcon} alt="" />
              Continue with Google
            </button>
            {loginMessage && <p className="login-message" role="status">{loginMessage}</p>}
          </form>
          <p className="login-privacy-note">
            <img src={shieldCheck} alt="" aria-hidden="true" />
            Your account information should remain private.
          </p>
          <a className="login-home-link" href="/">
            <img src={arrowRight} alt="" aria-hidden="true" />
            Back to homepage
          </a>
        </div>
      </section>
    </main>
  )
}

function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="Illustration of the clearance dashboard">
      <div className="preview-art" aria-hidden="true">
        <img src={dashboardIllustration} alt="" />
      </div>
      <div className="preview-card">
        <div className="preview-title">
          <div>
            <strong>Clearance Overview</strong>
            <small>Sample student dashboard</small>
          </div>
          <span className="status status-progress">In Progress</span>
        </div>
        <div className="progress-label">
          <span>Overall Progress</span>
          <strong>60%</strong>
        </div>
        <div className="progress-track"><span /></div>
        <OfficeRow image={officeLibrary} name="Library" status="Approved" statusClass="status-approved" statusImage={statusApproved} />
        <OfficeRow image={officeAccounting} name="Accounting" status="In Progress" statusClass="status-progress" statusImage={statusProgress} />
        <OfficeRow image={officeStudentAffairs} name="Student Affairs" status="Pending" statusClass="status-pending" statusImage={statusPending} />
      </div>
    </div>
  )
}

function OfficeRow({ image, name, status, statusClass, statusImage }) {
  return (
    <div className="office-row">
      <span className="office-icon" aria-hidden="true"><img src={image} alt="" /></span>
      <span className="office-name">
        <strong>{name}</strong>
        <small>Office clearance</small>
      </span>
      <span className={`status ${statusClass}`}>
        <img src={statusImage} alt="" />
        {status}
      </span>
    </div>
  )
}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <a className="brand" href="#home" aria-label="ClearanceDNSC home">
            <span className="brand-mark" aria-hidden="true" />
            <span>ClearanceDNSC</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={`navigation${isMenuOpen ? ' is-open' : ''}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            {[
              ['Home', '#home'],
              ['How It Works', '#how-it-works'],
              ['Features', '#features'],
              ['Roles', '#roles'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <a className="button button-small header-login" href="/login">
            Log In
            <span aria-hidden="true"><img src={arrowRight} alt="" /></span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-pill">
                <span aria-hidden="true"><img src={shieldCheck} alt="" /></span>
                Student Clearance Management System
              </p>
              <h1>Your Student Clearance,<br className="hero-title-break" /> Now Simpler and Paperless.</h1>
              <p className="hero-description">
                Say goodbye to long paper-based clearance processes. Manage your
                clearance requests, receive office approvals, and track your
                progress in one convenient online system.
              </p>
              <div className="hero-actions">
                <a className="button" href="/login">
                  Log In
                  <span aria-hidden="true"><img src={arrowRight} alt="" /></span>
                </a>
                <a className="button button-light" href="#how-it-works">Learn How It Works</a>
              </div>
              <p className="hero-note">
                <span aria-hidden="true"><img src={shieldCheck} alt="" /></span>
                Organized. Transparent. Accessible.
              </p>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section className="section process-section" id="how-it-works">
          <div className="container">
            <SectionHeading
              eyebrow="Simple Process"
              title="How It Works"
              description="Complete your student clearance through four simple steps without the hassle of traditional paperwork."
            />
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-card" key={step.title}>
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="container">
            <SectionHeading
              eyebrow="What We Offer"
              title="Everything in One Place"
              description="A more organized way to manage student clearance through accessible and convenient digital features."
            />
            <div className="features-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-icon" aria-hidden="true"><img src={feature.image} alt="" /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section roles-section" id="roles">
          <div className="container">
            <SectionHeading
              eyebrow="Designed for Everyone"
              title="Who Can Use ClearanceDNSC?"
              description="Each account has its own responsibilities to ensure an organized clearance process across the institution."
            />
            <div className="roles-grid">
              {roles.map((role) => (
                <article className="role-card" key={role.title}>
                  <span className="role-icon" aria-hidden="true"><img src={role.image} alt="" /></span>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section status-section" aria-labelledby="status-title">
          <div className="container">
            <SectionHeading
              eyebrow="Know Your Progress"
              title="Understanding Clearance Status"
              description="Every clearance item has a status to help you understand its current progress and approval result."
              titleId="status-title"
            />
            <ul className="status-list" aria-label="Clearance status meanings">
              {clearanceStatuses.map((status) => (
                <li key={status.title}>
                  <span className={`status ${status.className}`}>
                    <img src={status.image} alt="" />
                    {status.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-section" id="get-started">
          <div className="container">
            <div className="cta-card">
              <div>
                <h2>Ready to Manage Your Clearance?</h2>
                <p>Access your account and experience a simpler way to complete your student clearance.</p>
              </div>
              <a className="button button-light" href="/login">
                Log In to Your Account <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            <a className="brand footer-brand" href="#home"><span>ClearanceDNSC</span></a>
            <p>Davao del Norte State College</p>
            <p>A Web-Based Student Clearance Management System</p>
          </div>
          <div className="footer-project">
            <strong>Student Project</strong>
            <p>This website uses mock data for demonstration and academic purposes.</p>
            <p>© {new Date().getFullYear()} ClearanceDNSC</p>
          </div>
        </div>
      </footer>
    </>
  )
}

function SectionHeading({ eyebrow, title, description, titleId }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function App() {
  const isLoginPage = window.location.pathname.replace(/\/+$/, '') === '/login'

  useEffect(() => {
    document.title = isLoginPage
      ? 'Account Access | ClearanceDNSC'
      : 'ClearanceDNSC | Student Clearance, Simplified'
  }, [isLoginPage])

  return isLoginPage ? <LoginPage /> : <HomePage />
}

export default App
