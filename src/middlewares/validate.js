import userSchema from '../schemas/users';

export default class Validate {
  constructor() {
    const schema = new userSchema();
    this.cadastro = async (req, res, next) => {
      try {
        req.body = await schema.cadastro.validate(req.body, { stripUnknown: true });
        next();
      } catch (err) {
        return res.status(400).json({ error: err.errors });
      }
    };

    this.login = async (req, res, next) => {
      try {
        req.body = await schema.login.validate(req.body, { stripUnknown: true });
        next();
      } catch (err) {
        return res.status(400).json({ error: err.errors });
      }
    };

    this.update = async (req, res, next) => {
      try {
        req.body = await schema.update.validate(req.body, { stripUnknown: true });
        next();
      } catch (err) {
        return res.status(400).json({ error: err.errors });
      }
    };
  }
}
