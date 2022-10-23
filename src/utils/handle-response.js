export default class Handle {
  static exception(error) {
    return { msg: error };
  }

  static error(error, res) {
    console.log(error);

    if (!error.msg && !(error.errors && error.errors.length)) {
      return res.status(400).send({ error: 'Something wrong happenned'});
    }

    return res.status(400).send({ error });
  }

  static success(resp, res) {
    return res.json(resp);
  }
}
