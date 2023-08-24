import mongoose from "mongoose";

const productsCollection = 'products'

//Defino schemas 

const stringTypeSchemaNonUniqueRequired = {
    type: 'String',
    require: 'true'
}
const numberTypeSchemaNonUniqueRequired = {
    type: 'Number',
    require: 'true'
}
const arrayTypeSchemaNonUniqueRequired = {
    type: 'Array',
    require: 'true'
}

const productsSchema = new mongoose.Schema({
    title:stringTypeSchemaNonUniqueRequired,
    description:stringTypeSchemaNonUniqueRequired,
    price:numberTypeSchemaNonUniqueRequired,
    thumbnail:stringTypeSchemaNonUniqueRequired,
    code:numberTypeSchemaNonUniqueRequired,
    stock:numberTypeSchemaNonUniqueRequired,
    category:stringTypeSchemaNonUniqueRequired
})

export const productsModel = mongoose.model(productsCollection, productsSchema)