const con = require("../Configuration/db");

/**
 *
 * @bulkInsertion
 *
 */
const add = async (req, res) => {
  try {
    var query = "INSERT INTO client ( name, address)  VALUES ?";
    var values = req.body;
    console.log("Values:", values);
    var arr = [];

    values.map((res) => {
      var data = [(name = res.name), (address = res.address)];
      arr.push(data);
    });
    console.log(arr);
    con.query(query, [arr], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted", result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 *
 * @findAll
 *
 */
const getAll = async (req, res) => {
  try {
    con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @findOne
 *
 */
const findOne = async (req, res) => {
  try {
    var address = req.body.address;
    con.query(
      `SELECT name FROM client where address = '${address}'`,
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  } catch (error) {}
};

/**
 *
 * @updateRecord
 *
 */
const updateRecord = async (req, res) => {
  try {
    let query = `update client  set name='${req.body.name}' where address='${req.body.address}'`;

    await con.query(query, (err, resp) => {
      if (err) throw err;

      res.send(resp);
    });
  } catch (error) {
    console.log(error);

    res.send(error);
  }
};

//delete
const deleteParticularRecord = async (req, res) => {
  try {
    let query = ` delete from user where id=${req.params.id}`;

    console.log(query);

    connection.query(query, (err, resp) => {
      if (err) throw err;

      console.log("record deleted ");

      res.send(resp);
    });
  } catch (error) {
    console.log(error);

    res.send(error);
  }
};

//delete All records

const deleteAllRecord = async (req, res) => {
  try {
    let query = ` delete from user `;

    console.log(query);

    connection.query(query, (err, resp) => {
      if (err) throw err;

      console.log("record deleted ");

      res.send(resp);
    });
  } catch (error) {
    console.log(error);

    res.send(error);
  }
};

/**
 *
 * @bulkUpdate
 *
 */

const bulkUpdate = async (req, res) => {
  try {
    const body = req.body;
    var arr = [];

    body.map((res) => {
      var data = [(name = res.name), (address = res.address)];
      arr.push(data);
    });

    arr.forEach((element) => {
      let query = `update client set name='${element[0]}' where address='${element[1]}'`;

      con.query(query, (err, resp) => {
        if (err) throw err;
        console.log(resp);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @Relational_Operations
 */

//Insertion

const addData = async (req, res) => {
  try {
    var sql = `INSERT INTO user(name,email,u_id) VALUES('${req.body.name}','${req.body.email}','${req.body.id}');
    
    INSERT INTO address(street,city,u_id) VALUES('${req.body.street}','${req.body.city}','${req.body.id}')`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  } catch (error) {}
};

//Fetching all records from both table
const findAll = async (req, res) => {
  try {
    con.query(
      "SELECT * FROM user cross join address",
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//findOne

const selectOne = async (req, res) => {
  try {
    let sql = `SELECT U.name , U.email , A.city,A.street 
    FROM user AS U INNER JOIN address AS A ON U.u_id=${req.body.id}`;
    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//update

const updateOne = async (req, res) => {
  try {
    let sql = `update user 
     INNER JOIN address 
     ON address.u_id=address.u_id
     set name='${req.body.name}',
     city='${req.body.city}'`;
    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {}
};

//delete 
const deleteOne = async (req, res) => {
  try {
    let sql = `delete user from user
    INNER JOIN address
    ON address.u_id=address.u_id
    where user.u_id=${req.body.id}`;
    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {}
};

module.exports = {
  add,
  getAll,
  findOne,
  updateRecord,
  deleteParticularRecord,
  deleteAllRecord,
  bulkUpdate,
  addData,
  findAll,
  selectOne,
  updateOne,
  deleteOne,
};
