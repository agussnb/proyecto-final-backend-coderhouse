import mongoose from 'mongoose'
import UserManager from '../../dao/DB/UserManager.js'
import Assert from 'assert'
//Testeo con Mocha
mongoose.connect('mongodb://localhost:27017/ecommerce?retryWrites=true&w=majority')

const assert = Assert.strict

//Escenario
describe('Testing users dao',()=>{

    before(function (){
        this.userManager = new UserManager()
    })

    beforeEach(function (){
        this.timeout(5000)
        mongoose.connection.collections.users.drop()
    })

    //Test 01
    it('El dao debe devolver los usuarios en formato arreglo', async function(){
        console.log(this.userManager)
        //Given
        const isArray = true

        //Then
        const userId = '6487360198f20073b2336283'
        const result = await this.userManager.get();
        console.log(`El resultado es un array ?: ${Array.isArray(result)}`)

        //Assert that
        assert.strictEqual(Array.isArray(result), isArray)
    })
})