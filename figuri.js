var cart = {};

$('document').ready(function () {
    loadComics();
    checkCart();
    showMiniCart();
});
function loadComics() {
    $.getJSON('figuri.json', function (data) {
        // console.log(data.comics[key].name);
        var out = '';
        for (let prop in data) {
            let figuri = data[prop];
            // if (data.comics != true) {
            for (let key in figuri) {
                out += '<div class="single-figuri">';
                out += '<img src="' + data.figuri[key].image + '">';
                out += '<div class="figuri-text">';
                out += '<p>' + data.figuri[key]['name'] + '</p>';
                out += '<p> Описание: ' + data.figuri[key].description + ' </p>';
                out += '<p> Цена: ' + data.figuri[key]['cost'] + ' руб.</p>';
                out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
                out += '</div>';
                out += '</div>';
                console.log(data.figuri[key].name);
            }
            // } else {
            //     console.log(data.comics);
            //     break;
            // }
        }
        $('#figuri').html(out);
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

