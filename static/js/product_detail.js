$(document).ready(function() {
    var hasColors = $('input[name="colors"]').length > 0;
    var hasSizes = $('input[name="sizes"]').length > 0;
    function getCsrfToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    }

    // Function to update price, quantity, and variant-specific information
    function updateProductInfo() {
        var selectedColor = $('input[name="colors"]:checked').attr('id');
        var selectedSize = $('input[name="sizes"]:checked').attr('id');

        // Hide all variant-specific elements
        $('.span_child, #quantities_place > div, #prices_place > div').hide();

        // Show variants based on selected color and/or size
        if (selectedColor && selectedSize) {
            $('.var_color_' + selectedColor + '.var_size_' + selectedSize).show();
        } else if (selectedColor) {
            $('.var_color_' + selectedColor).show();
        } else if (selectedSize) {
            $('.var_size_' + selectedSize).show();
        } else {
            // If nothing is selected, show default product information
            $('.no_var_quantity, .no_var_price').show();
        }

        // Update the main product image
        updateProductImage(selectedColor, selectedSize);

        // Enable/disable size options based on selected color
        updateSizeOptions(selectedColor);
    }

    // Function to update the main product image based on selected variant
    function updateProductImage(color, size) {
        $('.mySlides').hide();
        var $variantImage;
        if (color && size) {
            $variantImage = $('.var_color_' + color + '.var_size_' + size + '.mySlides');
        } else if (color) {
            $variantImage = $('.var_color_' + color + '.mySlides').first();
        } else if (size) {
            $variantImage = $('.var_size_' + size + '.mySlides').first();
        }

        if ($variantImage && $variantImage.length) {
            $variantImage.show();
        } else {
            // If no variant image, show the default product image
            $('.mySlides:not([class*="var_color_"]):not([class*="var_size_"])').first().show();
        }
    }

    // Function to update available size options based on selected color
    function updateSizeOptions(selectedColor) {
        if (selectedColor) {
            $('input[name="sizes"]').each(function() {
                var sizeId = $(this).attr('id');
                if ($('.var_color_' + selectedColor + '.var_size_' + sizeId).length) {
                    $(this).prop('disabled', false).parent().removeClass('opacity-50');
                } else {
                    $(this).prop('disabled', true).prop('checked', false).parent().addClass('opacity-50');
                }
            });
        } else {
            $('input[name="sizes"]').prop('disabled', false).parent().removeClass('opacity-50');
        }

        // If the previously selected size is now disabled, uncheck it
        if ($('input[name="sizes"]:checked').prop('disabled')) {
            $('input[name="sizes"]:checked').prop('checked', false);
        }
    }

    // Event listeners for color and size selection
    $('input[name="colors"], input[name="sizes"]').change(updateProductInfo);

    // Initial call to set up the display
    updateProductInfo();

    // Function to add product to cart
    window.add_cart = function() {
        var selectedColor = $('input[name="colors"]:checked').val();
        var selectedSize = $('input[name="sizes"]:checked').val();
        var quantity = $('#product_count').val();

        // Check if all required variants are selected
        if ((hasColors && !selectedColor) || (hasSizes && !selectedSize)) {
            Toastify({
                text: "لطفاً تمام گزینه‌های محصول را انتخاب کنید.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#ff4136",
            }).showToast();
            return;
        }

        // AJAX call to add product to cart
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'add_cart',
                quantity: quantity,
                color_id: selectedColor,
                size_id: selectedSize,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': getCsrfToken(),
            },
            success: function (res) {
                if (res.status === "done"){
                    sessionStorage.setItem("add_cart", "true");
                    sessionStorage.setItem('add_cart_res', JSON.stringify(res))
                    location.reload();
                } else {
                    Toastify({
                        text: res.title,
                        duration: 1500,
                        style: {
                            background: res.style,
                        },
                    }).showToast();
                }
            },
            error: (error) => {
                Toastify({
                    text: 'مشکلی پیش آمده است',
                    duration: 1500,
                    style: {
                        background: "linear-gradient(to right, #db1f12, #e83023)",
                    },
                }).showToast();
            }
        });
    }
});

function toggleFavorite(productId) {
    fetch(`/shop/favorite/${productId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCsrfToken(),
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('پاسخ شبکه خوب نبود');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'fav-added') {
            showToast("به علاقه مندی ها اضافه شد");
            updateFavoriteUI(productId, true);
        } else if (data.status === 'fav-removed') {
            showToast("از علاقه مندی ها حذف شد");
            updateFavoriteUI(productId, false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast("خطا در انجام عملیات. لطفا دوباره تلاش کنید.", "error");
    });
}

function showToast(message, type = "success") {
    Toastify({
        text: message,
        duration: 1500,
        style: {
            background: type === "success"
                ? "linear-gradient(to right, #db1f12, #e83023)"
                : "linear-gradient(to right, #ff0000, #ff5733)",
        },
    }).showToast();
}

function updateFavoriteUI(productId, isFavorite) {
    const favoriteIcon = document.querySelector(`#favorite-icon-${productId}`);
    if (favoriteIcon) {
        favoriteIcon.classList.toggle('favorite-active', isFavorite);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const rateInput = document.getElementById("rate");

    function setRating(value) {
        rateInput.value = value;

        // Reset all stars to empty
        stars.forEach(star => star.classList.replace("fa-star", "fa-star-o"));

        // Fill selected stars
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= value) {
                star.classList.replace("fa-star-o", "fa-star");
            }
        });
    }

    stars.forEach(star => {
        star.addEventListener("click", function () {
            setRating(this.getAttribute("data-value"));
        });

        star.addEventListener("mouseover", function () {
            stars.forEach(s => s.classList.replace("fa-star", "fa-star-o"));
            stars.forEach(s => {
                if (s.getAttribute("data-value") <= this.getAttribute("data-value")) {
                    s.classList.replace("fa-star-o", "fa-star");
                }
            });
        });

        star.addEventListener("mouseout", function () {
            setRating(rateInput.value);
        });
    });
});