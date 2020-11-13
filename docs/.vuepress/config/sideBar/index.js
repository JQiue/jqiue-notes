const computer = require('./computer');

module.exports = {
  "/cs/": computer.cs,
  "/language/": computer.language,
  "/algorithm/": computer.algorithm,
  "/database/": computer.database,
  "/front/": computer.front,
  "/lead/": computer.lead,
  "/tool/": computer.tool,
  "/salvation/": require("./salvation"),
  "/store/": require("./store"),
  "/about/": ["me", "content"]
};
