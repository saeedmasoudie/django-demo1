const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
let priceGap = 1000;

function formatNumberWithSeparators(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertNumberToPersian(number) {
    const persianNumbers = {
        0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴',
        5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹'
    };
    return number.toString().replace(/[0-9]/g, function(w) {
        return persianNumbers[w];
    });
}

function updateFormattedValue(input, value) {
    const formattedValueElement = input.parentElement.querySelector(".formatted-value");
    if (formattedValueElement) {
        formattedValueElement.textContent = convertNumberToPersian(formatNumberWithSeparators(value));
    }
}

function initializeValues() {
    priceInput.forEach((input) => {
        updateFormattedValue(input, input.value);
    });
}

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[1].value = maxVal + priceGap;
            } else {
                rangeInput[0].value = minVal - priceGap;
            }
        } else {
            priceInput[1].value = minVal;
            priceInput[0].value = maxVal;

            updateFormattedValue(priceInput[1], minVal);
            updateFormattedValue(priceInput[0], maxVal);

        }
    });
    updateFormattedValue(input, input.value);
});

function submit_form() {
    const min = document.getElementById("min_price_inp").value;
    const max = document.getElementById("max_price_inp").value;
    document.getElementById("min_price_val").value = min;
    document.getElementById("max_price_val").value = max;
    document.getElementById("PriceForm").submit();
}

let formfield = document.getElementById('PriceForm');

function fill_page(page) {
    const newField = document.createElement('input');
    newField.setAttribute('type', 'hidden');
    newField.setAttribute('name', 'page');
    newField.setAttribute('id', 'page');
    newField.setAttribute('value', page);
    formfield.appendChild(newField);
    document.getElementById("PriceForm").submit();
}

function sort_by(item) {
    document.getElementById("sort_by").value = item;
    document.getElementById("PriceForm").submit();
}

function makeElement(value) {
    const newBrand = document.createElement('input');
    newBrand.setAttribute('type', 'hidden');
    newBrand.setAttribute('name', 'brands');
    newBrand.setAttribute('id', value);
    newBrand.setAttribute('value', value);
    formfield.appendChild(newBrand);
}

document.querySelector('#brands-checkbox').onclick = function (ev) {
    if (ev.target.value) {
        if (ev.target.checked) {
            const checkedValue = ev.target.value;
            makeElement(checkedValue)
        } else {
            const elem = document.getElementById(ev.target.value);
            elem.remove();
        }
    }
}

$(document).ready(function () {
    const ClassQueryString = (new URL(location.href)).searchParams.get('sort_by');
    const BrandsQueryString = (new URL(location.href)).searchParams.getAll('brands');
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i in sURLVariables) {
        let sParameter = sURLVariables[i].split('=');
        let name = sParameter[0];
        let value = decodeURIComponent(sParameter[1]);
        let collection = document.getElementsByName(name);
        for (let j in collection) {
            if (collection[j].value === value) {
                collection[j].checked = true;
                if (BrandsQueryString.includes(value)) makeElement(value)
            }
        }
    }


    if (ClassQueryString === "l-price") {
        $("#l-price-sort").addClass("text-red-600");
    } else if (ClassQueryString === "h-price") {
        $("#h-price-sort").addClass("text-red-600");
    } else if (ClassQueryString === "added-date") {
        $("#date-sort").addClass("text-red-600");
    } else if (ClassQueryString === "product-views") {
        $("#views-sort").addClass("text-red-600");
    } else if (ClassQueryString === "sold-number") {
        $("#default-sort").addClass("text-red-600");
    } else {
        $("#default-sort").addClass("text-red-600");
    }
});