import { NavLink } from 'react-router-dom'

function Layout({ children }) {
  return (
    <main className="app">
      <header>
        <h1>Posts Management System</h1>
      </header>
      {children}
    </main>
  )
}

export default Layout
