import './header.css';

import React, { useEffect, useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';

import Loader from '@/components/ui/loader';

export default function Header() {
  const { state } = useNavigation();
  const [loading, setLoading] = useState(false);
  let timer = null;

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (state === 'loading') {
      setLoading(true);

      timer = window.setInterval(() => {
        setLoading(false);
      }, 1000);
    }
  }, [state]);

  return (
    <header className="header">
      <nav>
        <Link to="/">Podcaster</Link>

        {loading && <Loader />}
      </nav>
    </header>
  );
}
