import UserService from '../services/users.js';

class Users {
    constructor() {
        this.userService = new UserService();

        this.login = this.login.bind(this);
        this.cadastro = this.cadastro.bind(this);
    }

    login(req, res) {
        return res.json(this.userService.login());
    }

   async cadastro(req, res) {
       const user = await this.userService.cadastro(req.body);

       return res.json({ user });
    }
}

export default Users;