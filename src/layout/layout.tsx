import './layout.css';

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/">Podcaster</Link>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
