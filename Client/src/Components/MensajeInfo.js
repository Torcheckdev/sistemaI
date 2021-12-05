function MensajeInfo({mensaje="informacion"}) {
    return ( <>
                <div class="alert alert-info">
                    <h3 class="alert-heading">{mensaje}</h3>
                </div>
            </> );
}

export default MensajeInfo;