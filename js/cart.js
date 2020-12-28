'use strict';

// Модуль корзины
var cart = (function ($) {

    var cartData,
        opts = {};

    // Инициализация модуля
    function init(options) {
        _initOptions(options);
        updateData();
        if (opts.renderCartOnInit) {
            renderCart();
        }
        if (opts.renderMenuCartOnInit) {
            renderMenuCart();
        }
        _bindHandlers();
    }

    // Инициализируем настройки
    function _initOptions(options) {
        var defaultOptions = {
            renderCartOnInit: true,                     // рендерить ли корзину при инициализации
            renderMenuCartOnInit: true,                 // рендерить ли количество товаров в меню при инициализации
            elAddToCart: '.js-add-to-cart',             // селектор для кнопки добавления в корзину
            attrId: 'data-id',                          // дата-атрибут для id товара
            attrName: 'data-name',                      // дата-атрибут для названия товара
            attrPrice: 'data-price',                    // дата-атрибут для цены товара
            attrDelta: 'data-delta',                    // дата-атрибут, показывающий, на сколько нужно изменить количество товара в корзине (-1 и 1)
            elCart: '#cart',                            // селектор для содержимого корзины
            elTotalCartCount: '#total-cart-count',      // селектор для количества товаров в корзине
            elTotalCartSumma: '#total-cart-summa',      // селектор для общей суммы заказа
            elCartItem: '.js-cart-item',                // селектор для отдельного пункта корзины
            elCartCount: '.js-count',                   // селектор для количества отдельного товара
            elCartSumma: '.js-summa',                   // селектор для суммы отдельного товара
            elChangeCount: '.js-change-count',          // селектор для кнопок изменения количества
            elRemoveFromCart: '.js-remove-from-cart',   // селектор для кнопки удаления из корзины
            elOrder: '#order'                           // селектор для кнопки оформления заказа            
        }
        _.defaults(options || {}, defaultOptions);
        opts = _.clone(options);
    }

    // Навешивам события
    function _bindHandlers() {
        _onClickAddBtn();
        _onClickChangeCountInCart();
        _onClickRemoveFromCart();
        _onClickOrder();
    }





    // Получаем данные
    function updateData() {
        cartData = JSON.parse(localStorage.getItem('cart')) || [];
        return cartData;
    }

    // Возвращаем данные
    function getData() {
        return cartData;
    }

    // Сохраняем данные в localStorage
    function saveData() {
        localStorage.setItem('cart', JSON.stringify(cartData));
        return cartData;
    }

    // Очищаем данные
    function clearData() {
        cartData = [];
        saveData();
        return cartData;
    }

    // Поиск объекта в коллекции cartData по id
    function getById(id) {
        return _.findWhere(cartData, { id: id });
    }

    // Добавление товара в коллекцию
    function add(item) {
        var oldItem;
        updateData();
        oldItem = getById(item.id);
        if (!oldItem) {
            cartData.push(item);
        } else {
            oldItem.count = oldItem.count + item.count;
        }
        saveData();
        return item;
    }

    // Удаление товара из коллекции
    function remove(id) {
        updateData();
        cartData = _.reject(cartData, function (item) {
            return item.id === id;
        });
        saveData();
        return cartData;
    }

    // Изменение количества товара в коллекции
    function changeCount(id, delta) {
        var item;
        updateData();
        item = getById(id);
        if (item) {
            item.count = item.count + delta;
            if (item.count < 1) {
                remove(id);
            }
            saveData();
        }
        return _.findWhere(cartData, { id: id }) || {};
    }

    // Возвращаем количество товаров (количество видов товаров в корзине)
    function getCount() {
        return _.size(cartData);
    }

    // Возвращаем общее количество товаров 
    function getCountAll() {
        return _.reduce(cartData, function (sum, item) { return sum + item.count }, 0);
    }

    // Возвращаем общую сумму
    function getSumma() {
        return _.reduce(cartData, function (sum, item) { return sum + item.count * item.price }, 0);
    }






    // Рендерим корзину
    function renderCart() {
        var template = _.template($('#cart-template').html()),
            data = {
                goods: cartData
            };
        $(opts.elCart).html(template(data));
        renderTotalCartSumma();
    }

    // Рендерим количество товаров в меню
    function renderMenuCart() {
        var countAll = getCountAll();
        $(opts.elTotalCartCount).html(countAll !== 0 ? countAll : '');
    }

    // Рендерим общую сумму товаров
    function renderTotalCartSumma() {
        $(opts.elTotalCartSumma).html(getSumma());
    }



    // Поиск продукта в корзине по id
    function findCartElemById(id) {
        return $(opts.elCartItem + '[' + opts.attrId + '="' + id + '"]');
    }

    // Добавление в корзину
    function _onClickAddBtn() {
        $('body').on('click', opts.elAddToCart, function (e) {
            var $this = $(this);
            add({
                id: +$this.attr(opts.attrId),
                name: $this.attr(opts.attrName),
                price: +$this.attr(opts.attrPrice),
                count: 1
            });
            renderMenuCart();
            alert('Товар добавлен в корзину');
        });
    }

    // Меняем количество товаров в корзине
    function _onClickChangeCountInCart() {
        $('body').on('click', opts.elChangeCount, function (e) {
            var $this = $(this),
                id = +$this.attr(opts.attrId),
                delta = +$this.attr(opts.attrDelta),
                $cartElem = findCartElemById(id),
                cartItem = changeCount(id, delta);
            if (cartItem.count) {
                $cartElem.find(opts.elCartCount).html(cartItem.count);
                $cartElem.find(opts.elCartSumma).html(cartItem.count * cartItem.price);
            } else {
                $cartElem.remove();
            }
            renderMenuCart();
            renderTotalCartSumma();
        });
    }

    // Удаляем товар из корзине
    function _onClickRemoveFromCart() {
        $('body').on('click', opts.elRemoveFromCart, function (e) {
            if (!confirm('Удалить товар из корзины?')) return false;
            var $this = $(this),
                id = +$this.attr(opts.attrId),
                $cartElem = findCartElemById(id);
            remove(id);
            $cartElem.remove();
            renderMenuCart();
            renderTotalCartSumma();
        });
    }

    // Оформляем заказ 
    function _onClickOrder() {
        $('body').on('click', opts.elOrder, function (e) {
            // Предоставлю написать код для оформления заказа и отправки данных на сервер самим
            alert('Оформляем заказ :-)');
        });
    }

    // Экспортируем наружу
    return {
        init: init,
        update: updateData,
        getData: getData,
        save: saveData,
        clearData: clearData,
        getById: getById,
        add: add,
        remove: remove,
        changeCount: changeCount,
        getCount: getCount,
        getCountAll: getCountAll,
        getSumma: getSumma
    }

})(jQuery);