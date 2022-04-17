const listProducts = [
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
const userCart = [];
const cartList = document.querySelector(".cart-list")
// render sp ra UI
function renderProduct() {
    const item = listProducts.map(product => {
        return (`
                <div class="col l-3 m-4 c-6 product" data-id="${product.id}">
                    <a href="#" class="product-thumbnail">
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
                    </a>
                </div>
        `)
    })
    document.querySelector('.list-of-product').innerHTML = item.join('')
}
renderProduct()
renderQuantityProduct()
function getProductById() {
    const buyBtns = document.querySelectorAll('.add-to-cart-btn');
    for (const buyBtn of buyBtns) {
        buyBtn.onclick = function (e) {
            buyBtnNode = e.target.closest('.product');
            productId = Number(buyBtnNode.dataset.id)
            findProductWithId(productId, listProducts)
        }
    }
}
getProductById()
//tìm sản phẩm có id trùng và đưa vào giỏ (userCart)
function findProductWithId(productId, arr) {
    //tìm trong ds sản phẩm
    for (const product of arr) {
        //trùng id
        if (product.id === productId) {
            //thêm vào giỏ hoặc tăng số lượng hàng
            addToCart(product, userCart)
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
    // totalCart()
    renderTotal()
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
}