//triggerupdateInserthistorialacademico
'CREATE TRIGGER ha AFTER INSERT ON inscMateria'+' '+ 
'FOR EACH ROW'+' '+ 
'INSERT INTO historialacademico(NumCuenta,folioAsig,IDmateria,Periodo,Calificacion,TipoExamen)VALUES(NEW.NumCuenta,NEW.folioAsig,NEW.IDmateria,NEW.Periodo,NEW.Calificacion,NEW.TipoExamen);'

//triggerupdateCalificacion
'CREATE TRIGGER UPcal  AFTER INSERT ON inscMateria'+' '+ 
 'FOR EACH ROW'+' '+
 'BEGIN'+ ' '+
 'UPDATE inscMateria SET Calificacion = Calificacion WHERE inscMateria.NumCuenta = historialacademico.NumCuenta AND inscMateria.folioAsig = historialacademico.folioAsing;'+' '+
 'END;'