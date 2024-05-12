document.addEventListener('DOMContentLoaded', function() {

    var btnsCart = document.querySelectorAll('.products__btn'),
        btnsArr = [],
        prodName = document.querySelectorAll('.products__name'),
        popupProdName = document.querySelector('.popup__prod-name'),
        prodPrice = document.querySelectorAll('.products__price'),
        popupOnePrice = document.querySelector('.popup__one-price'),
        prodTotalNum = document.querySelectorAll('.products__total-num'),
        popupTotalPrice = document.querySelector('.popup__total-price'),
        prodImg = document.querySelectorAll('.products__image'),
        popupSource = document.querySelector('.popup__img source'),
        popupImg = document.querySelector('.popup__image'),
        popUp = document.querySelector('.popup'),
        btnClose = document.querySelector('.popup__close'),
        modal = document.querySelector('.popup__modal'),
        btnDec = document.querySelectorAll('.protucts__total-dec'),
        btnInc = document.querySelectorAll('.total-inc'),
        btnIncArray = [],
        btnDecArray = [],
        prodTotalNumArr = [],
        popupForm = document.querySelector('.popup__form'),
        error = document.querySelector('.popup__error'),
        errorMessage = false,
        popupModal = document.querySelector('.popup__modal'),

        inputProdName = document.getElementById('prod-name'),
        inputProdCount = document.getElementById('prod-count'),
        inputProdOne = document.getElementById('prod-one'),
        inputProdTotal = document.getElementById('prod-total'),
        inputRef = document.getElementById('ref'),
        inputIp = document.getElementById('ip'),
        inputName = document.getElementById('name'),
        inputPhone = document.getElementById('phone'),
        inputComment = document.getElementById('comment');
        
        
    for (var i = 0; i < btnsCart.length; i++) {
        btnsArr.push(btnsCart[i]);
        btnsCart[i].addEventListener('click', function(e) {
            popupProdName.textContent = prodName[btnsArr.indexOf(e.target)].textContent;
            popupOnePrice.textContent = prodPrice[btnsArr.indexOf(e.target)].textContent;
            popupTotalPrice.textContent = parseInt(popupOnePrice.textContent.replaceAll(' ', '')) * prodTotalNum[btnsArr.indexOf(e.target)].value + " р.";
            inputProdCount.value = prodTotalNum[btnsArr.indexOf(e.target)].value;
            popupImg.setAttribute('src', prodImg[btnsArr.indexOf(e.target)].getAttribute('src'));
            popupSource.setAttribute('srcset', prodImg[btnsArr.indexOf(e.target)].getAttribute('src'));
            popUp.classList.toggle('hidden');
            document.body.classList.toggle('ovf-hidden');
        });
    }

    btnClose.addEventListener('click', function() {
        popUp.classList.toggle('hidden');
        document.body.classList.toggle('ovf-hidden');
        if (errorMessage) {
            error.classList.add('hidden');
            errorMessage = false;
        }
    });

    popUp.addEventListener('click', function() {
        popUp.classList.toggle('hidden');
        document.body.classList.toggle('ovf-hidden');
        if (errorMessage) {
            error.classList.add('hidden');
            errorMessage = false;
        }
    });

    modal.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    for (var i = 0; i < btnDec.length; i++) {
        btnDecArray.push(btnDec[i]);
        btnDec[i].addEventListener('click', function(e) {
            if (prodTotalNum[btnDecArray.indexOf(e.target)].value > 1) {
                prodTotalNum[btnDecArray.indexOf(e.target)].value --;
            }
        });
    }

    for (var i = 0; i < btnInc.length; i++) {
        btnIncArray.push(btnInc[i]);
        btnInc[i].addEventListener('click', function(e) {
            if (prodTotalNum[btnIncArray.indexOf(e.target)].value < 99) {
                prodTotalNum[btnIncArray.indexOf(e.target)].value ++;
            }
        });
    }

    for (var i = 0; i < prodTotalNum.length; i++) {
        prodTotalNumArr.push(prodTotalNum[i]);
        prodTotalNum[i].addEventListener('input', function(e) {
            if (prodTotalNum[prodTotalNumArr.indexOf(e.target)].value == 0 ) {
                prodTotalNum[prodTotalNumArr.indexOf(e.target)].value = 1;
            } else if (prodTotalNum[prodTotalNumArr.indexOf(e.target)].value > 99 ) {
                prodTotalNum[prodTotalNumArr.indexOf(e.target)].value = 99;
            }
        });

    }

    $('#phone').inputmask("+9 (999) 999-99-99");

    popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (inputPhone.value == '') {
            error.classList.remove('hidden');
            errorMessage = true;
        } else {
            inputProdName.value = document.querySelector('.popup__prod-name').textContent;
            inputProdOne.value = document.querySelector('.popup__one-price').textContent;
            inputProdTotal.value = document.querySelector('.popup__total-price').textContent;
            inputRef.value = window.location.href;

            var form_data = $(this).serialize();
            $.ajax({
                type: "POST", 
                url: "/send.php",
                data: form_data,
                success: function () {
                    popupModal.innerHTML = '<div class="popup__title">Спасибо! Ваш заказ принят. В ближайшее время мы с Вами свяжемся.</div><button class="popup__close"></button>';
                    popupModal.addEventListener('click', function() {
                        popUp.classList.toggle('hidden');
                        document.body.classList.toggle('ovf-hidden');
                        if (errorMessage) {
                            error.classList.add('hidden');
                            errorMessage = false;
                        }
                    });
                    document.querySelector('.debug').classList.remove('hidden');
                    document.querySelector('.debug__name').textContent = inputName.value;
                    document.querySelector('.debug__phone').textContent = inputPhone.value;
                    document.querySelector('.debug__comment').textContent = inputComment.value;
                    document.querySelector('.debug__prod-name').textContent = inputProdName.value;
                    document.querySelector('.debug__prod-count').textContent = inputProdCount.value;
                    document.querySelector('.debug__prod-one').textContent = inputProdOne.value;
                    document.querySelector('.debug__prod-total').textContent = inputProdTotal.value;
                    document.querySelector('.debug__ref').textContent = inputRef.value;
                    document.querySelector('.debug__ip').textContent = inputIp.value;
                }
            });
        }
    });


});    