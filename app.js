const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const requireAuth = require("./middleware/authMiddleware");
const User = require("./models/User");
const methodOverride = require("method-override");

// middleware
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", authRoutes);

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://m001-student:m001-password@sandbox.yqnjh.mongodb.net/nodeawt?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(3000 || process.env.PORT, () => {
      console.log("Listening at port 3000 & Connected to DB");
    })
  )
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/vaults", requireAuth, async (req, res) => {
  console.log(res.locals.user);
  const pes = await User.findById({ _id: res.locals.user.id });
  res.render("vaults", {
    pcard: { id: pes._id, password: pes.passwords },
  });
});

// app.put("/vaults/:id", async (req, res) => {
//   console.log(req.body);
//   const pes = await User.findByIdAndUpdate(
//     { _id: req.params.id },
//     { $push: { passwords: req.body } },
//     { upsert: true }
//   );
//   res.render("vaults", {
//     pcard: { id: pes._id, password: pes.passwords },
//   });
// });

app.post("/vaults/add", requireAuth, async (req, res) => {
  console.log(req.body);
  let pes = await User.findByIdAndUpdate(
    { _id: res.locals.user.id },
    { $push: { passwords: req.body } },
    { upsert: true }
  );
  pes = await User.findById({ _id: res.locals.user.id });
  res.render("vaults", {
    pcard: { id: pes._id, password: pes.passwords },
  });
});

app.post("/delete/:id", requireAuth, async (req , res) => {
  let pes = await User.findByIdAndUpdate(
    {_id: res.locals.user.id},
    {$pull: {
      passwords: { _id: req.params.id },
    },},
  )
  pes = await User.findById({ _id: res.locals.user.id });
  res.render("vaults", {
    pcard: { id: pes._id, password: pes.passwords },
  });
});
