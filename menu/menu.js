// variables
import data from "./products.json"

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector(".close-cart")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")

const recommendationDOM = document.querySelector(".cart1")
console.log(recommendationDOM)
// const closeUserBtn = document.querySelector(".clear-recommend")

const recommendOverlay = document.querySelector(".recommend-overlay")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".products-center")
const userBtn = document.querySelector('.user')
console.log(productsDOM)
const dropdownBtn = document.querySelector('.dropdown')
console.log(dropdownBtn)

//cart
let cart = []
//buttons
let buttonsDOM = []

//getting the products
class Meals{
    async getMeals(){ // synchronous code in asynchronous manner
        try{
            // let result = await fetch('products.json')// ajax request
            // let data = await result.json()
            // console.log(data)
            let items = data.items
             items = items.map(item=>{
                const {title, info, nutrition} = item.fields;
                const {id} = item.sys
                const image = item.fields.image.fields.file.url;
                return {title,info,id,nutrition,image}
            })
            console.log(items)
            return items
            
        } catch(error){
            console.log(error)
        }
    
    }
}
// display products
class UI{
    displayMeals(meals){
        let result = ''
        meals.forEach(meal=>{
            result += `
            <article class="product">
            <div class="img-container">
            <p>
                <img src=${meal.image} class="product-img"/>
                <button class="class bag-btn" data-id=${meal.id}>
                    <i class="fas fa-shopping-cart">
                        Add to Orders
                    </i>
                </button>
                
            </div>
            
          
            <h4>${meal.title}</h4>  
        
            <p class= "description">${meal.info}</p>
        </p>
        <br>
        
        <a tabindex="0" class="banner-btn more-info" role="button" data-html="true"  data-toggle="popover" data-trigger="focus" title="${meal.title}" 
        data-content="${meal.nutrition}">More Info</a>
        </article>
            `
        });
        productsDOM.innerHTML = result;
    }

    getBagButtons() {
        const buttons= [...document.querySelectorAll(".bag-btn")]
        buttonsDOM = buttons
        console.log(buttons)
        buttons.forEach(button=>{
            
            let id= button.dataset.id;
            let inCart = cart.find((item)=>{ 
                console.log(item.id)
               return item.id ===id})
            console.log(inCart)
            if (inCart){
                
                button.innerText= "In Cart"
                button.disabled = true
                console.log(button.disabled)
            }
            else{
                button.addEventListener("click", (event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled= true
                    //get product from products
                    let cartItem = Storage.getMeal(id)
                        // amount:1;
                    cartItem = Object.assign(cartItem, {amount:1})
                    // add product to the cart
                    cart = [...cart,cartItem]

                    //save cart in local storage
                    Storage.saveCart(cart)
                    // set cart values
                    this.setCartValues(cart)
                    //display cart items
                    this.addCartItem(cartItem)
                    //show the cart
                    this.showCart()
                })
                console.log(inCart)
        }
        })
    }
    setCartValues(cart) {
        let tempTotal= 0
        let itemsTotal= 0
        cart.map((item)=>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount

        })
        console.log(itemsTotal,tempTotal)
        cartTotal.innerText = itemsTotal
        cartItems.innerText = itemsTotal

        
    }
    addCartItem(item){

        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
        <img src=${item.image} alt="product" />
        <div>
            <h4>${item.title}</h4>
            <h5>Quantity</h5>
            <span class="remove-item" data-id = ${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id = ${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id = ${item.id}></i>
        </div>`
        cartContent.appendChild(div)

    }
    showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }

    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
        // userBtn.addEventListener('click', this.showRecommendations)
        // closeCartBtn.addEventListener('click', this.hideRecommendations)
    }
    showRecommendations(){
        recommendOverlay.classList.add('transparentBcg')
        recommendationDOM.classList.add('showCart')
        console.log(recommendOverlay)
    }
    hideRecommendations(){
        recommendOverlay.classList.remove('transparentBcg')
        recommendationDOM.classList.remove('showCart')
        console.log(recommendOverlay,recommendationDOM)
    }
    populateCart(cart){
        cart.forEach(item=> this.addCartItem(item));
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }
    cartLogic(){
        //clear cart button
        clearCartBtn.addEventListener('click', ()=>{
            this.clearCart()
        })
        //remove button
        cartContent.addEventListener('click', event=> {
            console.log(event.target)
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id);
            }
            else if (event.target.classList.contains("fa-chevron-up")){
                let addAmount = event.target
                let id = addAmount.dataset.id

                let tempItem = cart.find(item => item.id ===id)
                tempItem.amount = tempItem.amount +1;
                Storage.saveCart(cart)
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains("fa-chevron-down")){
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id

                let tempItem = cart.find(item => item.id ===id)
                tempItem.amount = tempItem.amount -1;
                if (tempItem.amount >0) {
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                    console.log(tempItem.amount)
                }
                else{
                    console.log(tempItem.amount)
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }

            }
        } )
    }
    clearCart(){
        let cartItems = cart.map(item=> item.id)
        console.log(cartItems)
        cartItems.forEach(id=> this.removeItem(id))
        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
    }
    removeItem(id) {
        cart = cart.filter(item=> item.id !==id)
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id)
        button.disabled = false
        button.innerHTML = `<i class = "fas 
        fa-shopping-cart"></i> add to Orders` // need to change this

    }
    getSingleButton(id) {
        return buttonsDOM.find(button=> button.dataset.id === id)
    }
   

}
//local Storage
class Storage{
    static saveMeals(meals){
        localStorage.setItem("meals", JSON.stringify(meals))
    }
    static getMeal(id){
        let meals= JSON.parse(localStorage.getItem('meals'))
        return meals.find(meal=> meal.id===id)
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[]
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    const ui= new UI()
    const meals = new Meals()
    //setup app
    ui.setupAPP()

    //get all meals
    meals.getMeals().then(meals=> {
        ui.displayMeals(meals)
        Storage.saveMeals(meals)
    }).then(()=>{
        ui.getBagButtons()
        ui.cartLogic()
    })
    
})