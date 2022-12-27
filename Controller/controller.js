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
 * @One_to_one
 */

//Insertion

const addData = async (req, res) => {
  try {
   // let body = req.body;
    for (let index = 0; index < req.body.length; index++) {
      const element = req.body[index];
      console.log(element);
    }
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

/**
 * @One_To_Many
 */

//Insertion

const addValue = async (req, res) => {
  try {
    let sql = `INSERT INTO user(name,email) VALUES('${req.body.name}','${req.body.email}');
    
    INSERT INTO contact(u_id,phone_number) VALUES(LAST_INSERT_ID(),${req.body.phone[0]}),(LAST_INSERT_ID(),${req.body.phone[1]})`;

    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//findAll

const searchAll = async (req, res) => {
  try {
    let sql = `select * from user cross join contact LIMIT ${req.body.limit} OFFSET ${req.body.offset} `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//FindOne

const getOne = async (req, res) => {
  try {
    let sql = `SELECT * 
    FROM user AS U INNER JOIN contact AS C ON C.u_id=U.u_id
    where U.u_id=${req.body.id}`;
    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//Update_One

const updateSingle = async (req, res) => {
  try {
    let sql = `update user 
     INNER JOIN contact 
     ON user.u_id=contact.u_id
     set name='${req.body.name}'
     where user.u_id=${req.body.id}`;

    await con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (error) {}
};

//Delete_Operation

const deleteSingle = async (req, res) => {
  try {
    let sql = `delete user from user
    INNER JOIN contact
    ON contact.u_id=user.u_id
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
  addValue,
  searchAll,
  getOne,
  updateSingle,
  deleteSingle,
};
