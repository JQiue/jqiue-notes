module.exports = {
  "/computer-basic/": require('./computer-basic'),
  "/language/": require('./language'),
  "/ds-algorithm/": require('./ds-algorithm'),
  "/database/": require('./database'),
  "/application/web/": require('./application').web,
  "/application/backend/": require('./application').backend,
  "/application/desktop/": require('./application').desktop,
  "/subject/": require('./subject'),
  "/sundry/": require('./sundry'),
  "/about/": ['me', 'content']
};