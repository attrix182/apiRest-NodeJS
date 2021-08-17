const post = {};

var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10430807',
    password: 'sCvCZRCaBa',
    database: 'sql10430807' //Name DB
});

post.test = (req, res) => {

    res.send('test OK')

};



post.list = (req, res) => {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('no results')
        }
    })
};


post.listID = (req, res) => {

    const { id } = req.params;
    const sql = `SELECT * FROM posts WHERE ID = ${id}`

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('no results')
        }

    })

};

post.add = (req, res) => {

    const sql = 'INSERT INTO posts SET ?'

    const newpost = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        contenido: req.body.contenido,
        fecha: req.body.fecha
    }


    connection.query(sql, newpost, error => {
        if (error) throw error;

        res.send("OK");
    });


};

post.deleteID = (req, res) => {


    const { id } = req.params;

    const sql = `DELETE FROM posts WHERE ID = ${id}`

    connection.query(sql, (error, results) => {

        if (error) console.log(error);

        res.send('post eliminado')

    })

};

post.modID = (req, res) => {


    const { id } = req.params;
    const { nombre, correo, apellido, clave } = req.body;
    const sql = `UPDATE posts SET correo = '${correo}', clave = '${clave}', nombre = '${nombre}', apellido = '${apellido}' WHERE id = '${id}'`

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.send('posts modificado')


    })

};



function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}





module.exports = post;