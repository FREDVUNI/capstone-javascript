const productsContainer = document.querySelector(".products")
const allProductsContainer = document.querySelector(".allProducts")
const allCategories = document.querySelector(".allCategories")
const singleProduct = document.querySelector(".single-product")
const relatedProducts = document.querySelector(".related-products")
const signUp = document.querySelector("#signUp")

const signIn = document.querySelector("#signIn")
let password = document.querySelector("#password")
let email = document.querySelector("#email")

const products = JSON.parse(localStorage.getItem("products"))
const oneProduct = JSON.parse(localStorage.getItem("single-product"))

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
                    <p>${c.category}</p>
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
                <button class="btn" data-id=${oneProduct.id}><i class="fa fa-shopping-cart"></i> Add to cart</button>
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

// signIn.addEventListener("submit", (e) => {
//   e.preventDefault();
//     if(email.value === ""){
//         email.style.border = "solid 1px #dc3545"
//         document.querySelector("#errorEmail").style.color="#dc3545"
//         document.querySelector("#errorEmail").style.float="left"
//         document.querySelector("#errorEmail").innerText = "The field email is required."
//     }else{
//         email.style.border = "solid 1px #ccc"
//         document.querySelector("#errorEmail").innerText = ""
//     }
//     if(password.value === ""){
//         password.style.border = "solid 1px #dc3545"
//         document.querySelector("#errorPassword").style.color="#dc3545"
//         document.querySelector("#errorPassword").style.float="left"
//         document.querySelector("#errorPassword").innerText = "The field password is required."        
//     }else{
//         password.style.border = "solid 1px #ccc"
//         document.querySelector("#errorEmail").innerText = ""
//     }
// });

document.addEventListener("DOMContentLoaded",()=>{
    if(productsContainer){
        getProducts()   
    }
})