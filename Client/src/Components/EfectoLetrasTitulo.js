function EfectoLetrasTitulo({titulo="titulo"}) {
    return ( <>
                <div className="deconstructed titulo">
                    {titulo}
                    <div>{titulo}</div>
                    <div>{titulo}</div>
                    <div>{titulo}</div>
                    <div>{titulo}</div>
                </div>
             </> );
}

export default EfectoLetrasTitulo;