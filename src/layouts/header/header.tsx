import './header.css';

import React from 'react';
import { Link, useNavigation } from 'react-router-dom';

import Loader from '@/components/ui/loader';

export default function Header() {
  const { state } = useNavigation();
  console.log(state);

  return (
    <header className="header">
      <nav>
        <Link to="/">Podcaster</Link>

        {state === 'loading' && (
          <div>
            <Loader />
          </div>
        )}
      </nav>
    </header>
  );
}
