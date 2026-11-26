import {StrictMode, useLayoutEffect, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

// index.html hides the prerendered markup while JavaScript is loading; reveal the app in the same
// frame React commits it, so there is no flash of static content before the entrance animations.
function Mounted({children}: {children: ReactNode}) {
  useLayoutEffect(() => {
    document.documentElement.classList.add('js', 'is-mounted');
  }, []);
  return children;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Mounted>
      <App />
    </Mounted>
    {/* Cookieless page-view counts; collects only once Web Analytics is enabled for the Vercel project. */}
    <Analytics />
  </StrictMode>,
);
