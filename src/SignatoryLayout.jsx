import { useState } from 'react';

const navTabs = [
  { id: 'SIG1', label: 'Overview Dashboard' },
  { id: 'SIG2', label: 'Approval Queue' },
  { id: 'SIG3', label: 'Deficiencies & Proofs' },
  { id: 'SIG5', label: 'Cohort Overview', badge: 'CHAIR' },
];

export default function SignatoryLayout({ activePage, onSelectPage, profile, children }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filterTab, setFilterTab] = useState('All');
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const notificationTabs = [
    { label: 'All', count: notifications.length },
    { label: 'Unread', count: unreadCount },
  ];
  const profileInitials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  const addSampleNotification = () => {
    setNotifications((current) => [
      {
        id: crypto.randomUUID(),
        title: 'New Requirement Submitted',
        desc: 'A student has submitted a new item awaiting your Program Chair verification.',
        time: 'Just now',
        group: 'TODAY',
        unread: true,
      },
      ...current,
    ]);
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );
  };

  const displayedNotifications = notifications.filter(
    (notification) => filterTab === 'All' || notification.unread,
  );
  const todayList = displayedNotifications.filter((notification) => notification.group === 'TODAY');
  const yesterdayList = displayedNotifications.filter((notification) => notification.group === 'YESTERDAY');

  return (
    <div className="signatory-shell" style={{ backgroundColor: '#D7DCD0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", padding: '1rem 1.5rem' }}>
      
      {/* Top Header Card */}
      <header className="signatory-header" style={{
        backgroundColor: '#EAEFE6',
        borderRadius: '50px',
        padding: '0.6rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        
        {/* Left: Institute Brand */}
        <div className="signatory-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 'bold',
            color: '#293B2A',
            fontSize: '0.8rem'
          }}>
            IC
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.88rem', color: '#29352A' }}>Institute of Computing</div>
            <div style={{ fontSize: '0.72rem', color: '#74806E' }}>Davao del Norte State College</div>
          </div>
        </div>

        {/* Center: Main Pill Navigation */}
        <nav className="signatory-nav" style={{
          backgroundColor: '#293B2A',
          padding: '0.35rem',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem'
        }}>
          {navTabs.map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectPage(tab.id)}
                style={{
                  backgroundColor: isActive ? '#51664C' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#B6C798',
                  border: 'none',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '30px',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span style={{
                    backgroundColor: '#91A778',
                    color: '#293B2A',
                    fontSize: '0.6rem',
                    fontWeight: '800',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '8px'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Notifications & User Avatar */}
        <div className="signatory-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
          
          {/* Notification Button */}
          <button
            type="button"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={showNotifications}
            onClick={() => {
              setShowNotifications((isOpen) => !isOpen);
              setShowProfileMenu(false);
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: '#AA5757',
                color: '#fff',
                width: 16,
                height: 16,
                borderRadius: '50%',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                display: 'grid',
                placeItems: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-expanded={showProfileMenu}
            style={{
              backgroundColor: '#293B2A',
              color: '#FFF',
              padding: '0.3rem 0.9rem 0.3rem 0.4rem',
              border: 'none',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#FFF',
              color: '#293B2A',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}>
              {profileInitials}
            </div>
            <div>
              <div className="signatory-profile-copy" style={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: 1.1 }}>{profile.displayName}</div>
              <div className="signatory-profile-copy" style={{ fontSize: '0.65rem', color: '#B6C798' }}>{profile.role}</div>
            </div>
            <span style={{ fontSize: '0.7rem' }}>▼</span>
          </button>

          {/* Dropdown Profile Menu */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: 0,
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 100,
              minWidth: '180px'
            }}>
              <button onClick={() => alert('Viewing Profile Details')} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.82rem' }}>My Profile</button>
              <button onClick={() => alert('Navigated to Settings')} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.82rem' }}>Chair Settings</button>
              <hr style={{ margin: '0.3rem 0', borderColor: '#EDF1E8' }} />
              <button onClick={() => alert('Logged Out')} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.8rem', border: 'none', background: 'none', color: '#AA5757', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 'bold' }}>Log Out</button>
            </div>
          )}

        </div>
      </header>

      {/* Page Body View */}
      <main className="signatory-main">
        {children}
      </main>

      {showNotifications && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setShowNotifications(false)}
            style={{
              position: 'fixed',
              inset: 0,
              width: '100%',
              height: '100%',
              padding: 0,
              border: 'none',
              backgroundColor: 'rgba(0,0,0,0.15)',
              zIndex: 999,
              cursor: 'default',
            }}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Notifications"
            style={{
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              bottom: '1rem',
              width: 'min(380px, calc(100vw - 2rem))',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.2rem 1.2rem 0.8rem', borderBottom: '1px solid #F0F4EC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#29352A' }}>Notifications</h2>
                  {unreadCount > 0 && (
                    <span style={{
                      backgroundColor: '#AA5757',
                      color: '#FFF',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '12px',
                    }}>
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setShowNotifications(false)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#EDF1E8',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#74806E',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem', backgroundColor: '#EDF1E8', padding: '0.2rem', borderRadius: '20px' }}>
                  {notificationTabs.map((tab) => (
                    <button
                      key={tab.label}
                      type="button"
                      aria-pressed={filterTab === tab.label}
                      onClick={() => setFilterTab(tab.label)}
                      style={{
                        backgroundColor: filterTab === tab.label ? '#293B2A' : 'transparent',
                        color: filterTab === tab.label ? '#FFF' : '#29352A',
                        border: 'none',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#51664C',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✓ Mark All as Read
                  </button>
                )}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.2rem' }}>
              {todayList.length > 0 && (
                <NotificationGroup
                  title="TODAY"
                  items={todayList}
                  onMarkAsRead={(id) => setNotifications((current) =>
                    current.map((notification) =>
                      notification.id === id ? { ...notification, unread: false } : notification,
                    ),
                  )}
                />
              )}
              {yesterdayList.length > 0 && (
                <NotificationGroup
                  title="YESTERDAY"
                  items={yesterdayList}
                  onMarkAsRead={(id) => setNotifications((current) =>
                    current.map((notification) =>
                      notification.id === id ? { ...notification, unread: false } : notification,
                    ),
                  )}
                />
              )}
              {displayedNotifications.length === 0 && (
                <div style={{ textAlign: 'center', color: '#74806E', padding: '3rem 1rem', fontSize: '0.85rem' }}>
                  <strong>{filterTab === 'Unread' ? 'No unread notifications' : 'No notifications yet'}</strong>
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', opacity: 0.8 }}>
                    You will be notified here once someone submits an approval request or clearance proof.
                  </p>
                </div>
              )}
            </div>

            <div style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid #F0F4EC' }}>
              <button
                type="button"
                onClick={addSampleNotification}
                style={{
                  width: '100%',
                  backgroundColor: '#293B2A',
                  color: '#FFF',
                  border: 'none',
                  padding: '0.55rem',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                + Simulate Incoming Notification
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

function NotificationGroup({ title, items, onMarkAsRead }) {
  return (
    <section>
      <h3 style={{ fontSize: '0.68rem', fontWeight: '800', color: '#74806E', letterSpacing: '0.05em', margin: '0 0 0.6rem' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onMarkAsRead(item.id)}
            style={{
              width: '100%',
              backgroundColor: item.unread ? '#F6F8F4' : '#FFFFFF',
              border: item.unread ? '1px solid #E2E7DC' : '1px solid transparent',
              borderRadius: '16px',
              padding: '0.85rem',
              display: 'flex',
              gap: '0.75rem',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <span style={{ flex: 1 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: '700', fontSize: '0.82rem', color: '#29352A', lineHeight: 1.2 }}>
                  {item.title}
                </span>
                {item.unread && <span aria-label="Unread" style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#293B2A', flexShrink: 0, marginTop: 4 }} />}
              </span>
              <span style={{ display: 'block', margin: '0.3rem 0 0.4rem', fontSize: '0.74rem', color: '#51664C', lineHeight: 1.35 }}>
                {item.desc}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#74806E' }}>{item.time}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}