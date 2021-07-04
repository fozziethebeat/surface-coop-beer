//import sqlite3 from "sqlite3";
//import Tree from "prefix-tree";

//let db = new sqlite3.Database(process.env.BREW_DB_PATH);
//let hop_tree = new Tree();
let hop_list = [];
//db.each("select * from Hop order by Id", function (err, row) {
//  hop_list.push(row);
//  const name = row.Name;
//  const name_lower = name.toLowerCase();
//  hop_tree.set(name, row);
//  hop_tree.set(name_lower, row);
//});
//db.close();

export default function handler(req, res) {
  console.log(req.query);
  const start_index = Number(req.query.index) || 0;
  console.log(start_index);
  const size = Number(req.query.size) || 20;
  console.log(size);
  const end_index = start_index + size;
  if (req.query.prefix) {
    const result = hop_tree.get(req.query.prefix).slice(start_index, end_index);
    res.status(200).json(result);
    return;
  }
  const result = hop_list.slice(start_index, end_index);
  res.status(200).json(result);
}
