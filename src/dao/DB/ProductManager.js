import { productsModel } from "../DB/models/products.model.js";

import { getLogger } from '../../config/logger.js';
const logger = getLogger();

class ProductManager {
  constructor() {
    this.currentId = 1;
  }
  
  async addProduct(product) {
    try {
      await productsModel.create(product);
      logger.info('Producto creado satisfactoriamente.');
      logger.info(product)
    } catch (error) {
      throw new Error('No se pudieron cargar los productos a la base de datos')
    }
  }

  async getProducts() {
    try {
      const products = await productsModel.find({}).lean();
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }
  
  async sortProductsByCategory() {
    try {
        const sortedProducts = await productsModel.aggregate([
            { $sort: { category: 1 } }, // Ordenar por categoría ascendente
            {
                $group: {
                    _id: "$category",
                    products: { $push: "$$ROOT" }
                }
            }
        ]);
        return sortedProducts;
    } catch (error) {
        throw new Error('Error al obtener y ordenar los productos por categoría');
    }
}

async getProductsByCategory(category) {
  try {
      const sortedProducts = await this.sortProductsByCategory();

      // Filtra los productos de la categoría especificada
      const productsByCategory = sortedProducts.find(categoryObj => categoryObj._id === category);

      if (productsByCategory) {
          return productsByCategory.products;
      } else {
          return []; // Retorna un array vacío si no se encuentra la categoría
      }
  } catch (error) {
      throw new Error('Error al obtener y mostrar los productos por categoría');
  }
}

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id).lean();
      return product || null;
    } catch (error) {
      throw error;
    }
  }
  
  async updateProduct(productId, updateFields) {
  try {
    const result = await productsModel.updateOne({ _id: productId }, updateFields);
    if (result.n === 0) {
      throw new Error(`No existe un producto con el id ${productId}`);
    }
    logger.info('Producto actualizado satisfactoriamente.');
  } catch (error) {
    throw new Error('No se pudo actualizar el producto');
  }
}

async deleteProduct(productId) {
    try {
      const result = await productsModel.deleteOne({ _id: productId });
      if (result.deletedCount === 0) {
        throw new Error(`No existe un producto con el id ${productId}`);
      }
      logger.info('Producto eliminado correctamente');
    } catch (error) {
      throw new Error('No se ha podido borrar el producto');
    }
  }
}     

export default ProductManager;
 