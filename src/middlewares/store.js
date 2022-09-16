import userSchema from '../schemas/users';

export default async (req, res, next) => {
  const schema = new userSchema();
  try {
    req.body = await schema.cadastro.validate(req.body, { stripUnknown: true });
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};
