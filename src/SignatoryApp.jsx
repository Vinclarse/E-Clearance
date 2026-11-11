import { useState } from 'react'
import SignatoryLayout from './SignatoryLayout.jsx'
import SIG1 from './SIG1.jsx'
import SIG2 from './SIG2.jsx'
import SIG3 from './SIG3.jsx'
import SIG5 from './SIG-5.jsx'
import './signatory-responsive.css'

const currentUser = {
  firstName: 'Maria',
  lastName: 'Santos',
  title: 'Prof.',
  role: 'PROGRAM CHAIR',
}

export default function SignatoryApp() {
  const [activePage, setActivePage] = useState('SIG1')

  const profileName = `${currentUser.title} ${currentUser.firstName} ${currentUser.lastName}`

  let page
  switch (activePage) {
    case 'SIG2':
      page = <SIG2 />
      break
    case 'SIG3':
      page = <SIG3 />
      break
    case 'SIG5':
      page = <SIG5 />
      break
    case 'SIG1':
    default:
      page = (
        <SIG1
          profile={currentUser}
          onNavigateToQueue={() => setActivePage('SIG2')}
        />
      )
  }

  return (
    <SignatoryLayout
      activePage={activePage}
      onSelectPage={setActivePage}
      profile={{ ...currentUser, displayName: profileName }}
    >
      {page}
    </SignatoryLayout>
  )
}
