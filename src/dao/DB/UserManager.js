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

  getAllUsers = async () => {
    try {
      const users = await userModel.find().lean();
  
      if (!users || users.length === 0) {
        throw new Error('No se encontraron usuarios');
      }
  
      return users; // Retorna la lista de usuarios encontrados
    } catch (error) {
      throw new Error('Error al obtener la lista de usuarios');
    }
  };

  async eraseProductsFromUserCart(userId) {
    try {

      const user = await this.getUserDataById(userId);

      user.cart.products = [];

      await user.save();

      return user;
    } catch (error) {
      throw new Error("Error al borrar productos del carrito del usuario: " + error.message);
    }
  }

  updateUser = async (userId, updatedData) => {
    try {
      const user = await this.getUserDataById(userId);

      Object.assign(user, updatedData);

      await user.save();

      return user; 
    } catch (error) {
      throw new Error("Error al actualizar los datos del usuario: " + error.message);
    }
  };

  deleteUserById = async (userId) => {
    try {
      const result = await userModel.deleteOne({ _id: userId });
  
      if (result.deletedCount === 0) {
        throw new Error(`No existe un usuario con el id ${userId}`);
      }
  
      logger.info('Usuario eliminado correctamente');
    } catch (error) {
      throw new Error('No se ha podido borrar al usuario');
    }
  };
  

}



export default UserManager;
