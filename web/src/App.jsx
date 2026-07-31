import { useState } from 'react';
import { Ciclo } from './screens/Ciclo.jsx';
import { Ajustes } from './screens/Ajustes.jsx';

export function App() {
  const [screen, setScreen] = useState('ciclo');

  return (
    <div className="app">
      <header className="header">
        <h1>Qué Comemos</h1>
        <p className="tagline">Cenas resueltas con lo que ya tenés</p>
      </header>

      <main className="main">
        {screen === 'ciclo' && <Ciclo />}
        {screen === 'ajustes' && <Ajustes />}
      </main>

      <nav className="nav">
        <button
          className={screen === 'ciclo' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setScreen('ciclo')}
        >
          Plan
        </button>
        <button
          className={screen === 'ajustes' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setScreen('ajustes')}
        >
          Ajustes
        </button>
      </nav>
    </div>
  );
}
