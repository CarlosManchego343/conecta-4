import '../estilos/Cuadrado.css';

export const Cuadrado = ({ children, isSelected }) => {

    const className = `cuadrado${isSelected ? '-seleccionado' : ''}`;

    return (
        <div className={className}>
            {children}
        </div>
    )
}