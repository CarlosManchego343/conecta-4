import '../estilos/Celda.css';
import { TURNOS } from '../constantes';

export const Celda = ({ valor, onClick }) => {

    return (
        <div className="celda" onClick={onClick}>
            {valor === TURNOS.P ? TURNOS.P : valor === TURNOS.S ? TURNOS.S : ''}
        </div>
    )
}