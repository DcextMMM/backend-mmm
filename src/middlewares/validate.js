import userSchema from '../schemas/users';

export default class Validate {
  constructor() {
    this.schema = new userSchema();
    this.cadastro = this.cadastro.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
  }

  async cadastro(req, res, next) {
    try {
      req.body = await this.schema.cadastro.validate(req.body, { stripUnknown: true });
      next();
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  }

  async login(req, res, next) {
    try {
      req.body = await this.schema.login.validate(req.body, { stripUnknown: true });
      next();
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  }

  async update(req, res, next) {
    try {
      req.body = await this.schema.update.validate(req.body, { stripUnknown: true });
      next();
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  }
}
