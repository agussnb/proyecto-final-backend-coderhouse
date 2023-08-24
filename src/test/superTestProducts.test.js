import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe('Testing ANB App',()=>{
    describe('Testing products Api',()=>{
        //Test 01
        it('Crear producto nuevo: El API POST /api/products debe crear un nuevo producto correctamente', async ()=>{
            //Given
            const productMock ={
                title:"titleTest",
                description:"descriptionTest",
                price:1,
                thumbnail:"thumbnailTest",
                code:999,
                stock:999
            }
            //Then
            const {_body, ok, statusCode} = await requester.post("/api/products").send(productMock)
            console.log('------TEST 01------')
            console.log(_body)
            console.log('------')
            console.log(ok)
            console.log('------')
            console.log(statusCode)
            console.log('------')
            //Assert that
            expect(statusCode).is.equal(200)
        })
    })
    //Test 02
    it('Modificar un producto: El API PUT /api/products/:pid', async ()=>{
        //Given
        const updatedProductMock = {
                title:"titleTest",
                description:"descriptionTest",
                price:1000,
                thumbnail:"thumbnailTest",
                code:99,
                stock:99
        }
        //Then 
        const {_body, ok ,statusCode} = await requester.put('/api/products/64c2cd236901d74204df1888').send(updatedProductMock)
        console.log('------TEST 02------')
        console.log(_body)
        console.log('------')
        console.log(ok)
        console.log('------')
        console.log(statusCode)
        console.log('------')
        //Assert that
        expect(statusCode).is.equal(200)
    })
    //Test 03
    // it('Eliminar un producto: El API DELETE /api/products/:pid debe eliminar un producto correctamente', async ()=>{
    //     //Given
        
    //     //Then
    //     const {_body, ok, statusCode} = await requester.delete('/api/products/64c2cd236901d74204df1888')
    //     console.log('------TEST 03------')
    //     console.log(_body)
    //     console.log('------')
    //     console.log(ok)
    //     console.log('------')
    //     console.log(statusCode)
    //     console.log('------')
    //     //Assert that
    //    // expect(statusCode).is.ok
    //    // expect(_body).to.be.ok.and.to.have.property('status')
    // })
})