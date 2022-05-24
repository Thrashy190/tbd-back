const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const BD = require('./config');

//imports

//settings
app.set('port', 3000);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

//get pacientes
app.get('/pacientes', async function (req, res) {
  try {
    sql = 'select * from paciente';
    let result = await BD.Open(sql, [], false);
    res.json(result.rows);
  } catch (error) {
    console.error(err);
  }
});

//delete paciente
app.delete('/pacientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    sql = 'delete from paciente where id_paciente = :id ';
    const result = await BD.Open(sql, [id], true);
    res.json({ msg: result });
  } catch (err) {
    console.log(err.message);
  }
});

//add paciente

app.post('/pacientes', async (req, res) => {
  try {
    const {
      id_paciente,
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      cp,
      peso,
      altura,
      fecha_registro,
    } = req.body;

    console.log(req.body);

    sql =
      'INSERT INTO paciente(id_paciente,nombre,apellido,fecha_nacimiento,direccion_paciente,telefono,cp,peso,altura,fecha_registro) ' +
      "VALUES (:id_paciente,:nombre,:apellido,TO_DATE(:fecha_nacimiento, 'yyyy/mm/dd hh24:mi:ss'),:direccion,:telefono,:cp,:peso,:altura,TO_DATE(:fecha_registro, 'yyyy/mm/dd hh24:mi:ss'))";

    await BD.Open(
      sql,
      [
        id_paciente,
        nombre,
        apellido,
        fecha_nacimiento,
        direccion,
        telefono,
        cp,
        peso,
        altura,
        fecha_registro,
      ],
      true
    );
    res.status(200).json({
      id_paciente: id_paciente,
      nombre: nombre,
      apellido: apellido,
      fecha_registro: fecha_registro,
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Edit paciente

app.put('/pacientes/:id_paciente', async (req, res) => {
  try {
    const { id_paciente } = req.params;
    const {
      nombre,
      apellido,

      direccion,
      telefono,
      cp,
      altura,
      peso,
    } = req.body;

    sql = `UPDATE paciente SET nombre=:nombre, apellido=:apellido, direccion_paciente=:direccion, telefono=:telefono, cp=:cp, altura=:altura, peso=:peso WHERE id_paciente = ${id_paciente}`;

    await BD.Open(
      sql,
      [nombre, apellido, direccion, telefono, cp, altura, peso],
      true
    );

    res.status(200).json({
      id_paciente: id_paciente,
      nombre: nombre,
    });
  } catch (err) {
    console.log(err.message);
  }
});

//run
app.listen(app.get('port'), () => {
  console.log('Server on Port 3000');
});

// {
//   "id_paciente":4,
//   "nombre":"Alexandra",
//   "apellido":"Borrego",
//   "fecha_nacimiento":"2002/07/02 21:02:44",
//   "direccion":"Saltillo",
//   "telefono":8441039924,
//   "cp":21411,
//   "peso":50,
//   "altura":170,
//   "fecha_registro":"2002/07/02 21:02:44"
// }
