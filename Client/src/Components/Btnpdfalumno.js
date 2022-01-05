import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PlantillaPdf from "./PlantillaPdf";
import Button from '@mui/material/Button';

function BotonPdf({infoAlumno,name}) {
    return ( <>         
       <Button disabled={infoAlumno?.alumno.NombreA? false : true}>               
         <span>
                        <PDFDownloadLink style={{color:infoAlumno?.alumno.NombreA?null:'black'}}
document={<PlantillaPdf informacion={infoAlumno} name={name} />} fileName={""+name+ " "+infoAlumno?.alumno.Periodo+".pdf"}>
                        {
                        ({loading}) => loading ? 'Loading' : name
                        }     
                        </PDFDownloadLink>
                    </span>
                    </Button>
              
            </> );
}

export default BotonPdf;