const productsContainer = document.querySelector(".products")
const allProductsContainer = document.querySelector(".allProducts")
const allCategories = document.querySelector(".allCategories")
const singleProduct = document.querySelector(".single-product")
const categoryProduct = document.querySelector(".category-product")
const profile = document.querySelector(".user-profile")
const relatedProducts = document.querySelector(".related-products")
const cartProducts = document.querySelector("#contentCart")

const products = JSON.parse(localStorage.getItem("products"))
const oneProduct = JSON.parse(localStorage.getItem("single-product"))
const userProfile = JSON.parse(localStorage.getItem("LoggedIn"))


let getProducts = () =>{
    fetch("http://127.0.0.1:5501/products.json")
    .then(response=>response.json())
    .then((data) =>{ 
        let result = data
        saveProducts(result)
    })
}

window.onload = function () {
    if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
    }
}

let displayProducts = () =>{
    let result = ""
    if(products){
    products.splice(0,8).forEach(product=>{
        result += `
            <div class="col4 product" data-id=${product.id}>
                <img src=${product.image}>
                <h2>${product.product}</h2>
                <p>${product.price}</p>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
        `
    })
    }
    productsContainer.innerHTML = result
}
if(productsContainer){
    displayProducts()  
}
// let displayProducts = () =>{
//     let result = ""
//     if(products){
//     let rate = JSON.parse(localStorage.getItem("ratings"))
//     rate.map(p=>{
//         let ratings = rate.find(product=>product.product === p.product)
//         console.log(ratings.rate)
//     products.splice(0,8).forEach(product=>{
//         result += `
//             <div class="col4 product" data-id=${product.id}>
//             <img src=${product.image}>
//             <h2>${product.product}</h2>
//             <p>${product.price}</p>`
//         result += `<div class="rating">`
//         if(ratings.rate == 5){
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//         }else if(ratings.rate === 4){
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//         }else if(ratings.rate === 3){
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//         }else if(ratings.rate === 2){
//             result += `<i class="fa fa-star"></i>`
//             result += `<i class="fa fa-star"></i>`
//         }else if(ratings.rate === 1){
//             result += `<i class="fa fa-star"></i>`
//         }else{
//             result += `<i class="far fa-star"></i>`
//             result += `<i class="far fa-star"></i>`
//             result += `<i class="far fa-star"></i>`
//             result += `<i class="far fa-star"></i>`
//             result += `<i class="far fa-star"></i>`
//         }
//         result += `</div>`
//         result += `</div>`
//         })
//     })
//     }
//     productsContainer.innerHTML = result
// }
// if(productsContainer){
//     displayProducts()  
// }

let allProducts = () =>{
    let result = ""
        if(products){
            products.map((product)=>{
            result += `<div class="col4 product" data-id=${product.id}>
                <img src=${product.image}>
                <h2>${product.product}</h2>
                <p>${product.price}</p>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
        ` 
        })
        allProductsContainer.innerHTML = result
    }
}
if(allProductsContainer){
    allProducts()
}

let categoryProducts = () =>{
    let result = ""

    //get all categories
    const products = JSON.parse(localStorage.getItem("products"))
    const categories = Object.values(products.reduce((a,{category})=>{
        a[category]={category}
        return a;
    },{}))
    

    if(categories){
        categories.forEach(c=>{
            result += `
                <div class="col product-cat">
                    <a href="#" class="fetchCategories">${c.category}</a>
                </div>
            `
        })
        allCategories.innerHTML = result
    }
}

if(allCategories && products){
    categoryProducts()  
}

let AddSingleProduct = () =>{
    const products = [...document.querySelectorAll(".product")];
    products.forEach(product=>{
        let productId = product.dataset.id
        product.addEventListener("click",(event)=>{
            //get single product
            event.preventDefault()
            let productItem = getProduct(productId)
            localStorage.setItem("single-product",JSON.stringify(productItem))
            window.location ="product.html"
        })
    })
}
AddSingleProduct()

let AddCategories = () =>{
    const categories = document.querySelectorAll(".fetchCategories");
    const products = JSON.parse(localStorage.getItem("products"))
    
    categories.forEach(category=>{
        category.addEventListener("click",(event)=>{
            event.preventDefault()
            let filtered = products.filter(product=>product.category.toLowerCase() == category.innerText.toLowerCase())
            localStorage.setItem("category-products",JSON.stringify(filtered))
            window.location ="categories.html"
        })
    })
    
}
AddCategories()

let getSingleProduct = () =>{
    let result = ""
    if(oneProduct){
        result += `
        <div class="row row2">
            <div class="product-col4">
                <img src=${oneProduct.image}>
            </div>
            <div class="col-single">
                <h2>${oneProduct.product}</h2>
                <h4>${oneProduct.price}</h4>
                <h3 id="details">Description</h3>
                <p>${oneProduct.details}</p>
                <h3 id="details">In Stock</h3>
                <p>${oneProduct.stock}</p>
                <input type="number" value="1" min="1" id="cart-input"/>
                <button class="btn cartBtn" data-id=${oneProduct.id}><i class="fa fa-shopping-cart"></i> Add to cart</button>
            </div>
        </div>
        `
    }else{
        window.location = "index.html"
    }
    singleProduct.innerHTML = result

}
if(singleProduct){
    getSingleProduct()
}

let getCategoryProducts = () =>{
    let result = ""
    let categories = JSON.parse(localStorage.getItem("category-products"))
    if(categories){
        categories.forEach(category=>{
        result += `
            <div class="col4 product" data-id=${category.id}>
                <img src=${category.image}>
                <h2>${category.product}</h2>
                <p>${category.price}</p>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
        `
        })
    }else{
        window.location = "index.html"
    }
    categoryProduct.innerHTML = result
}
if(categoryProduct){
    getCategoryProducts()
    AddSingleProduct()
}

let getUser = () =>{
    let result = ""
    if(userProfile){
        let history = JSON.parse(localStorage.getItem("order-history"))
        result += `
            <p>You're logged in as </p>
            <h4>${userProfile[0].email}</h4>
            <p class="listHistory">Recent orders </p>
        `
        if(history){
            history.map(user=>{
            result += `
            <li class="listHistory">
                ${user.product}(${user.category}) - ${user.price}
            </li>
            `
            })
        }else{
            result += `<li id="profileHis">
                You have no order history
            </li>`
        }
    }
    profile.innerHTML = result

}
if(profile){
    getUser()
}

let getRelatedProducts = () =>{
    let result = ""
    let category = oneProduct.category
    //get related products using categories
    const related = products.filter(product => product.category === category)

    if(related){
        related.forEach(product=>{
        result += `
            <div class="col4 product" data-id=${product.id}>
                <img src=${product.image}>
                <h2>${product.product}</h2>
                <p>${product.price}</p>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>
        `
    })
    }else{
        let error = document.getElementById("noRelation")
        if(error) error.innerText = `There are no related products.`

    }
    relatedProducts.innerHTML = result

}
if(relatedProducts){
    getRelatedProducts()
    AddSingleProduct()

}

let shuffleProducts = (array) =>{
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random() + (i +1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let saveProducts = (products) =>{
    localStorage.setItem("products",JSON.stringify(products))
}

let getProduct = (id) =>{
    let products = JSON.parse(localStorage.getItem("products"))
    return products.find(product => product.id == id)
}

let saveCart = (cart) =>{
    localStorage.setItem("cart",JSON.stringify(cart))
}


const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
let table = document.querySelector("table")
let cart = () =>{
    let result = ""
    let items = JSON.parse(localStorage.getItem("cart"))

    if(items){
        result += `<table>`
        result += `<tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <div id="cart-error"></div>
        </tr>`
            items.forEach(product=>{
                result += `<tr>`
                result += `<td>
                    <div class="cart-content">
                        <img src="${product.image}"/>
                    <div  class="cart-item">
                        <p>${product.product}</p>
                        <small>Price: ${product.price}</small>
                        <br/>
                        
                    </div>
                    </div>
                </td>
                <td>
                    <p>${product.amount}</p>
                </td>
                <td class="cart-total">UGX. ${Number(parseInt(product.price.split("UGX.").pop()) * 1000 * product.amount).toLocaleString()}</td>`
                result += `</tr>`
                // <a href="#" class="remove-Item" data-id=${product.id}>Remove</a>
            })
    }else{
        document.querySelector("#cart-error").innerText = `There are currently no items in the cart`
        document.querySelector("#cart-error").style.color ="#dc3545"
        document.querySelector("#cart-error").style.textAlign ="center"

        let clear_cart = document.querySelector(".clear-cart")
        let checkout = document.querySelector(".checkout")

        clear_cart.innerHTML = `<a href="index.html" class="backHome">Home</a>`
        checkout.innerHTML = `<a href="shop.html" class="backProducts">Products</a>`
    }
    cartProducts.innerHTML = result
}
if(cartProducts){
    cart()
}

let sumCart = (value) => {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += value[i];
  }
  return sum;
}

let cartSum = document.querySelector(".total-price")
let sumPrice = 0
let sumAmount = 0

let cartTotals = () =>{  
    let result = ""
    let products = JSON.parse(localStorage.getItem("cart"))

    if(products){
        products.map(item=>{
            sumPrice += Number(parseInt(item.price.split("UGX.").pop()) * 1000 * item.amount)
            sumAmount += item.amount
        })

            result += `<table>`
            result += `<tr>`
            result += `<td>Subtotal</td>`
            
            result += `<td>UGX. ${(sumPrice).toLocaleString()}</td>`
            result += `</tr>`

            result += `<tr>`
            result += `<td>VAT (10%)</td>`
            result += `<td>UGX. ${(Math.round(sumPrice * 0.1) + sumPrice).toLocaleString()}</td>`
            result += `</tr>`

            result += `<tr>`
            result += `<td>Grand total</td>`
            result += `<td>UGX.  ${Number(Math.round(sumPrice * 0.1) + sumPrice).toLocaleString()}</td>`
            result += `</tr>`

            result += `</table>`
    }else{
        document.querySelector("#total-error").innerText = ``
        document.querySelector("#total-error").style.color ="#dc3545"
        document.querySelector("#total-error").style.textAlign ="center"
    }
    cartSum.innerHTML = result
}

if(cartSum){
    cartTotals()
}

let clear = document.querySelector(".clear-cart") 
let clearCart = () =>{
    clear.addEventListener("click",(e)=>{
        e.preventDefault()
        localStorage.removeItem('cart');
        window.location = "cart.html"
    })
}

let checkout = document.querySelector(".checkout") 
let cartCheckout = () =>{
    checkout.addEventListener("click",(e)=>{
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem("users"))
        let LoggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
        let order = JSON.parse(localStorage.getItem("cart"))
        let history = [...LoggedIn,...order]
        if(!order){
            window.location = "products.html"
        }
        if(!user){
            window.location = "signin.html"
        }

        if(LoggedIn){
            localStorage.setItem("order-history",JSON.stringify(history))
            localStorage.removeItem('cart');
            alert("Your order has been confirmed.")
            window.location = "index.html"
        }else{
            window.location = "signin.html"
        }
    })
}
if(checkout){
    cartCheckout()
}

// if(localStorage.getItem("cart") === "" || localStorage.getItem("cart") == null){
//     clear.disabled = true
// }

// let itemOne = document.querySelector(".remove-Item")
const cartsContent = document.querySelectorAll(".cart-content")
if(cartsContent){
    cartsContent.forEach(cart=>{
        cart.addEventListener("click",(e)=>{
        e.preventDefault()
        if(e.target.classList.contains("remove-Item")){
            let removeItem = e.target
            let id = removeItem.dataset.id
            removedItem(id)
        }
        })
       
    })
}


// if(cartsContent){
//     removeOneItem()
// }

let removedItem = (id) =>{
    let cart_ = JSON.parse(localStorage.getItem("cart"))
    let items  = cart_.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(items));
}

if(clear){
    clearCart()
}

let search = () =>{
    let searchQuery = document.querySelector("#search")
    let search = document.querySelector("#searchGadget")
    let errorSearch = document.querySelector("#errorSearch")
    let result = ""

    search.addEventListener("submit",(e)=>{
        e.preventDefault()

        let products = JSON.parse(localStorage.getItem("products"))
        const searched = products.filter(product => 
            (product.category).toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (product.product).toLowerCase().includes(searchQuery.value.toLowerCase())
        )

        if(searchQuery.value === ""){
            searchQuery.style.border = "solid 1px #dc3545"
            errorSearch.style.color="#dc3545"
            errorSearch.style.float="left"
            errorSearch.innerText = "The search value is required." 
        }

        if(searched){
            searched.map(product=>{
            result += `<div class="col4 product" data-id=${product.id}>
                            <img src=${product.image}>
                            <h2>${product.product}</h2>
                            <p>${product.price}</p>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                    ` 
                    })
            productsContainer.innerHTML = result
            AddSingleProduct()
            searchQuery.addEventListener("keypress",()=>{
                location.reload()
            })
        }else{
            console.log("something went wrong")   
        }
    })
}
if(productsContainer){
    search()
}

let container = document.querySelector(".rating")

let rateProduct = ()=>{
const items = container.querySelectorAll(".rating-item")
container.onclick = e =>{
    let elClass = e.target.classList
    if(!elClass.contains("active")){
        items.forEach(
            item => item.classList.remove("active")
        );
        // console.log(e.target.getAttribute("data-rate"),oneProduct.product)
        elClass.add("active")   
        }
        let rate = JSON.parse(localStorage.getItem("ratings"))
        let product = rate.some(rate=>rate.product === oneProduct.product)
        if(rate && !product){
            rate.push({"product":oneProduct.product,"rate":e.target.getAttribute("data-rate")})
            localStorage.setItem("ratings",JSON.stringify(rate)) 
        }
    }
}
if(container){
    rateProduct()
}

let itemsInCart = document.querySelector("#itemsNum")
let ItemsCart = () =>{
    if(JSON.parse(localStorage.getItem("cart"))){
        let items = Object.keys(JSON.parse(localStorage.getItem("cart"))).length
        if(items > 0){
            itemsInCart.innerText = items
        }else{
            itemsInCart.innerText =  0
        }
    }else{
        itemsInCart.innerText =  0
    }
}

if(itemsInCart){
    setInterval(ItemsCart,3000);
    ItemsCart()
}

let addCart = () =>{
    const cartBtn = document.querySelector(".cartBtn")
    let id = cartBtn.dataset.id;
    const Qty = document.querySelector("#cart-input")
    let cart = []
    
    cartBtn.addEventListener("click",(e)=>{
        e.preventDefault()

        let exists = JSON.parse(localStorage.getItem("cart"))

        if(exists && exists.some(c=> c.id == id)){
            document.querySelector("#cart-error").innerText = `This product already exists in the cart`
            document.querySelector("#cart-error").style.color ="#dc3545"
            document.querySelector("#cart-error").style.textAlign ="center"
        }else{
        // e.target.disabled = true

            if(JSON.parse(localStorage.getItem("cart"))){
                cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.push({...getProduct(id),amount:Qty.value})
            saveCart(cart)
            
            document.querySelector("#cart-error").innerText = `The product has been added to the cart`
            document.querySelector("#cart-error").style.color ="#28a745"
            document.querySelector("#cart-error").style.textAlign ="center"

            // cartValues(cart)
        }
    })
}

if(document.querySelector(".cartBtn")){
    addCart()
}

let validateEmail = (email) =>{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

let validateName = (name) =>{
  let regexName = /^[a-zA-Z].*[\s\.]*$/;
  if (name.match(regexName)) {
    return true; 
  } else {
    return false; 
  }
}

const signUp = document.querySelector("#signUp")
const signIn = document.querySelector("#signIn")

let emailSign = document.querySelector("#email-sign")
let passwordSign = document.querySelector("#password-sign")

let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let reg_error = document.querySelector("#reg-error")
let login_error = document.querySelector("#login-error")

let register = () =>{
    signUp.addEventListener("submit",(e)=>{
    let storedUsers = JSON.parse(localStorage.getItem("users"))

    let messages = []
    if(username.value === "" || username == null){
        messages.push("The username field is required.")
    }
    if(storedUsers !== null && storedUsers.some(user => user.username == username.value)){
        messages.push("The username already exits.")
    }
    if(!validateName(username.value) && username.value !== ""){
        messages.push("The username is invalid")
    }
    if(email.value === "" || email == null){
        messages.push("The email address field is required")
    }
    if(!validateEmail(email.value) && email.value !== ""){
        messages.push("The email address is invalid")
    }
    if(storedUsers !== null && storedUsers.some(user => user.email == email.value)){
        messages.push("The email address already exits.")
    }
    if(password.value === "" || password == null){
        messages.push("The password field is required")
    }

    if(messages.length > 0){
        e.preventDefault()
        reg_error.innerHTML = messages.join('<br/>')
        reg_error.style.textAlign = "left"
        reg_error.style.paddingLeft = "20px"
    }else{
        saveUser()
    }
})
}

let login = () =>{
    signIn.addEventListener("submit",(e)=>{

    let messages = []
    if(emailSign.value === "" || emailSign == null){
        messages.push("The email address field is required")
    }
    if(passwordSign.value === "" || passwordSign == null){
        messages.push("The password field is required")
    }
    if(!validateEmail(emailSign.value) && emailSign.value !== ""){
        messages.push("The email address is invalid")
    }
    if(messages.length > 0){
        e.preventDefault()
        login_error.innerHTML = messages.join('<br/>')
        login_error.style.textAlign = "left"
        login_error.style.paddingLeft = "20px"
    }else{
        e.preventDefault()
        checkUser()
    }
})
}

if(signIn){
    login()
}

let loggedIn = () =>{
    let logged = JSON.parse(localStorage.getItem("LoggedIn"))

    let logUser = document.querySelector("#log")
    let regUser = document.querySelector("#reg")

    if(logged){
        logUser.innerHTML = `<li><a href="profile.html">profile</a></li>`
        regUser.innerHTML = `<li id="logout"><a href="#">Logout</a></li>`
    }
}

loggedIn()

let signOut = document.querySelector("#logout")
let logOut = () =>{
    // let logged = localStorage.getItem("LoggedIn")
    signOut.addEventListener("click",(e)=>{
        e.preventDefault()
        localStorage.removeItem('LoggedIn');
        window.location ="index.html"
    })
}
if(signOut){
    logOut()
}

let checkUser = () =>{
    let user_email = emailSign.value
    let user_password = passwordSign.value
    
    let storedUsers = JSON.parse(localStorage.getItem("users"))
    if(storedUsers){
        storedUsers.map(user=>{
            if(user_email === user.email && user_password === user.password){
                document.querySelector("#login-error").innerText = " "
                localStorage.setItem('LoggedIn', JSON.stringify([{email:user_email,password:user_password}]));
                return location.replace("index.html");
            }else{
                document.querySelector("#login-error").innerText = `Invalid email password combination.`
                document.querySelector("#login-error").style.color ="#dc3545"
                document.querySelector("#login-error").style.textAlign ="left"
            }
            
        })
    }
}
let saveUser = () =>{
    let user_email = email.value
    let user_name = username.value
    let user_password = password.value

    let storedUsers = JSON.parse(localStorage.getItem("users"))

    if(storedUsers){
        storedUsers.push({username:user_name,email:user_email,password:user_password})
        localStorage.setItem("users",JSON.stringify(storedUsers))
    }else{
        localStorage.setItem("users",JSON.stringify([{username:user_name,email:user_email,password:user_password}]))
    }
}

if(signUp){
    register()
}

document.addEventListener("DOMContentLoaded",()=>{
    if(productsContainer){
        getProducts()   
    }
})