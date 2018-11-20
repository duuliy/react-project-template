
const ApiPrefix='/api';

module.exports= {
    // '/api/users': ['a', 'b'],
    [`GET ${ApiPrefix}/user/logout`](req, res) {
      res.localStorage.removeItem('userinfo');
      res.status(200).end()
    },
}