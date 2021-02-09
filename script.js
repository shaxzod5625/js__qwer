const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCard = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receptOut = receipt.querySelector('.receipt__window-out'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    btnReceipt = receipt.querySelector('.receipt__window-btn');

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this);
    })
}

function plusOrMinus(element) {
    // closest() метод объекта подключается кродителю

    const parent = element.closest('.main__product'), // подключается к родителю
        parentId = parent.getAttribute('id'), // берет у родителя атрибут
        out = parent.querySelector('.main__product-num'), // от родителя подключаемся к количеству
        price = parent.querySelector('.main__product-price span'), // от родителя подключаемся к цене
        kcall = parent.querySelector('.main__product-kcall span'), // от родителя подключаемся к каллориям
        elementDate = element.getAttribute('data-symbol'); // берем данные из атрибута

    if (elementDate == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementDate == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }


    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {

        addExtraProduct(this)

    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elArt = element.getAttribute('data-extra');
    product[parentId][elArt] = element.checked;

    if (product[parentId][elArt] == true) {
        product[parentId].kcall += extraProduct[elArt].kcall
        product[parentId].price += extraProduct[elArt].price
    } else {
        product[parentId].kcall -= extraProduct[elArt].kcall
        product[parentId].price -= extraProduct[elArt].price
    }
    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
}
let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCard.addEventListener('click', function () {
    for (const key in product) {
        const po = product[key];
        if (po.amount > 0) {
            arrayProduct.push(po)
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    po.name += '\n' + extraProduct[infoKey].name
                }
            }
        }
        po.price = po.Summ;
        po.kcall = po.Kcall;
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price; // Суммируем цену
        totalKcall += el.kcall; // Суммируем каллории
        totalName += '\n' + el.name + '\n'; // Склеиваем все названия
    }
    receipt.style.display = 'flex';
    receptOut.innerHTML = `Вы купили \n ${totalName} \n Калорийность ${totalKcall} \n Стоимость покупки \n ${totalPrice} сумм`;
    setTimeout(() => {
        receipt.style.opacity = '1';
    }, 150);
    setTimeout(() => {
        receiptWindow.style.top = '20%'
    }, 200);
    document.body.style.overflow = 'hidden';
    const outNum = document.querySelectorAll('.main__product-num');
    for (let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0;
    }
    const outPrice = document.querySelectorAll('main__product-price span');
    for (let i = 0; i < outPrice.length; i++) {
        outPrice[i].innerHTML = 0;
    }
    const outKcall = document.querySelectorAll('.main__product-kcall span');
    for (let i = 0; i < outKcall.length; i++) {
        outKcall[i].innerHTML = 0;
    }
})
btnReceipt.addEventListener('click', function () {
    alert('Спасибо за покупку 😊😊😊')
    location.reload();
})

// Д.з Timer

const timer = document.querySelector('.header__timer-extra');
let delay = 50;

function timerGo() {
    if (timer.innerHTML <= 50) {
        timer.innerHTML++
    } else {
        delay = delay + 4
        timer.innerHTML++
    }
    if (timer.innerHTML >= 100) {
        timer.innerHTML = 100
    }

    stopTimer = setTimeout(timerGo, delay)
    if (timer.innerHTML == 100) {
        clearTimeout(stopTimer)
    }
}
timerGo()


// Дз dbcklick

const view = document.querySelector('.view'),
    viewClose = document.querySelector('.view__close'),
    viewImg = view.querySelector('img'),
    productImg = document.querySelectorAll('.main__product-info'),
    img = document.querySelectorAll('.main__product-img');
for (let i = 0; i < productImg.length; i++) {
    productImg[i].addEventListener('dblclick', function (e) {
        let test = img[i].getAttribute('src');
        receipt.classList.remove('active');
        view.classList.add('active');
        viewImg.setAttribute('src', test);
    })
}
viewClose.addEventListener('click', function () {
    view.classList.remove('active');
    receipt.classList.add('active');
})
view.addEventListener('click', function (e) {
    if (e.currentTarget === e.target) {
        view.classList.remove('active');
        receipt.classList.add('active');
    }
})
const closeWindow = document.querySelector('.close__window');
closeWindow.addEventListener('click', function () {
    setTimeout(() => {
        receipt.style.opacity = '0';
    }, 150);
    setTimeout(() => {
        receiptWindow.style.top = '-100%'
    }, 200);
    setTimeout(() => {
        receipt.style.display = 'none';
    }, 1000)
})
receipt.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        setTimeout(() => {
            receipt.style.opacity = '0';
        }, 150);
        setTimeout(() => {
            receiptWindow.style.top = '-100%'
        }, 200);
        setTimeout(() => {
            receipt.style.display = 'none';
        }, 1000)
    }
})