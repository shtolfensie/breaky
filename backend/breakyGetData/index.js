const mysql = require("mysql2/promise")
var {startOfWeek, endOfWeek, endOfToday, startOfToday, format} = require('date-fns')

//require('dotenv').config()

exports.handler = async (event) => {
  console.log(event);

  if (event.requestContext && event.requestContext.http) {
    if (event.requestContext.http.method !== "GET") {
      return { statusCode: 405 };
    }
  }
  
  let range = "";
  if (event.queryStringParameters) {
    if (event.queryStringParameters.range) {
      range = event.queryStringParameters.range;
    }
  }

  const rows = await getData(range);

  if (!rows) {
    return { statusCode: 500 };
  }

  return { statusCode: 200, body: JSON.stringify(rows), headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }};
}

async function getData(range) {
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
    if (range === "last200") {
      const [rows, _] = await con.query("select * from (select * from break_prompts order by click_datetime desc limit 200) as sub order by id asc;");
      return rows;
    }

    let today = new Date();
    let fromDate = "";
    let toDate = "";
    if (range === "today") {
      fromDate = format(startOfToday(), "yyyy-MM-dd HH:mm:ss");
      toDate = format(endOfToday(), "yyyy-MM-dd HH:mm:ss");
    }
    else if (range === "week") {
      fromDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd HH:mm:ss");
      toDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd HH:mm:ss");
    }

    const [rows, _] = await con.execute("select * from break_prompts where click_datetime > ? and click_datetime < ? order by click_datetime;", [fromDate, toDate]);
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

function test(range) {

  let today = new Date();
  let fromDate = "";
  let toDate = "";
  if (range === "today") {
    fromDate = format(startOfToday(), "yyyy-MM-dd HH:mm:ss");
    toDate = format(endOfToday(), "yyyy-MM-dd HH:mm:ss");
  }
  else if (range === "week") {
    fromDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd HH:mm:ss");
    toDate = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd HH:mm:ss");
  }

  console.log(fromDate, toDate);
}

test("today");
