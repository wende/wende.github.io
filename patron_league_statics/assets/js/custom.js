(function ($) {
    "use strict";

    /* ---------------------------------------------- /*
     * Preloader
     /* ---------------------------------------------- */

    $(window).load(function () {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function () {
        /* ---------------------------------------------- /*
         * Initialization general scripts for all pages
         /* ---------------------------------------------- */

        var overlayMenu = $('#overlay-menu'),
            navbar = $('.navbar-custom'),
            modules = $('.module-hero, .module, .module-small'),
            windowWidth = Math.max($(window).width(), window.innerWidth),
            navbatTrans;

        navbarCheck(navbar);

        $(window).resize(function () {
            windowWidth = Math.max($(window).width(), window.innerWidth);
        });

        $(window).scroll(function () {
            if (windowWidth > 960) {
                navbarAnimation(navbar);
            }
        }).scroll();

        /* ---------------------------------------------- /*
         * Setting background of modules
         /* ---------------------------------------------- */

        modules.each(function () {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarCheck() {
            if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
                navbatTrans = true;
            } else {
                navbatTrans = false;
            }
        }

        function navbarAnimation(navbar) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && navbatTrans !== false) {
                if (topScroll >= 5) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Show/Hide overlay menu
         /* ---------------------------------------------- */

        $('#toggle-menu').on('click', function () {
            showMenu();
            $('body').addClass('aux-navigation-active');
            return false;
        });

        $('#overlay-menu-hide').on('click', function () {
            hideMenu();
            $('body').removeClass('aux-navigation-active');
            return false;
        });

        $(window).keydown(function (e) {
            if (overlayMenu.hasClass('active')) {
                if (e.which === 27) {
                    hideMenu();
                }
            }
        });

        function showMenu() {
            navbar.animate({'opacity': 0, 'top': -80}, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.addClass('active');
        }

        function hideMenu() {
            navbar.animate({'opacity': 1, 'top': 0}, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.removeClass('active');
        }

        /* ---------------------------------------------- /*
         * Overlay dropdown menu
         /* ---------------------------------------------- */

        $('#nav > li.slidedown > a').on('click', function () {
            if ($(this).attr('class') != 'active') {
                $('#nav li ul').slideUp({duration: 300, easing: 'easeInOutQuart'});
                $('#nav li a').removeClass('active');
                $(this).next().slideToggle({duration: 300, easing: 'easeInOutQuart'}).addClass('open');
                $(this).addClass('active');
            } else {
                $('#nav li ul').slideUp({duration: 300, easing: 'easeInOutQuart'}).removeClass('open');
                $(this).removeClass('active');
            }
            return false;
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function (e) {
            var anchor = $(this);

            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);

            e.preventDefault();
        });

        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function () {
            $('html, body').animate({scrollTop: 0}, 'slow');
            return false;
        });

    });

    /* ---------------------------------------------- /*
     * Page custom scripts
     /* ---------------------------------------------- */

    var tooltipbox = $('.tooltipbox'),
        chatBtn = $('.chat-toggle-button'),
        mainBlock = $('.mainblock'),
        chatBlock = $('.chatblock'),
        orderForm = $('#order-form'),
        orderHistoryList = $('.order-history-list'),
        retailersFilters = $('#retailers-filters .filters'),
        retailersList = $('#retailers-list');

    if (tooltipbox.length) {
        tooltipbox.find('.glyphicon').tooltip();
    }

    chatBtn.click(function (e) {
        if (window.screen.width >= 992 && chatBlock.length) {
            e.preventDefault();

            if (chatBlock.is(':visible')) {
                mainBlock.addClass('chat-hidden');
                chatBlock.addClass('hide');
            } else {
                mainBlock.removeClass('chat-hidden');
                chatBlock.removeClass('hide');
            }
        }
    });

    if (orderForm.length) {
        var orderDetailForm = $('#order-detail-form');

        orderDetailForm.removeClass('hide').hide();
        orderForm.on('submit', function (e) {
            var orderUrl = $('#order-url').val();

            e.preventDefault();

            if (orderUrl.length == 0) {
                orderForm.find('.help-block').text('Please enter correct URL link');
            } else {
                orderForm.find('.help-block').text('');
                $.ajax({
                    url: 'assets/ajax/order-url.json',
                    method: 'post',
                    data: orderUrl,
                    success: function (res) {
                        if (res.result == "success") {
                            orderDetailForm.find('.img-responsive > img').attr('src', res.data['image_url']);
                            orderDetailForm.find('input[name="order-url"]').val(orderUrl);
                            orderDetailForm.slideDown();
                        }
                    },
                    error: function (xhr) {
                        console.log("Error: " + xhr.status + " " + xhr.statusText);
                    }
                });
            }
        });

        var orderRemoveBtn = function (btn) {
            btn = $(btn);

            btn.addClass('btn-removable');

            btn.click(function () {
                if (btn.parents('.radio').parent().find('.radio').length > 1) {
                    btn.parents('.radio').slideUp(function () {
                        btn.parents('.radio').remove();
                    })
                }
            })
        };

        orderDetailForm.find('.btn-remove:not(.btn-removable)').each(function () {
            orderRemoveBtn(this);
        });

        orderDetailForm.find('.btn-add').click(function () {
            var that = $(this),
                method = that.attr('data-method'),
                btnText = '';

            if (that.hasClass('btn-confirm')) {
                var methodClass,
                    uniqueId = new Date().getTime(),
                    list = that.parents('fieldset').find('.radio:last'),
                    newData = that.parent().find('textarea').val();

                that.removeClass('btn-confirm');
                that.parent().find('.form-group').slideUp();
                that.text(btnText);

                if (newData.length) {
                    switch (method) {
                        case "address":
                            btnText = "Add Billing Address";
                            methodClass = 'address';
                            break;
                        case "shipping":
                            btnText = "Add Shipping Address";
                            methodClass = 'shipping';
                            break;
                        case "payment":
                            btnText = "Add Payment Method";
                            methodClass = 'payment';
                            break;
                    }

                    that.text(btnText);

                    list.after(
                        '<div class="radio" id="' + methodClass + '-' + uniqueId + '">' +
                        '<input type="radio" name="' + methodClass + '" id="' + methodClass + '-' + uniqueId + '-name" value="' + newData + '">' +
                        '<label for="' + methodClass + '-' + uniqueId + '-name">' +
                        newData +
                        '</label>' +
                        '<span data-remove="' + methodClass + '-' + uniqueId + '" class="btn btn-lg btn-remove"><i class="fa fa-trash-o"></i></span>' +
                        '</div>'
                    );

                    orderDetailForm.find('.btn-remove:not(.btn-removable)').each(function () {
                        orderRemoveBtn(this);
                    });
                }
            } else {
                that.addClass('btn-confirm');
                that.parent().find('.form-group').slideDown();

                switch (method) {
                    case "address":
                        btnText = "Confirm New Billing Address";
                        break;
                    case "shipping":
                        btnText = "Confirm New Shipping Address";
                        break;
                    case "payment":
                        btnText = "Confirm New Payment Method";
                        break;
                }

                that.text(btnText);
            }
        });

        orderDetailForm.on('submit', function (e) {
            var address = orderDetailForm.find('input[name="address"]').is(':checked'),
                shipping = orderDetailForm.find('input[name="shipping"]').is(':checked'),
                payment = orderDetailForm.find('input[name="payment"]').is(':checked'),
                confirm = $('#confirmed').is(':checked'),
                submitBtn = orderDetailForm.find('input[type="submit"]');

            e.preventDefault();

            if (address && shipping && payment && confirm && !submitBtn.hasClass('disabled')) {
                $.ajax({
                    url: 'assets/ajax/order-finish.json',
                    method: 'post',
                    data: orderDetailForm.serializeArray(),
                    success: function (res) {
                        if (res.result == "success") {
                            submitBtn.addClass('disabled').text('Order Complete');
                        }
                    },
                    error: function (xhr) {
                        console.log("Error: " + xhr.status + " " + xhr.statusText);
                    }
                });
            }
        })
    }

    if (orderHistoryList.length) {
        var orderHistoryLoadmore = $('.order-history-loadmore');

        /*Ajax mark order as returned + add tracking number*/
        var historyReturn = function (btn) {
            btn = $(btn);

            btn.addClass('connect');
            btn.on('click', function (e) {
                var form = $(this).parents('form'),
                    orderHistorySerial = form.serializeArray();

                e.preventDefault();

                $.ajax({
                    url: 'assets/ajax/history-return.json',
                    method: 'post',
                    data: orderHistorySerial,
                    success: function (res) {
                        if (res.result == "success") {
                            var returnText = (res.data && res.data['tracking_number']) ? "Item marked as returned and tracking number saved" : "Item returned";

                            form.find('.help-block').text(returnText);
                        }
                    },
                    error: function (xhr) {
                        console.log("Error: " + xhr.status + " " + xhr.statusText);
                    }
                });
            })
        };

        /*Ajax load more orders in history*/
        orderHistoryLoadmore.click(function () {
            $.ajax({
                url: 'assets/ajax/history-loadmore.json',
                method: 'post',
                data: {
                    "last": orderHistoryList.find('.panel:last').attr('data-id')
                },
                success: function (res) {
                    if (res.result == "success") {
                        if (res.data.content.length == 0) {
                            orderHistoryLoadmore.hide();
                        } else {
                            $.each(res.data.content, function () {
                                var el = this,
                                    couponValidate = (el.coupon_validate) ? '<p class="help-block text-success"><i class="glyphicon glyphicon-ok"></i>Valid Coupon Code</p>' : '';

                                var historyBlock = '<div class="panel" data-id="' + el.id + '">' +
                                    '<div class="panel-heading">' +
                                    '<h4 class="panel-title font-alt">' +
                                    '<a data-toggle="collapse" class="collapsed" aria-expanded="false" data-parent="#accordion" href="#order-history-' + el.id + '">' +
                                    '<span class="col-xs-2">' + el.date_order + '</span>' +
                                    '<span class="col-xs-3">' + el.order_number + '</span>' +
                                    '<span class="col-xs-4">' + el.retailer + '</span>' +
                                    '<span class="col-xs-1">' + el.items + '</span>' +
                                    '<span class="col-xs-2">' + el.status + '</span>' +
                                    '</a>' +
                                    '</h4>' +
                                    '</div>' +
                                    '<div id="order-history-' + el.id + '" class="panel-collapse collapse">' +
                                    '<div class="panel-body">' +
                                    '<div class="form-group">' +
                                    '<div class="col-xs-12 textarea form-control m-b-20 order-history-url">' + el.url + '</div>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-color">Color</label>' +
                                    '<input type="text" id="order-color" class="form-control" readonly disabled value="' + el.color + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-size">Size</label>' +
                                    '<input type="text" id="order-size" class="form-control" readonly disabled value="' + el.size + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-quantity">Quantity</label>' +
                                    '<input type="text" id="order-quantity" class="form-control" readonly disabled value="' + el.quantity + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-couponcode">Coupon Code</label>' +
                                    '<input type="text" id="order-couponcode" class="form-control" readonly disabled value="' + el.coupon_code + '">' +
                                    '</div>' +
                                    couponValidate +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<label for="order-instructions" class="font-alt small">Special Instructions</label>' +
                                    '<div id="order-instructions" class="col-xs-12 textarea form-control m-b-20">' + el.instruction + '</div>' +
                                    '</div>' +
                                    '<div class="order-history-info col-xs-12 m-t-10">' +
                                    '<div class="img-responsive text-center m-b-10 col-xs-12 col-md-3">' +
                                    '<img src="' + el.image_url + '">' +
                                    '</div>' +
                                    '<div class="infobox col-xs-12 col-md-3">' +
                                    '<strong class="font-alt">Billing Address</strong>' +
                                    el.billing_address +
                                    '</div>' +
                                    '<div class="infobox col-xs-12 col-md-3">' +
                                    '<strong class="font-alt">Shipping Address</strong>' +
                                    el.shipping_address +
                                    '</div>' +
                                    '<div class="infobox col-xs-12 col-md-3">' +
                                    '<strong class="font-alt">Payment Method</strong>' +
                                    el.payment_method +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="order-history-price col-xs-12 m-t-20">' +
                                    '<strong class="font-alt col-xs-12 col-md-9 col-md-offset-3 m-b-10">Price</strong>' +
                                    '<div class="form-group col-xs-12 col-md-9 col-md-offset-3">' +
                                    '<div class="input-group m-b-5">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-product">Product price</label>' +
                                    '<input type="text" id="order-history-price-product" class="form-control" readonly disabled value="' + el.price_product + '">' +
                                    '</div>' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-after-coupon">After Coupon Code</label>' +
                                    '<input type="text" id="order-history-price-after-coupon" class="form-control" readonly disabled value="' + el.price_coupon + '">' +
                                    '</div>' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-discount-5">After 5% Discount</label>' +
                                    '<input type="text" id="order-history-price-discount-5" class="form-control" readonly disabled value="' + el.price_discount + '">' +
                                    '</div>' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-shipping">+ Shipping</label>' +
                                    '<input type="text" id="order-history-price-shipping" class="form-control" readonly disabled value="' + el.price_shipping + '">' +
                                    '</div>' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-taxes">+ Taxes</label>' +
                                    '<input type="text" id="order-history-price-taxes" class="form-control" readonly disabled value="' + el.price_taxes + '">' +
                                    '</div>' +
                                    '<div class="input-group input-strong">' +
                                    '<label class="input-group-addon font-alt" for="order-history-price-total">TOTAL</label>' +
                                    '<input type="text" id="order-history-price-total" class="form-control" readonly disabled value="' + el.price_total + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="order-history-return col-xs-12 m-t-30">' +
                                    '<form>' +
                                    '<input type="hidden" name="order-id" value="' + el.id + '"/>' +
                                    '<button class="btn btn-b btn-lg col-xs-12 col-md-3" type="submit">Return Item</button>' +
                                    '<p class="col-xs-12 col-md-9">Please return the order according to each retailer\'s individual return policies, and enter in the return shipment tracking number below. For more information, please see help or chat with a customer service representative.</p>' +
                                    '<div class="form-group">' +
                                    '<div class="input-group">' +
                                    '<label class="input-group-addon font-alt" for="order-history-return-tracking">Return tracking number</label>' +
                                    '<input type="text" id="order-history-return-tracking" class="form-control" name="order-history-tracking-number" val="' + el.tracking_number + '">' +
                                    '</div>' +
                                    '<p class="help-block text-success"></p>' +
                                    '</div>' +
                                    '</form>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                                orderHistoryList.find('.panel:last').after(historyBlock);
                            });
                            orderHistoryList.find('.order-history-return form button[type="submit"]:not(.connect)').each(function () {
                                historyReturn(this);
                            });
                        }
                    }
                },
                error: function (xhr) {
                    console.log("Error: " + xhr.status + " " + xhr.statusText);
                }
            });
        });
        orderHistoryList.find('.order-history-return form button[type="submit"]:not(.connect)').each(function () {
            historyReturn(this);
        });
    }

    if (retailersFilters.length) {
        $('a', retailersFilters).on('click', function () {
            var that = $(this),
                selector = that.attr('data-filter'),
                selectorMenu = '';

            that.parents('.filters').find('.current').removeClass('current');

            if (that.hasClass('clear-filter')) {
                $('#retailers-filters .filters-options .current').removeClass('current');
                $('#retailers-filters .filters-letters .current').removeClass('current');
                selector = '';
            }

            retailersFilters.find('.current').map(function () {
                selectorMenu += $(this).attr('data-filter')
            });

            if (selectorMenu)
                selector = selector + selectorMenu;

            if (!that.hasClass('clear-filter'))
                that.addClass('current');

            retailersList.isotope({
                filter: selector
            });

            return false;
        });

        var retailersLetters = [];
        retailersList.find('.work-item').each(function () {
            var that = $(this),
                letter = $.trim(that.find('.name').text()).charAt(0);

            that.addClass('letter-' + letter);

            if ($.inArray(letter, retailersLetters) < 0) {
                retailersLetters.push(letter);
                that.find('.retailers-letters').text(letter);
            }
        });

        /* Ajax favorite/unfavorite */
        retailersList.find('.retailers-favorite').click(function () {
            var parent = $(this).parents('.work-item'),
                method = (parent.hasClass('favorite')) ? 'favorite-remove' : 'favorite-add';

            $.ajax({
                url: 'assets/ajax/retailers-favorite.json',
                method: 'post',
                data: {
                    id: parent.attr('data-id'),
                    method: method
                },
                success: function (res) {
                    if (res.result == "success") {
                        (method == 'favorite-remove') ? parent.removeClass('favorite') : parent.addClass('favorite');
                    }
                },
                error: function (xhr) {
                    console.log("Error: " + xhr.status + " " + xhr.statusText);
                }
            });
        });

        /* Ajax add code */
        var modalFavoriteAddcode = $('#modal-favorite-addcode');
        modalFavoriteAddcode.on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget),
                retailer = button.parents('.work-item'),
                modal = $(this);

            modal.find('input[name="retailer-id"]').val(retailer.attr('data-id'));
            modal.find('.modal-title').text('Add Gift Code for ' + retailer.find('.name').text());
        });
        modalFavoriteAddcode.on('hide.bs.modal', function () {
            var modal = $(this);

            modal.find('#retailer-code').val(null);
            modal.find('.help-block.text-danger').text('');
        });
        /* Ajax add code */
        modalFavoriteAddcode.find('.modal-footer .submitBtn').click(function () {
            var retailerId = modalFavoriteAddcode.find('input[name="retailer-id"]').val(),
                retailerCode = modalFavoriteAddcode.find('#retailer-code').val();

            if (retailerCode.length == 0) {
                modalFavoriteAddcode.find('.help-block.text-danger').text('Please enter gift code');
                return false;
            }
            $.ajax({
                url: 'assets/ajax/retailers-addcode.json',
                method: 'post',
                data: {
                    'retailer-id': retailerId,
                    'retailer-code': retailerCode
                },
                success: function (res) {
                    if (res.result == "success") {
                        retailersList.find('.work-item[data-id="' + retailerId + '"] .retailers-info').append(
                            $('<div></div>').addClass('btn btn-d btn-xs col-xs-12 col-md-4').text(retailerCode)
                        );
                        modalFavoriteAddcode.modal('hide');
                    }
                },
                error: function (xhr) {
                    console.log("Error: " + xhr.status + " " + xhr.statusText);
                }
            });
        })
    }
})(jQuery);
