import axios from 'axios';

function Registrar() {
    
    function handleInputSubmit(){
    
      axios.post(process.env.REACT_APP_HOST_SIGNUP, {
        Email:"MANUEL12@Email.com",
        Pword:"12345",
        roles:["user"]
        },{withCredentials:true}
        ).then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });
            axios.post(process.env.REACT_APP_HOST_SIGNUP, {
              Email:"holaculero21122@gmail.com",
              Pword:"test",
              roles:["admin","moderator"]
              },{withCredentials:true}
              ).then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.log(error);
                  });
            
          }
    
    return ( <>
       <div className="central btnC">
                <button
                        onClick={handleInputSubmit}
                        className="button inscripcion"
                        >
                            <span>registrar</span>
                            <div className='liquid'></div>
                </button>    
            </div>
    </> );
}

export default Registrar;