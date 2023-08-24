import userModel from './models/user.model.js';
import { getLogger } from '../../config/logger.js';
const logger = getLogger();

class UserManager {
  constructor() {
    logger.info('Users model from UserManager');
  }

  getUserDataById = async (userId) => {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user; // Retorna el usuario encontrado
    } catch (error) {
      throw new Error('Error al obtener los datos del usuario');
    }
  };

  getIdByFullName = async (first_name, last_name) => {
    try {
      const user = await userModel.findOne({ first_name, last_name });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user._id;
    } catch (error) {
      throw new Error('Error al obtener el ID del usuario');
    }
  };

  get = (params) => {
    return userModel.find(params);
  };
}

export default UserManager;
