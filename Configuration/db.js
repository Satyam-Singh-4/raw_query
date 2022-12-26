var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tectoro@123",
  database: "my_sql",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `CREATE TABLE if not exists  user(u_id int not null , name varchar(20),email varchar(25),
   PRIMARY KEY(u_id));

 
  CREATE TABLE if not exists  address  (a_id INT not null AUTO_INCREMENT, street VARCHAR(25), city VARCHAR(20), 
  primary key(a_id), u_id INT unique ,CONSTRAINT FK_user_address  FOREIGN KEY(u_id) REFERENCES user(u_id)
  ON DELETE CASCADE ON UPDATE CASCADE);`;

  con.query(sql);
  console.log(`Table created`);
});
module.exports = con;
