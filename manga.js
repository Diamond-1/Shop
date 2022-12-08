var cart = {};

$('document').ready(function () {
    loadComics();
    checkCart();
    showMiniCart();
});
function loadComics() {
    $.getJSON('manga.json', function (data) {
        //console.log(data);
        var out = '';
        for (let prop in data) {
            let manga = data[prop];
            for (let key in manga) {
                out += '<div class="single-comics">';
                out += '<img src="' + data.manga[key].image + '">';
                out += '<div class="comics-text">';
                out += '<p>' + data.manga[key]['name'] + '</p>';
                out += '<p> Описание: ' + data.manga[key].description + ' </p>';
                out += '<p> Цена: ' + data.manga[key]['cost'] + ' руб.</p>';
                out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
                out += '</div>';
                out += '</div>';
                // console.log(data.manga[key].name);
            }
        }
        $('#comics').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    //добавляю товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    showMiniCart();
}
function checkCart() {
    //проверяю наличие корзины в localstorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
function showMiniCart() {
    //показываю содержимое корзины
    var out = '';
    for (var i in cart) {
        out += '<a href="cart.html"> <img src="images/iconfinder_shopping-cart_2561279.svg"> </a> ';
    }
    $('#mini-cart').html(out);
}

