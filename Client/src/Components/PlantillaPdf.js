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
function PlantillaPdf({informacion}) {
    console.log(informacion);
    return (  <>
          <Document>
                <Page size="A4" style={styles.page}>
                <View style={styles.encabezado}>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>numero cuenta:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NumCuenta}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>nombre:</Text>
<<<<<<< HEAD
                        <Text style={styles.valor}>MANUEL Hernández Cabrera</Text>
=======
                        <Text style={styles.valor}>{informacion?.alumno.NombreA}</Text>
>>>>>>> main
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>carrera:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.NombreC}</Text>
                    </View>
                    <View style={styles.caja}>
                        <Text style={styles.titulo}>año inscripcion:</Text>
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
                        <Text style={styles.titulo}>periodo:</Text>
                        <Text style={styles.valor}>{informacion?.alumno.Periodo}</Text>
                    </View>
                </View>

                <View style={styles.tabla}>
                    
                    <View style={styles.encabezado2}>
                        <View style={styles.caja2,{flexBasis:"12%"}}>
                            <Text style={styles.titulo2}>Clave:</Text>
                        </View>
                        <View style={styles.caja2,{flexBasis:"40%"}}>
                            <Text style={styles.titulo2}> materia:</Text>
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
                        informacion?.materias.map(({IDmateria,nombre,Grupo,Creditos,Semestre})=>{
                            return<View style={styles.fila}>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{ IDmateria}</Text>
                            <Text style={styles.columna,{flexBasis:"40%"}}> {nombre }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{Creditos }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{ Semestre}</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{Grupo }</Text>
                            <Text style={styles.columna,{flexBasis:"12%"}}>{"ALTA" }</Text>
                        </View>
                        })
                    }
                    </View>
                </Page>
         </Document>
    
             </>);
}

export default PlantillaPdf;


