import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe('Testing ANB App',()=>{
    describe('Testing carts Api',()=>{
    //Test 01
        it('Crear un carrito: El Api POST /api/carts/ debe crear un carrito nuevo correctamente', async ()=>{
            //Given
            const cartMock = {
                products: []
            }
            //Then
            //const result = await requester.post("/api/carts").send(cartMock)
            const {statusCode,ok } = await requester.post("/api/carts").send(cartMock)
            console.log('------TEST 01------')
            //console.log(result)
            console.log('------')
            console.log(ok)
            console.log('------')
            console.log(statusCode)
            console.log('------')
            //Assert that
            expect(statusCode).to.not.be.equal(400)
            expect(statusCode).to.be.equal(200)
        })
    })
    //Test 02
    // it('Agregar un producto a un carrito: El API POST /api/carts/:cid/product/:pid debe agregar un producto al carrito correctamente', async()=>{
    //     //Given
    //     const productToCartMock = {
    //         quantity: 1
    //     }
    //     //Then
    //     const {result} = await requester.post("api/carts/645d8edbab7586f8f84d1d9c/product/64c2cd236901d74204df1888").send(productToCartMock)
    //         console.log('------TEST 02------')
    //         console.log(result)
    //         console.log('------')
    //         //console.log(ok)
    //         console.log('------')
    //         //console.log(statusCode)
    //         console.log('------')
    //     //Assert that
    //     //expect(statusCode).to.not.be.equal(400)
    //     // expect(statusCode).to.be.ok
    //     // expect(ok).to.not.be.false
    // })
})
