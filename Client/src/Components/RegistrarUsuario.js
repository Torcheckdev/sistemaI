import axios from 'axios';

function Registrar() {
    
<<<<<<< HEAD
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
    
=======
  const usuarios = [
    {
    "Email":"ALICIA23@Email.com",
    "Pword":"12345"
    },
    {
      "Email":"PATRICIA19@Email.com",
      "Pword":"12345"
      },
      {
        "Email":"MARIA DOLORES20@Email.com",
        "Pword":"12345"
        },
        {
          "Email":"ANGELA29@Email.com",
          "Pword":"12345"
          },
          {
            "Email":"FERNANDO17@Email.com",
            "Pword":"12345"
            },
            {
              "Email":"MIGUEL27@Email.com",
              "Pword":"12345"
              },{
                "Email":"FRANCISCA4@Email.com",
                "Pword":"12345"
                },{
                  "Email":"ALBA7@Email.com",
                  "Pword":"12345"
                  },{
                    "Email":"MARIA ROSARIO8@Email.com",
                    "Pword":"12345"
                    },
                    {
                      "Email":"MERCEDES31@Email.com",
                      "Pword":"12345"
                      },
                      {
                        "Email":"ANTONIO24@Email.com",
                        "Pword":"12345"
                        }
     ];
      
      
      
      
      
       function handleInputSubmit(){
        
        for (var i=0 ; i<usuarios.length; i++ ){
           axios.post(process.env.REACT_APP_HOST_SIGNUP, {
            Email:usuarios[i].Email,
            Pword:usuarios[i].Pword,
            roles:["user"]
            },{withCredentials:true}
            ).then((response) => {
                  console.log(response);
                }, (error) => {
                  console.log(error);
                });
                
              }
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
          
>>>>>>> main
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