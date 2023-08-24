/* Alumno: Agustin Barrero
    Comision: 51135
    Desafio: 2
*/
import fs from 'fs';
import path from 'path';
import __dirname from '../../utils.js'

class Product{
    constructor(title, description, price, thumbnail, code, stock ){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
  constructor(){
    const dataPath = path.join(__dirname, 'data.json');
    this.path = dataPath
    this.currentId = 1;
    if (!this.products) {  // Agregar esta condición para evitar el bucle infinito
      this.products = [];
      try {
        const data = fs.readFileSync(this.path,'utf-8');
        if(data.length === 0){
          this.products = []
        }else{
          this.products = JSON.parse(data)
        }
        this.currentId = this.products.length + 1;
      } catch (error) {
        console.error('Error al leer el archivo', error);
      }
    }
  }
  
  async addProduct(product) {
    // Verificar si ya existe un producto con la misma ID
    this.products.forEach((existingProduct) => {
      if (existingProduct.code === product.code) {
        throw new Error('Ya existe un producto con la misma ID');
      }
    });
  
    // Agregandole el id autoincrementado al producto
    const id = this.currentId++;
    product.id = id;
  
    this.products.push(product);
  
    try {
      const productosJson = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productosJson);
      console.log('Archivo creado satisfactoriamente.')
    } catch (error) {
      throw new Error('No se pudieron cargar los productos al archivo')
    }
  } 

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);
      return products; // Devuelve el array de productos original
    } catch (error) {
      throw new Error('Error al leer el archivo');
    }
  }
  

  async getProductById(id) {
    try {
      const product = this.products.find((product) => product.id === id);
      return product || null; // Devuelve null si no se encuentra el producto
    } catch (error) {
      throw error;
    }
  }
  
  
  
  
    async updateProduct(id, updateFields) {
      const index = this.products.findIndex((product) => product.code === id);
      if (index === -1) {
        throw new Error(`No existe un producto con el id ${id}`);
      }
      //Busco el indice del producto y su id, si lo encuentro, creo el producto actualizado, de lo contrario, se dispara un error.
      const updatedProduct = {
        ...this.products[index],
        ...updateFields,
        code: id
      };
      //Le paso al array el nuevo producto actualizado, luego se convierte en string para que pueda ser escrito con fs.
      this.products[index] = updatedProduct;
    
      try {
        const productosJson = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productosJson);
        console.log('Archivo actualizado satisfactoriamente.');
      } catch (error) {
        throw new Error('No se pudieron cargar los productos al archivo');
      }
    }
    
    async deleteProduct(id) {
      const index = this.products.findIndex((product) => product.code === id);
      if (index === -1) {
        throw new Error(`No existe un producto con el id ${id}`);
      }
    
      this.products.splice(index,1) //Elimina del array el producto seleccionado por id usando el indice.
    
      try {
        const productosJson = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productosJson);
        console.log('Producto eliminado correctamente')
      } catch (error) {
        throw new Error('No se pudieron cargar los productos al archivo')
      }
    }
}     
  const products  = []
  const productoUno = new Product ('Glock 20','Pistola calibre 9x19mm modelo 20 Gen 4',581,'glock20.jpg',1,15)
  const productoDos = new Product ('Bersa BP9CC','Pistola calibre 9x19mm modelo BP9CC',299,'bersaBP9CC.jpg',2,15)
  const productoTres = new Product ('Ruger SR22P','Pistola calibre 22mm modelo SR22P',299,'rugerSR22P.jpg',3,15)
  const productoCuatro = new Product ('Sig Sauer SIG 716','Carabina calibre 7.62 semiautomatica modelo SIG 716',13030,'sig716.jpg',4,15)
  const productoCinco = new Product ('Colt  M4 Trooper','Carabina calibre 5.56x45 mm',1150,'coltm4trooper.jpg',5,15)
  const productoSeis = new Product ('Smith & Wesson M&P15-22 M-LOK KRYPTEK','Carabina semiautomatica calibre 5.56mm',550,'s&wmp1522.jpg',6,15)
  const productoSiete = new Product ('Christensen Arms MPR','Rifle de cerrojo calibre 6.5 PRC',2400,'ChristensenArmsMPR.jpg',7,15)
  const productoOcho = new Product ('Ruger American Rimfire LRT','Rifle de cerrojo calibre .22mm',330,'RugerLRT.jpg',8,15)
  const productoNueve = new Product ('Remington 700 ADL','Rifle de cerrojo calibre .30-06 SPRG',595,'Remington700ADL.jpg',9,15)

  const manager = new ProductManager(products)

  const start = async () => {
    try {
      // Agregar productos
      // await manager.addProduct(productoUno); Comentado porque: Ya esta agregado el producto
      // await manager.addProduct(productoDos); Comentado porque: Ya esta agregado el producto
      // await manager.addProduct(productoTres);  Comentado porque: Ya esta agregado el producto
      // await manager.addProduct(productoCuatro);  Comentado porque: Ya esta agregado el producto
      //await manager.addProduct(productoCinco);  Comentado porque: Ya esta agregado el producto
      //await manager.addProduct(productoSeis); Comentado porque: Ya esta agregado el producto
      //await manager.addProduct(productoSiete);  Comentado porque: Ya esta agregado el producto
      //await manager.addProduct(productoOcho); Comentado porque: Ya esta agregado el producto
      //await manager.addProduct(productoNueve);  Comentado porque: Ya esta agregado el producto
          
      // Modificar producto
      //await manager.updateProduct(2, { price: 350, stock: 10 });  Comentado porque: Ya esta actualizado el producto
  
      // Eliminar producto
      // await manager.deleteProduct(1);  Comentado porque: No necesito borrar el producto
      // await manager.deleteProduct(2);  Comentado porque: No necesito borrar el producto
      // await manager.deleteProduct(3);  Comentado porque: No necesito borrar el producto
      // await manager.deleteProduct(4);  Comentado porque: No necesito borrar el producto
  
    } catch (error) {
      console.log('Este es el error: '+error.message);
    }
  };

  start()
//Imprimo en la consola los productos.
    console.log('-----------------------------')
    console.log(manager); 
    console.log('-----------------------------')

 export default ProductManager
