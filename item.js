const item = {};

var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql533.main-hosting.eu',
    user: 'u716697139_test',
    password: 'Admin123',
    database: 'u716697139_test' //Name DB
});

item.test = (req, res) => {

    res.send('test OK')

};



item.list = (req, res) => {

    const sql = 'SELECT * FROM items'

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('no results')
        }
    })
};


item.listID = (req, res) => {

    const { id } = req.params;
    const sql = `SELECT * FROM items WHERE ID = ${id}`

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('no results')
        }

    })

};

item.add = (req, res) => {

    const sql = 'INSERT INTO items SET ?'

    const newitem = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad
    }


    connection.query(sql, newitem, error => {
        if (error) throw error;

        res.send("OK");
    });


};

item.deleteID = (req, res) => {


    const { id } = req.params;

    const sql = `DELETE FROM items WHERE ID = ${id}`

    connection.query(sql, (error, results) => {

        if (error) console.log(error);

        res.send('Item eliminado')

    })

};

item.modID = (req, res) => {


    const { id } = req.params;
    const { nombre, correo, apellido, clave } = req.body;
    const sql = `UPDATE items SET correo = '${correo}', clave = '${clave}', nombre = '${nombre}', apellido = '${apellido}' WHERE id = '${id}'`

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.send('items modificado')


    })

};



function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}





module.exports = item;