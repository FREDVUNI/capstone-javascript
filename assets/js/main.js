let menuItems =document.querySelector("#menuItems")
let items =document.querySelector(".items")
menuItems.style.maxHeight = "0px"

function toggleMenu(){
    if(menuItems.style.maxHeight == "0px"){
        menuItems.style.maxHeight = "200px"
    }else{
        menuItems.style.maxHeight = "0px"
    }
}

function toggleUser(){
   if(items.style.maxHeight == "0px"){
        items.style.maxHeight = "200px"
    }else{
        items.style.maxHeight = "0px"
    } 
}
