import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kevinr78",
  database: "expense-tracker",
});

app.post("/insertTransaction", (req, res) => {
  const { amount, category, type, description, date } = req.body;

  conn.query(
    "INSERT INTO TRANSACTIONS (amount,category,type,date,description) VALUES (?,?,?,?,?)",
    [amount, category, type, date, description],
    function (error, results, feilds) {
      if (error) throw error;
      console.log("Data inserted");
      console.log(results);
    }
  );

  res.json("Done");
});

app.get("/getAllTransactions", (req, res) => {
  conn.query(
    "SELECT * FROM transactions ORDER BY t_id DESC",
    (err, results, feilds) => {
      console.log(results);

      res.json(results);
    }
  );
});
app.get("/getExpenseSummary", (req, res) => {
  conn.query(
    `select "income",ifnull(sum(amount),0 )AS Summary 
    from transactions
     where type=?
     union
    select "expense",sum(amount) AS Summary 
    from transactions
     where type=? 
     group by type;`,
    ["income", "expense"],
    (err, results, feilds) => {
      console.log(results);
      console.log(err);
      res.json(results);
    }
  );
});
app.post("/filterTranasctions", (req, res) => {
  const { category, type, startDate, endDate } = req.body;
  let isFirstQuery = true;
  let filterQuery = "SELECT * FROM TRANSACTIONS ";

  if (category !== null) {
    if (isFirstQuery) {
      filterQuery += `WHERE LOWER(category)=LOWER('${category
        .slice(2)
        .trim()}')`;
      isFirstQuery = false;
    } else {
      filterQuery += ` AND LOWER(category)=LOWER('${category
        .slice(2)
        .trim()}')`;
    }
  }

  if (type !== null) {
    if (isFirstQuery) {
      filterQuery += `WHERE LOWER(type)=LOWER('${type}')`;
      isFirstQuery = false;
    } else {
      filterQuery += ` AND LOWER(type)=LOWER('${type}')`;
    }
  }

  if (startDate !== null && endDate !== null) {
    if (isFirstQuery) {
      filterQuery += `WHERE date BETWEEN '${startDate}' AND '${endDate}';`;
      isFirstQuery = false;
    } else {
      filterQuery += ` and date BETWEEN '${startDate}' AND '${endDate}';`;
    }
  }
  console.log(filterQuery);

  conn.query(
    filterQuery,
    [(category, type, startDate, endDate)],
    (err, results, feilds) => {
      console.log(results);
      console.log(err);
      res.json(results);
    }
  );
});

conn.connect((err) => {
  if (err) {
    console.log("err");
  }
  console.log("Connected");
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
