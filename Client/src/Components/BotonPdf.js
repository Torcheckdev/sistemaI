import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PlantillaPdf from "./PlantillaPdf";
import "./botonPdf.css";

function BotonPdf({infoAlumno,name}) {
    return ( <>            
                 <div
                    color='primary'
                    className="button btnPdf"
                  >
                    <span>
                        <PDFDownloadLink document={<PlantillaPdf name={name} informacion={infoAlumno} />} fileName={""+name+ " "+infoAlumno?.alumno.Periodo+".pdf"}>
                        {
                        ({loading}) => loading ? 'Loading' : 'Download'
                        }     
                        </PDFDownloadLink>
                    </span>
                    <div className='liquid'></div>
                  </div>
              
            </> );
}

export default BotonPdf;