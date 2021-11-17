'CREATE TRIGGER inscritos  AFTER INSERT ON inscMateria'+ 
'FOR EACH ROW'+
'BEGIN'+ 
'UPDATE inscAsignatura  SET Inscritos = Inscritos+1 WHERE folioAsig=NEW.folioAsig;'+
'END;'