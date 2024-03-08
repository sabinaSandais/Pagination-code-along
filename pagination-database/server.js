const express = require("express");
const app = express();
const User = require("./users");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/pagination");
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
//   { id: 3, name: "Jim" },
//   { id: 4, name: "Jill" },
//   { id: 5, name: "Jack" },
//   { id: 6, name: "Jenny" },
//   { id: 7, name: "Jesse" },
//   { id: 8, name: "Jasmine" },
//   { id: 9, name: "Jared" },
//   { id: 10, name: "Jocelyn" },
//   { id: 11, name: "Jesse" },
//   { id: 12, name: "Jasmine" },
//   { id: 13, name: "Jared" },

// ];

// const posts = [
//     { id: 1, name: "John" },
//     { id: 2, name: "Jane" },
//     { id: 3, name: "Jim" },
//     { id: 4, name: "Jill" },
//     { id: 5, name: "Jack" },
//     { id: 6, name: "Jenny" },
//     { id: 7, name: "Jesse" },
//     { id: 8, name: "Jasmine" },
//     { id: 9, name: "Jared" },
//     { id: 10, name: "Jocelyn" },
//     { id: 11, name: "Jesse" },
//     { id: 12, name: "Jasmine" },
//     { id: 13, name: "Jared" },
// ];

// app.get("/posts", paginatedResults(posts), (req, res) => {
//   res.json(res.paginatedResults);
// });

app.get("/users", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});
function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
}
app.listen(3000);
