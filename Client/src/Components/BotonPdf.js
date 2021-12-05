import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PlantillaPdf from "./PlantillaPdf";
import "./botonPdf.css";

function BotonPdf({infoAlumno}) {
    return ( <>            
                 <div
                    color='primary'
                    className="button btnPdf"
                  >
                    <span>
                        <PDFDownloadLink document={<PlantillaPdf informacion={infoAlumno} />} fileName="Inscripcion.pdf">
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