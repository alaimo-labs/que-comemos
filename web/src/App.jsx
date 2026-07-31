import { useState } from 'react';
import { Inicio } from './screens/Inicio.jsx';
import { Ajustes } from './screens/Ajustes.jsx';

export function App() {
  const [screen, setScreen] = useState('inicio');

  return (
    <div className="app">
      <header className="header">
        <h1>Qué Comemos</h1>
        <p className="tagline">Cenas resueltas con lo que ya tenés</p>
      </header>

      <main className="main">
        {screen === 'inicio' ? (
          <Inicio onIngresarKey={() => setScreen('ajustes')} />
        ) : (
          <Ajustes />
        )}
      </main>

      <nav className="nav">
        <button
          className={screen === 'inicio' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setScreen('inicio')}
        >
          Inicio
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
