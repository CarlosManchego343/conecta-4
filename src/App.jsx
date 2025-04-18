import { Fragment, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Tablero } from './componentes/Tablero'
import { Celda } from './componentes/Celda'
import { TURNOS } from './constantes'
import { Cuadrado } from './componentes/Cuadrado'
import { verificarGanador } from './logica/tablero.js'

function App() {

  const [board, setBoard] = useState(() => {
    return Array.from({ length: 6 }, () => Array(7).fill(0))
  })

  const [turno, setTurno] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNOS.P
  })

  const resetearJuego = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill(0)));
    setTurno(TURNOS.P)
    localStorage.removeItem('turn')
  }

  const actualizarTablero = (columnaIndex) => {
    const nuevoTablero = board.map(fila => [...fila]) // Copia profunda
    for (let filaIndex = 5; filaIndex >= 0; filaIndex--) {
      if (nuevoTablero[filaIndex][columnaIndex] === 0) {
        // Usa TURNOS.P o TURNOS.S directamente como valor
        nuevoTablero[filaIndex][columnaIndex] = turno === TURNOS.P ? TURNOS.P : TURNOS.S;
        setBoard(nuevoTablero)
        
        if (verificarGanador(nuevoTablero, filaIndex, columnaIndex)) {
          alert(`¡Ganador: ${turno === TURNOS.P ? '🔴' : '🟢'}`);
          confetti()
          setTimeout(() => {
            resetearJuego();
          }, 500);
          return;
          return;
        }

        setTurno(turno === TURNOS.P ? TURNOS.S : TURNOS.P)
        break
      }
    }
  }


  return (
    <Fragment>
      <h1>Conecta 4</h1>
      <button onClick={resetearJuego}>Reiniciar</button>
      <Tablero>
        {board.map((fila, indexFila) => (
          <div key={indexFila} className='fila'>
            {fila.map((celda, indexColumna) => (
              <Celda
                key={indexColumna}
                valor={celda}
                onClick={() => actualizarTablero(indexColumna)}
              />
            ))}
          </div>
        ))}
      </Tablero>

      <h2>Turno de:</h2>
      <section className='turno'>
        <Cuadrado isSelected={turno === TURNOS.P}>
          {TURNOS.P}
        </Cuadrado>
        <Cuadrado isSelected={turno === TURNOS.S}>
          {TURNOS.S}
        </Cuadrado>
      </section>
    </Fragment>
  )
}

export default App
