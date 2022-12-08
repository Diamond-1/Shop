var cart = {};//корзина



$.getJSON('manga.json', function (data) {
    var goods = data;//все товары в массиве
    //console.log(goods);
    checkCart();
    console.log(cart);
    showCart();// вывожу товары на стрницу

    function showCart() {
        if ($.isEmptyObject(cart)) {
            var out = 'Корзина пуста. <a href="main.html">Перейти на главную</a> ';
            $('#my-cart').html(out);
        } else {
            var out = '';
            for (let prop in goods) {
                let manga = goods[prop];
                for (var i in cart) {
                    out += '<button class="delete" data-art="' + i + '">x</button>';
                    out += goods.manga[i].name;
                    out += '<button class="minus" data-art="' + i + '" >-</button>';
                    out += cart[i];
                    out += '<button class="plus" data-art="' + i + '" >+</button>';
                    out += cart[i] * goods.manga[i].cost;
                    out += '<br>';
                }
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }

    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS();
        showCart();
    }
    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        } else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localstorage
        showCart();
    }
    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localstorage
        showCart();
    }



});

function checkCart() {
    //проверяю наличие корзины в localstorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    //сохраняю корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart));
}