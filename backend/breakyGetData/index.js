const mysql = require("mysql2/promise")

//require('dotenv').config()

// TODO(filip): accept query params to specify how many results should be returned
exports.handler = async (event) => {
  console.log(event);
  console.log(process.env.MYSQL_DB);

  if (event.requestContext && event.requestContext.http) {
    if (event.requestContext.http.method !== "GET") {
      return { statusCode: 405 };
    }
  }

  const rows = await getData();

  if (!rows) {
    return { statusCode: 500 };
  }

  return { statusCode: 200, body: JSON.stringify(rows), headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }};
}

async function getData() {
  console.log("getData start");
  let con;
  try {
    con = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWD,
      database: process.env.MYSQL_DB,
      connectTimeout: 2000,
    });
  }
  catch (e) {
    console.error(e);
    return null;
  }
  console.log("getData: have connection");

  try {
    const [rows, _] = await con.query("select * from (select * from break_prompts order by id desc limit 100) as sub order by id asc;");
    console.log(rows);
    return rows;
  }
  catch (e) {
    console.error(e);
    return null;
  }
  finally {
    con.end();
  }
}
