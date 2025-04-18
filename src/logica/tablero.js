export const verificarGanador = (tablero, fila, columna) => {
    const jugador = tablero[fila][columna];
    if (jugador === 0) return false;

    const direcciones = [
        [[0, -1], [0, 1]], //horizontal
        [[-1, 0], [1, 0]], //vertical
        [[-1, 1], [1, -1]], //diagona derecha
        [[-1, -1], [1, 1]], //diagonal izquierda
    ];

    for (const [dir1, dir2] of direcciones) {
        let contador = 1; // Incluye la celda actual
    
        // Busca en una dirección (ej: izquierda)
        contador += contarFichas(tablero, fila, columna, dir1[0], dir1[1], jugador);
        // Busca en la dirección opuesta (ej: derecha)
        contador += contarFichas(tablero, fila, columna, dir2[0], dir2[1], jugador);
    
        if (contador >= 4) return true; // ¡Ganador!
      }
    
      return false;
}

const contarFichas = (tablero, fila, columna, dirFila, dirCol, jugador) => {
    let contador = 0;
    let nuevaFila = fila + dirFila;
    let nuevaCol = columna + dirCol;

    while (
        nuevaFila >= 0 && nuevaFila < 6 && // Límites del tablero (6 filas)
        nuevaCol >= 0 && nuevaCol < 7 &&    // Límites del tablero (7 columnas)
        tablero[nuevaFila][nuevaCol] === jugador
    ) {
        contador++;
        nuevaFila += dirFila;
        nuevaCol += dirCol;
    }

    return contador;

}