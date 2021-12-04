import axios from 'axios';

 function  Registrar () {
    
    
 const usuarios = [
{
"Email":"ALICIA23@Email.com",
"Pword":""
},
{
  "Email":"PATRICIA19@Email.com",
  "Pword":""
  },
  {
    "Email":"MARIA DOLORES20@Email.com",
    "Pword":""
    },
    {
      "Email":"ANGELA29@Email.com",
      "Pword":""
      },
      {
        "Email":"FERNANDO17@Email.com",
        "Pword":""
        },
        {
          "Email":"MIGUEL27@Email.com",
          "Pword":""
          },{
            "Email":"FRANCISCA4@Email.com",
            "Pword":""
            },{
              "Email":"ALBA7@Email.com",
              "Pword":""
              },{
                "Email":"MARIA ROSARIO8@Email.com",
                "Pword":""
                },
                {
                  "Email":"MERCEDES31@Email.com",
                  "Pword":""
                  }
 ]
  
  
  
  
  
   function handleInputSubmit(){
    
    for (var i=0 ; i<usuarios.length; i++ ){
       axios.post(process.env.REACT_APP_HOST_SIGNUP, {
        Email:usuarios[i].Email,
        Pword:"12345",
        roles:["user"]
        },{withCredentials:true}
        ).then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });
            
          }
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