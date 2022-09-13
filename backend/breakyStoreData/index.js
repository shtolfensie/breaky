const mysql = require("mysql2/promise")

//require('dotenv').config()

exports.handler = async (event) => {
  console.log(event);
  console.log(process.env.MYSQL_DB);

  if (event.requestContext && event.requestContext.http) {
    if (event.requestContext.http.method !== "POST") {
      return { statusCode: 405 };
    }
  }

  if (event && event.body) {
    const data = JSON.parse(event.body);
    console.log("have body");

    if (!data.promptDatetime || !data.clickDatetime || !data.action) {
      console.error("wrong body");
      return { statusCode: 400 };
    }

    const db_res = await storeData(data);
    if (db_res) {
      console.log("myFunc complete");
      return { statusCode: 200, body: JSON.stringify({ success: db_res }) };
    }
    else {
      console.error("myFunc error!");
      return { statusCode: 500, body: event.body };
    }
  }
  else {
    console.error("no body");
    return { statusCode: 405 };
  }
}

async function storeData(data) {
  console.log("myFunc start");
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
    return false;
  }
  console.log("myFunc: have connection");

  try {
    const [rows, _] = await con.execute("insert into break_prompts (prompt_datetime, click_datetime, action) values (?,?,?);", [data.promptDatetime, data.clickDatetime, data.action]);
    console.log(rows);
    return true;
  }
  catch (e) {
    console.error(e);
    return false;
  }
  finally {
    con.end();
  }
}

// async function printIt() {
//   const eh = await storeData({ promptDatetime: "2022-09-12 19:46:05", clickDatetime: "2022-09-12 19:47:08", action: "break_small" })
//   console.log(eh)
//   return eh;
// }

// console.log(printIt())

// curl --header Content-Type: application/json -i --request POST --data {"promptDatetime": "2022-09-12 20:14:01", "clickDatetime":"2022-09-12 20:14:17", "action":"ho"} https://vz25oqhupx3xu2jsd6miw5ahzy0zeqyq.lambda-url.eu-central-1.on.aws/
