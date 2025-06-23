import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-light-300">
        <li>
          <Link to="/" className="hover:text-light-100">Inicio</Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = '/' + pathnames.slice(0, idx + 1).join('/');
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={routeTo} className="hover:text-light-100 capitalize">{decodeURIComponent(name)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}; 