const listProductTea = [
    {
        id: 1,
        name: 'Trà phúc bồn tử',
        price: 45000,
        image: './assets/imgs/5.jpg',
    },
    {
        id: 2,
        name: 'Trà vải',
        price: 40000,
        image: './assets/imgs/12.jpg',
    },
    {
        id: 3,
        name: 'Trà dâu tây',
        price: 40000,
        image: './assets/imgs/6.jpg',
    },
    {
        id: 4,
        name: 'Trà chanh',
        price: 30000,
        image: './assets/imgs/11.jpg',
    },
    {
        id: 5,
        name: 'Trà xoài',
        price: 35000,
        image: './assets/imgs/8.jpg',
    },
    {
        id: 6,
        name: 'Trà táo',
        price: 30000,
        image: './assets/imgs/10.jpg',
    },
    {
        id: 7,
        name: 'Trà cam đào',
        price: 45000,
        image: './assets/imgs/9.jpg',
    },
    {
        id: 8,
        name: 'Trà vải',
        price: 40000,
        image: './assets/imgs/12.jpg',
    },
];
const listProductSmoothies = [
    {
        id: 10,
        name: 'Smoothies',
        price: 50000,
        image: './assets/imgs/sm1.jpg',
    },
    {
        id: 11,
        name: 'Smoothies',
        price: 35000,
        image: './assets/imgs/sm2.jpg',
    },
    {
        id: 12,
        name: 'Smoothies',
        price: 45000,
        image: './assets/imgs/sm3.jpg',
    },
    {
        id: 13,
        name: 'Smoothies',
        price: 40000,
        image: './assets/imgs/sm4.jpg',
    },
    
];
const listProductCake = [
    {
        id: 15,
        name: 'Cake',
        price: 50000,
        image: './assets/imgs/cake17.jpg',
    },
    {
        id: 16,
        name: 'Cake',
        price: 35000,
        image: './assets/imgs/cake18.jpg',
    },
    {
        id: 17,
        name: 'Cake',
        price: 45000,
        image: './assets/imgs/cake19.jpg',
    },
    {
        id: 18,
        name: 'Cake',
        price: 40000,
        image: './assets/imgs/cake20.jpg',
    },
    
];
const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
const cartList = document.querySelector(".cart-list")
renderCart()
// mảng bao gồm tất cả sp
const allProducts = [...listProductTea,...listProductSmoothies,...listProductCake]
// render sp ra UI
function renderProduct(listProduct) {
    const item = listProduct.map(product => {
        return (`
                <div class="col l-3 m-4 c-6 product" data-id="${product.id}">
                    <div class="product-thumbnail">
                        <div class="border-img">
                            <div class="img-thumbnail"
                                style="background-image: url('${product.image}');">
                            </div>
                            <button class="add-to-cart-btn">Thêm vào giỏ hàng</button>
                        </div>
                        <h4 class="item-name">${product.name}</h4>
                        <p class="item-price">
                            Giá: <b>${product.price}đ</b>
                        </p>
                    </div>
                </div>
        `)
    })
    document.querySelector('.list-of-product').innerHTML = item.join('')
}
// render sp lần đầu
renderProduct(listProductTea)
getProductById()
renderQuantityProduct()
//lấy id của sp khi click vào nút thêm vào giỏ hàng
function getProductById() {
    const buyBtns = document.querySelector('.list-of-product').querySelectorAll('.add-to-cart-btn');
    for (const buyBtn of buyBtns) {
        buyBtn.onclick = function (e) {
            const buyBtnNode = e.target.closest('.product');
            const productId = Number(buyBtnNode.dataset.id)
            //truyền vào 1 mảng chứa các mảng ds sản phẩm (Spread nối mảng)
            findProductWithId(productId, allProducts)
        }
    }
}
//tìm sản phẩm có id trùng và đưa vào giỏ (userCart)
function findProductWithId(productId, arr) {
    //tìm trong ds sản phẩm
    for (const product of arr) {
        //trùng id
        if (product.id === productId) {
            //thêm vào giỏ hoặc tăng số lượng hàng
            addToCart(product, userCart)
            updateLocalStorage()
            //update lại số lượng sp
            renderQuantityProduct()
            renderCart() //render lại giỏ hàng
            
        }
    }
}
// xử lý thêm vào giỏ hoặc tăng số lượng sp
function addToCart(product) {
    isFound = false;
    // nếu cart trống thì thêm vào
    if (userCart.length == 0) {
        userCart.push(product);
        //thêm số lượng sp
        product.quantity = 1;
        return;
    }
    // tìm sản phẩm trong cart
    for (const item of userCart) {
        //trùng id
        if (item.id === product.id) {
            item.quantity += 1;
            isFound = true;
            return
        }
    }
    // nếu item k có trong cart
    if (!isFound) {
        userCart.push(product);
        product.quantity = 1;
    }
}
// render cart
function renderCart() {
    const cartItem = userCart.map(item => {
        return (`
            <li class="cart-item" data-id="${item.id}">
                <img src="${item.image}" class="cart-item-img" alt="${item.name}" srcset="">
                <div class="cart-item-info">
                    <span class="product-name">${item.name}</span>
                    <span class="product-price">${item.price}đ</span>
                    <input type="number" class="product-quantity" min="1" value="${item.quantity}">
                </div>
                <i class="icon-black remove-item fa-solid fa-xmark"></i>
            </li>
        `)
    })
    cartList.innerHTML = cartItem.join('')
    deleteItemInCart()
    changeAmountItem()
}
checkEmptyCart()
// kiểm tra giỏ hàng có trống hay không
function checkEmptyCart() {
    if(userCart.length == 0){
        document.querySelector('.cart-empty').style.display = "block"
        document.querySelector('.header__cart-list-item').style.display = "none"
    }else{
        document.querySelector('.cart-empty').style.display = "none"
        document.querySelector('.header__cart-list-item').style.display = ""
    }
}

// xóa sp khỏi giỏ hàng
function deleteItemInCart() {
    const deleteBtns = cartList.querySelectorAll('.remove-item')
    for (deleteBtn of deleteBtns) {
        deleteBtn.onclick = function (e) {
            //lấy id của sp đã click
            const deleteBtnNode = e.target.closest('.cart-item');
            itemId = Number(deleteBtnNode.dataset.id)
            removeItemWithId(itemId)
        }
    }
    updateLocalStorage()
    renderTotal()
    //render số lượng Sp
    renderQuantityProduct()
    checkEmptyCart()
}
// xử lý tìm sp và xóa khỏi giỏ
function removeItemWithId(itemId) {
    for (let i = 0; i < userCart.length; i++) {
        if (userCart[i].id === itemId) {
            userCart.splice(i, 1) // xoá sp này khỏi cart
            renderCart()
            return
        }
    }
}
//thay đổi số lượng sp từ giỏ
function changeAmountItem() {
    //lấy các ô input có class product-quantity
    const numberOfItems = cartList.querySelectorAll('.product-quantity');
    for (let numberOfItem of numberOfItems) {
        numberOfItem.onchange = function (e) {
            const amountValue = Number(numberOfItem.value);
            inputNode = e.target.closest('.cart-item')
            //get id sp vừa thay đổi
            const itemId = Number(inputNode.dataset.id)
            // xử lý thay đổi value theo input
            getAmount(itemId, amountValue)
            updateLocalStorage()
        }
    }
}
// xử lý update số lượng từ input về userCart
function getAmount(itemId, value) {
    for (const item of userCart) {
        if (itemId === item.id) {
            item['quantity'] = value;
            // totalCart();
            renderTotal()
            
            return
        }
    }
}
//Tính tổng tiền 
function totalCart() {
    let total = 0;
    for (const item of userCart) {
        total += item.price * item.quantity
    }
    // console.log('Tong Tien: ' + total);
    return total
}
function renderTotal(){
    document.querySelector('.total-pay') .innerText = totalCart()+ 'đ'
}
function renderQuantityProduct() {
    document.querySelector('.header__cart-notice').innerText = userCart.length
    document.querySelector('.header__cart-notice-mobile').innerText = userCart.length
}
function updateLocalStorage(){
    localStorage.setItem('userCart', JSON.stringify(userCart))
}

//tabs product types active when click
const productTypesList = document.querySelector('.product-type__list')
const productTypes = productTypesList.querySelectorAll('.product-type__item')
productTypes.forEach(productType => {
    productType.onclick = function () {
        
        const typeOfProduct = this.getAttribute('productType') //lấy giá trị của attribute productType 
        productTypesList.querySelector('.product-type__item.active').classList.remove('active')
        this.classList.add('active')
        // lấy loại sp đã chọn và render theo mảng riêng
        if (typeOfProduct === 'tea' || typeOfProduct === 'hotTea') {
            renderProduct(listProductTea)
            getProductById()
        } else if (typeOfProduct === 'smoothies' ){
            renderProduct(listProductSmoothies)
            getProductById()
        }else if(typeOfProduct === 'cake'){
            renderProduct(listProductCake)
            getProductById()
        }
        // có thể thêm 
    }
    
});
