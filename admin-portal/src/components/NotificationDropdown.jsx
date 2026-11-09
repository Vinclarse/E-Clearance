import { useState } from 'react'
import { notifications as initialNotifications } from '../data/mockData'
import { Bell, Check } from 'lucide-react'
import './NotificationDropdown.css'

export default function NotificationDropdown({ onClose }) {
  const [items, setItems] = useState(initialNotifications)

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = items.filter(n => !n.read).length

  return (
    <div className="notif-dropdown">
      <div className="notif-dropdown-header">
        <span className="notif-dropdown-title">
          <Bell size={15} />
          Notifications
          {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}
        </span>
      </div>

      <ul className="notif-list">
        {items.map(notif => (
          <li key={notif.id} className={`notif-item ${notif.read ? '' : 'unread'}`}>
            <div className="notif-item-body">
              <div className="notif-item-left">
                {!notif.read && <span className="notif-unread-dot" />}
              </div>
              <div className="notif-item-content">
                <p className="notif-item-title">{notif.title}</p>
                <p className="notif-item-msg">{notif.message}</p>
                <span className="notif-item-time">{notif.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="notif-dropdown-footer">
        <button className="mark-read-btn" onClick={markAllRead}>
          <Check size={13} />
          Mark all as read
        </button>
      </div>
    </div>
  )
}
