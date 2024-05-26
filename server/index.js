import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { json } from "react-router-dom";
import bcrypt from "bcryptjs";
import { createJWT, verifyJWT } from "./utils/JWT.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const conn = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kevinr78",
  database: "expense-tracker",
});

app.post("/insertTransaction", verifyJWT, async (req, res) => {
  debugger;
  const { amount, category, type, description, date } = req.body;
  let query;
  try {
    query =
      "INSERT INTO TRANSACTIONS (amount,category,type,date,description, by_user) VALUES (?,?,?,?,?,?)";

    let [results, feilds] = await conn.execute(query, [
      amount,
      category,
      type,
      date,
      description,
      req.currentuser.uid,
    ]);

    res.status(201).json({ ok: true, message: "Inserted Sucessfully" });
  } catch (error) {
    res.status(401).json({ ok: false, message: error.message });
  }
});

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  let query;

  try {
    if (!name || !email || !password) {
      throw new Error("Invalid Data");
    }

    query =
      "select uid,user_name ,count(1) as emailExist from users where exists (select email from users where email=?) group by user_name,uid";

    let [results, feilds] = await conn.query(query, [email]);

    if (results.length > 0 && results[0].emailExist > 0) {
      throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    debugger;
    query = "INSERT INTO USERS(user_name,email,password) VALUES (?,?,?)";
    [results, feilds] = await conn.query(query, [name, email, hashedPass]);

    console.log(results);
    const token = createJWT(uid);

    res.status(200).json({
      token: token,
      ok: true,
      message: "User created successfully",
      user: results[0],
    });
  } catch (err) {
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  let query;
  let { email, password: reqPass } = req.body;

  try {
    if (!email || !reqPass) {
      throw new Error("Invalid Data");
    }
    query = "select * from users where email=?";
    let [result, fields] = await conn.query(query, [email]);
    if (result.length == 0) {
      throw new Error("User with given email does not exist");
    }
    let { uid, user_name, email: userEmail, password: hashedPass } = result[0];
    const isPassword = await bcrypt.compare(reqPass, hashedPass);

    if (!isPassword) {
      throw new Error("Incorrect Password");
    }

    const token = createJWT(uid);

    res.status(200).json({
      token: token,
      ok: true,
      message: "User created successfully",
      user: result[0],
    });
  } catch (err) {
    next(err);
  }
});

app.post("/getAllTransactions", verifyJWT, async (req, res) => {
  let query;
  try {
    debugger;
    let [results, fields] = await conn.execute(
      "SELECT * FROM transactions where by_user=? ORDER BY created_at DESC",
      [req.currentuser.uid]
    );

    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.post("/getExpenseSummary", verifyJWT, async (req, res) => {
  let query;
  try {
    let [results, fields] = await conn.execute(
      `select "income",ifnull(sum(amount),0 )AS Summary 
    from transactions
     where type=?
     and by_user=?
     union
    select "expense",sum(amount) AS Summary 
    from transactions
     where type=? 
     and by_user=?
     group by type;`,
      ["income", req.currentuser.uid, "expense", req.currentuser.uid]
    );

    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.post("/filterTranasctions", verifyJWT, async (req, res) => {
  debugger;
  const { category, type, startDate, endDate } = req.body;
  let query;
  let isFirstQuery = true;
  let filterQuery = "SELECT * FROM TRANSACTIONS ";

  if (category !== null && category !== "Category") {
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
      filterQuery += `WHERE date BETWEEN '${startDate}' AND '${endDate}'`;
      isFirstQuery = false;
    } else {
      filterQuery += ` and date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    filterQuery += ` AND BY_USER=${req.currentuser.uid};`;
  }
  try {
    let [results, fields] = await conn.query(filterQuery, [
      category,
      type,
      startDate,
      endDate,
    ]);
    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    message: err.message || "Something went wrong",
    status: err.status || 500,
    ok: err.ok || 0,
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
