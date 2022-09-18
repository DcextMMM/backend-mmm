export default class Handle {
  static exception(error) {
    return { msg: error };
  }

  static error(error, res) {
    console.log(error);

    if (!error.msg) {
      return res.status(400).send({ error: 'Something wrong happenned'});
    }

    return res.status(400).send({ error: error.msg });
  }

  static success(resp, res) {
    return res.json(resp);
  }
}
