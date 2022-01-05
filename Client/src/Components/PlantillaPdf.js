import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom:5,
    height:"100px"
  },

  encabezado:{
    flexDirection: 'row',
    width:"95%",
    height:"50px",
    margin:10
    //borderBottom:2
  },
  encabezado2:{
    flexDirection: 'row',
    width:"95%",
    height:"30px",
    margin:10
    //borderBottom:2
  },
  
 caja:{
    flexGrow: 1,
    border:1,
    flexDirection: 'colum',

 },
 caja2:{
    flexGrow: 1,
    border:1,
    flexDirection: 'colum',

 },
 titulo:{
    backgroundColor:"#477eca",
    height:"50%",
 },
 titulo2:{
    backgroundColor:"#477eca",
    height:"100%",
    fontSize:"12px",
 },

 valor:{
    height:"50%",
    fontSize:"10px",
 },
 columna:{
    flexGrow: 1,
    border:1,
 },
 fila:{
    flexDirection: 'row',
    width:"95%",
    height:"30px",
    marginRight:10,
    marginLeft:10,
    fontSize:"12px",
 }

});
function PlantillaPdf({informacion,name}) {
    console.log(informacion);
    const [IDcomprobante]=informacion.materias
return (  <>
          <Document>
                <Page size="A4" style={styles.page}>

                <View style={styles.encabezado}>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Comprobante:</Text>
                        <Text style={styles.valor}>{name}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Folio:</Text>
                        <Text style={styles.valor}>{IDcomprobante?.IDcomprobante}</Text>
                    </View>
                   
                </View>
                <View style={styles.encabezado}>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Numero cuenta:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NumCuenta}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Nombre:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NombreA}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Carrera:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NombreC}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Año inscripcion:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.AnioInscripcion}</Text>
                    </View>
                </View>
                <View style={styles.encabezado}>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Plantel:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NombreP}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Plan de estudios:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.PlanEstudios}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>Periodo:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.Periodo}</Text>
                    </View>
                </View>


                <View style={styles.tabla}>
                    
                    <View style={styles.encabezado2}>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>Clave:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"40%"}}>
                            <Text style={styles.titulo2}> Materia:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>Creditos:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>Semestre:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>Grupo:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>MOV:</Text>
                        </View>
                    </View>

                    {
                        informacion?.materias.map(({IDmateria,Nombre,Grupo,Creditos,Semestre,Movimiento})=>{
                            return<View style={styles.fila}>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{ IDmateria}</Text>
                            <Text style={styles.columna,{flexBasis:"40%"}}> {Nombre }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{Creditos }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{ Semestre}</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{Grupo }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{Movimiento? Movimiento:"Alta" }</Text>
                        </View>
                        })
                    }
                    </View>
                </Page>
         </Document>
    
             </>);
}

export default PlantillaPdf;


