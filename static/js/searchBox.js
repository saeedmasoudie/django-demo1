function showModalSearch() {
    document.getElementById("showModalSearch").style.display = "block";
    document.getElementById("opacitiScreen").style.display = "block";
}

function closeScreen() {
    document.getElementById("showModalSearch").style.display = "none";
    document.getElementById("opacitiScreen").style.display = "none";
}

function get_Cookie(name) {
    let cookie_Value = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookie_Value = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookie_Value;
}

const csrf_token = get_Cookie('csrftoken');

function searchAjax(data) {
    $.ajax({
        url: 'http://localhost:8000/api/search/',
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            todo: 'Search',
            text: data,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRFToken': csrf_token,
        },
        success: (data) => {
            const container = $('#search_container')
            container.empty()
            if (data) {
                for (let x in data) {
                    const name = data[x].name;
                    const image = data[x].image;
                    const url = window.location.origin + '/shop/ppk-1' + data[x].id + '/' + data[x].slug
                    const html = '<a href="' + url + '" class="flex items-center bg-white p-2 rounded-xl"><img src="' + image + '" alt="" class="w-14 rounded-lg ml-2"><div class="text-xs opacity-70">' + name + '</div></a>'
                    container.append(html);
                }
            }
        },
        error: (error) => {
            const container = $('#search_container')
            const html = '<img class="mx-auto rounded-3xl" src="/static/image/404/404-error-not-found.png" alt=""><div class="opacity-90 text-center text-lg mt-14">هیچ محصولی یافت نشد!</div><img class="mx-auto rounded-3xl" src="/static/image/404/404-error-not-found.png" alt="">'
            container.empty()
            container.append(html);
        }
    });
}

const search_input = document.getElementById('default-search');
const spinner = document.getElementById('search-spinner');
const product_div = document.getElementById('search_container');
let timeout = null;
search_input.addEventListener('keyup', function (e) {
    clearTimeout(timeout);
    if (this.value) {
        showModalSearch();
        spinner.style.display = "flex";
        product_div.style.display = "none";
        timeout = setTimeout(function () {
            spinner.style.display = "none";
            searchAjax(search_input.value);
            product_div.style.display = "grid";
        }, 1500);
    } else {
        closeScreen();
    }
});

$(document).ready(function () {
    $('#clear_history').on('click', function () {
        if ($('.searches').length) {
            $.ajax({
                url: window.location.origin,
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'clear_history'
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrf_token,
                },
                success: (data) => {
                    $('#showHistory').empty()
                    Toastify({
                        text: "تاریخچه جستجو های شما با موفقیت حذف شد",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #61E632, #3ECB0D)",
                        },
                    }).showToast();
                },
                error: (error) => {
                    Toastify({
                        text: "مشکلی پیش آمده است لطفا صفحه را رفرش کنید",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #db1f12, #e83023)",
                        },
                    }).showToast();
                }
            });
        } else {
            Toastify({
                text: "تاریخچه جستجو های شما خالی است",
                duration: 1500,
                style: {
                    background: "linear-gradient(to right, #db1f12, #e83023)",
                },
            }).showToast();
        }
    });
});

function change_search(value) {
    search_input.value = value;
    const event = new KeyboardEvent('keyup', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13,
    });
    document.getElementById('default-search').dispatchEvent(event);
}