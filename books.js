var cart = {};

$('document').ready(function () {
    loadComics();
    checkCart();
    showMiniCart();
});
function loadComics() {
    $.getJSON('books.json', function (data) {
        // console.log(data.comics[key].name);
        var out = '';
        for (let prop in data) {
            let books = data[prop];
            // if (data.comics != true) {
            for (let key in books) {
                out += '<div class="single-book">';
                out += '<img src="' + data.books[key].image + '">';
                out += '<div class="books-text">';
                out += '<p>' + data.books[key]['name'] + '</p>';
                out += '<p> Описание: ' + data.books[key].description + ' </p>';
                out += '<p> Цена: ' + data.books[key]['cost'] + ' руб.</p>';
                out += '<button class="add-to-cart" data-art="' + key + '">В корзину</button>';
                out += '</div>';
                out += '</div>';
                console.log(data.books[key].name);
            }
            // } else {
            //     console.log(data.comics);
            //     break;
            // }
        }
        $('#books').html(out);
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

