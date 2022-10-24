
import RequestService from '../services/request';
import Handle from '../utils/handle-response';

class Request {
  constructor() {
    this.requestService = new RequestService();

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const response = this.requestService.create(req.filter, { id: req.userId, type: req.userType });
      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async list(req, res) {
    try {
      let request;

      if (req.filter && req.filter.id) {
        request = this.requestService.find(req.filter);
      } else {
        request = this.requestService.list(req.filter, { id: req.userId, type: req.userType });
      }

      Handle.success(request, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }

  async delete(req, res) {
    try {
      console.log('delete');
      const response = this.requestService.delete(req.filter, { id: req.userId, type: req.userType });
      Handle.success(response, res);
    } catch (error) {
      Handle.error(error, res);
    }
  }
}

export default Request;
