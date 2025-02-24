(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize 
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');

(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');


var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');


// Sidebar
function init_sidebar() {
// TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function (ev) {
        console.log('clicked - sidebar_menu');
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            } else {
                if ($BODY.is(".nav-sm")) {
                    $li.parent().find("li").removeClass("active active-sm");
                    $li.parent().find("li ul").slideUp();
                }
            }
            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });

// toggle small or large menu
    $MENU_TOGGLE.on('click', function () {
        console.log('clicked - menu toggle');

        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function () {
        setContentHeight();
    });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel: {preventDefault: true}
        });
    }
};
// /Sidebar

var randNum = function () {
    return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
};

// epoch timestamp converter
function dateToUnixEpoch(date) {
	return Math.floor(date.getTime()) / 1000;
}
// const ms = dateToUnixEpoch(new Date("1995-12-17T03:24:00"));

// Panel toolbox
$(document).ready(function () {
    $('.collapse-link').on('click', function () {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Tooltip
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function () {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery


// iCheck
$(document).ready(function () {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.last-head').show();
        $('.action-cnt').html(checkCount + ' انتخاب شده');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
        $('.last-head').hide();
    }
}


// Accordion
$(document).ready(function () {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}


//hover and retain popover when on popover content
var originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
    var container, timeout;

    originalLeave.call(this, obj);

    if (obj.currentTarget) {
        container = $(obj.currentTarget).siblings('.popover');
        timeout = self.timeout;
        container.one('mouseenter', function () {
            //We entered the actual popover – call off the dogs
            clearTimeout(timeout);
            //Let's monitor popover content instead
            container.one('mouseleave', function () {
                $.fn.popover.Constructor.prototype.leave.call(self, self);
            });
        });
    }
};

$('body').popover({
    selector: '[data-popover]',
    trigger: 'click hover',
    delay: {
        show: 50,
        hide: 400
    }
});


function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}

/* AUTOSIZE */
function init_autosize() {

    if (typeof $.fn.autosize !== 'undefined') {

        autosize($('.resizable_textarea'));

    }

};

function init_ColorPicker() {

    if (typeof ($.fn.colorpicker) === 'undefined') {
        return;
    }
    console.log('init_ColorPicker');

    $('.demo1').colorpicker();
    $('.demo2').colorpicker();

    $('#demo_forceformat').colorpicker({
        format: 'rgba',
        horizontal: true
    });

    $('#demo_forceformat3').colorpicker({
        format: 'rgba',
    });

    $('.demo-auto').colorpicker();

};

/* INPUTS */

function onAddTag(tag) {
    alert("Added a tag: " + tag);
}

function onRemoveTag(tag) {
    alert("Removed a tag: " + tag);
}

function onChangeTag(input, tag) {
    alert("Changed a tag: " + tag);
}

//tags input
function init_TagsInput() {

    if (typeof $.fn.tagsInput !== 'undefined') {

        $('#tags_1').tagsInput({
            width: 'auto'
        });

    }

};

/* INPUT MASK */

function init_InputMask() {

    if (typeof ($.fn.inputmask) === 'undefined') {
        return;
    }
    console.log('init_InputMask');

    $(":input").inputmask();

};

/* EASYPIECHART */

function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function lock_screen() {
    setInterval(function () {

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();

        // Add leading zeros
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;
        hours = (hours < 10 ? "0" : "") + hours;

        // Convert numbers to Persian digits
        function toPersianNumber(num) {
            var persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return num.toString().replace(/\d/g, function (d) {
                return persianDigits[d];
            });
        }

        // Compose the string for display
        var currentTimeString = toPersianNumber(hours) + ":" + toPersianNumber(minutes) + ":" + toPersianNumber(seconds);
        $("#lock_screen .clock").html(currentTimeString);

    }, 1000);
    $(document).on('click', '.lock_btn', function (e) {
        e.preventDefault();
        $('body').addClass('lock');
    });
    $(document).on('mouseover', '.unlock #icon_lock', function (e) {
        $(this).removeClass('fa-lock').addClass('fa-unlock');
    });
    $(document).on('mouseout', '.unlock #icon_lock', function (e) {
        $(this).removeClass('fa-unlock').addClass('fa-lock');
    });
    $(document).on('click', '.unlock', function (e) {
        e.preventDefault();
        $('body').removeClass('lock');
    });
}


$(document).ready(function () {
    init_sidebar();
    init_InputMask();
    init_autosize();
    lock_screen();
});

// saeed custom
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');

$(document).ready(function () {
    $(".imgInp").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
    $(".imgInp1").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded1;
            reader.readAsDataURL(this.files[0]);
        }
    });

    function imageIsLoaded(e) {
        var x = 'foo';
        var picture = '<img src="' + e.target.result + '"  class="img-thumbnail img-rounded avatar-view">'
        $(".preview").empty().append(picture);
    }
    function imageIsLoaded1(e) {
        var x = 'foo';
        var picture = '<img src="' + e.target.result + '"  class="img-thumbnail img-rounded avatar-view">'
        $(".preview1").empty().append(picture);
    }

    function handleFileSelect(evt) {
        // Loop through the FileList and render image files as thumbnails.
        for (const file of evt.target.files) {
            // Render thumbnail.
            const span = document.createElement('a')
            const src = URL.createObjectURL(file)
            span.innerHTML =
                `<img src="${src}" class="img-thumbnail img-rounded gallery_input" title="${escape(file.name)}" alt="${escape(file.name)}">`
            document.getElementById('image_list').insertBefore(span, null)
        }
    }

    const g_images = document.getElementById('id_images');
    if (g_images) {
        g_images.addEventListener('change', handleFileSelect, false);
    }
});

$('ul[class="errorlist"]').each(function (i, obj) {
    $(obj).addClass('invalid-feedback');
    $(obj).siblings("input").addClass('parsley-error');
});

window.onload = function () {
    const editComment = sessionStorage.getItem("admin_edit_comment");
    const multiRemover = sessionStorage.getItem("multiRemover");
    const multiChanger = sessionStorage.getItem("multiChanger");
    const update_value = sessionStorage.getItem("update_value");
    const remove_value = sessionStorage.getItem("remove_value");
    if (multiRemover) {
        sessionStorage.removeItem("multiRemover");
        new PNotify({
            title: 'عملیات موفق',
            text: 'آیتم های انتخاب شده با موفقیت حذف شدند!',
            type: 'success',
            styling: 'bootstrap3'
        });
    } else if (multiChanger) {
        sessionStorage.removeItem("multiChanger");
        new PNotify({
            title: 'عملیات موفق',
            text: 'آیتم های انتخاب شده با موفقیت تغییر وضعیت شدند!',
            type: 'success',
            styling: 'bootstrap3'
        });
    } else if (editComment) {
        sessionStorage.removeItem("admin_edit_comment");
        new PNotify({
            title: 'عملیات موفق',
            text: 'دیدگاه با موفقیت بروز شد!',
            type: 'success',
            styling: 'bootstrap3'
        });
    } else if (update_value) {
        sessionStorage.removeItem("update_value");
        new PNotify({
            title: 'عملیات موفق',
            text: 'مقدار با موفقیت بروز شد!',
            type: 'success',
            styling: 'bootstrap3'
        });
    } else if (remove_value) {
        sessionStorage.removeItem("remove_value");
        new PNotify({
            title: 'عملیات موفق',
            text: 'مقدار با موفقیت حذف شد!',
            type: 'success',
            styling: 'bootstrap3'
        });
    }
}

function remove_article(id, cond) {
    if (id || cond !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: cond,
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: (data) => {
                sessionStorage.setItem("remove_value", "true");
                document.location.reload();
            },
            error: (error) => {
                console.log(error);
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: error,
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function set_author(author, add) {
    if (add) {
        $("#author").val(author)
        $("#admin_add_post").submit()
    } else {
        $("#author").val(author)
        $("#admin_edit_post").submit()
    }
}

function updateComment() {
    $("#comment_update").submit()
}

function multiRemover(list) {
    $.ajax({
        url: $(location).attr('href'),
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            cond: 'multi-remove',
            payload: list,
        }),
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRFToken': csrftoken,
        },
        success: (data) => {
            sessionStorage.setItem("multiRemover", "true");
            document.location.reload();
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function multi_remover() {
    const arrId = [];
    $(':checkbox:checked').each(function () {
        const id = $(this).closest('input').attr('id');
        arrId.push(id);
    })
    const result = arrId.filter((word) => (word !== 'check-all'));
    if (result.length !== 0) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'multi-remove',
                payload: result,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                sessionStorage.setItem("multiRemover", "true");
                document.location.reload();
            },
            error: () => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function statusChanger(status) {
    const arrId = [];
    $('.bulk_action :checkbox:checked').each(function () {
        const id = $(this).closest('input').attr('id');
        arrId.push(id);
    })
    const result = arrId.filter((word) => (word !== 'check-all'));
    if (result.length !== 0) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'change-status',
                payload: result,
                status: status,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                sessionStorage.setItem("multiChanger", "true");
                document.location.reload();
            },
            error: () => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

$("#rowAdder").click(function () {
    newRowAdd =
        '<div class="form-group"><div class="form-inline">' +
        '<input type="text" name="title_s" required placeholder="عنوان ویژگی" class="form-control"> -' +
        ' <input type="text" name="spec_s" required placeholder="ویژگی" class="form-control">' +
        '</div>' +
        '</div>';

    $('#new_input').append(newRowAdd);
});

function delete_image(id, cond) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: cond,
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                $(`#${cond}_gallery${id}`).remove();
                new PNotify({
                    title: 'عملیات موفق',
                    text: 'تصویر با موفقیت حذف شد',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            },
            error: (error) => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

$(document).ready(function () {
    $("#b_main_image").click(function () {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'p_img',
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                $("#p_main_img").attr("src", "/static/image/no_image.jpg");
                $("#b_main_image").hide()
                new PNotify({
                    title: 'عملیات موفق',
                    text: 'تصویر با موفقیت حذف شد',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            },
            error: (error) => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    });
});

function delete_spec(id) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'spec',
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                $(`#spec${id}`).remove();
                new PNotify({
                    title: 'عملیات موفق',
                    text: 'مقدار با موفقیت حذف شد',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            },
            error: (error) => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function delete_var(id) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'variant',
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                $(`#variant${id}`).remove();
                new PNotify({
                    title: 'عملیات موفق',
                    text: 'ویژگی با موفقیت حذف شد',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            },
            error: (error) => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function get_data_cs(id, cs) {
    if (id !== null) {
        if (cs === 'True') {
            $("#color_id").val(id);
        } else if (cs === 'False') {
            $("#size_id").val(id);
        }
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'get_data_cs',
                is_color: cs,
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: function (res) {
                if (cs === 'True') {
                    $("#c_title :input").val(res.title);
                    $("#c_title_eng :input").val(res.title_eng);
                    $("#c_color :input").val(res.color);
                    $("#color_icon_edit").css('background-color', res.color);
                } else if (cs === 'False') {
                    $("#s_title :input").val(res.title);
                    $("#s_title_eng :input").val(res.title_eng);
                }
            },
            error: (error) => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function send_data_cs(cs) {
    if (cs) {
        let error = 0;
        const title_input = $("#c_title :input");
        const title_eng_input = $("#c_title_eng :input");
        const color_input = $("#c_color :input");
        if (title_input.val() == null || title_input.val() === "") {
            title_input.addClass('parsley-error');
            error += 1
        } else if (title_input.hasClass('parsley-error')) {
            title_input.removeClass('parsley-error');
        }
        if (title_eng_input.val() == null || title_eng_input.val() === "") {
            title_eng_input.addClass('parsley-error');
            error += 1
        } else if (title_eng_input.hasClass('parsley-error')) {
            title_eng_input.removeClass('parsley-error');
        }
        if (error === 0) {
            $.ajax({
                url: $(location).attr('href'),
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'send_data_cs',
                    is_color: 'True',
                    title: title_input.val(),
                    title_eng: title_eng_input.val(),
                    color: color_input.val(),
                    color_id: $("#color_id").val(),
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrftoken,
                },
                success: function (res) {
                    $('.bs-edit-color-modal-sm').modal('toggle');
                    sessionStorage.setItem("update_value", "true");
                    document.location.reload();
                },
                error: function (res) {
                    new PNotify({
                        title: 'عملیات ناموفق',
                        text: res.responseJSON.status,
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'لطفا تمامی فیلد هارا پر کنید',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    } else {
        let error = 0;
        const size_title_input = $("#s_title :input");
        const size_title_eng_input = $("#s_title_eng :input");
        if (size_title_input.val() == null || size_title_input.val() === "") {
            size_title_input.addClass('parsley-error');
            error += 1
        } else if (size_title_input.hasClass('parsley-error')) {
            size_title_input.removeClass('parsley-error');
        }
        if (size_title_eng_input.val() == null || size_title_eng_input.val() === "") {
            size_title_eng_input.addClass('parsley-error');
            error += 1
        } else if (size_title_eng_input.hasClass('parsley-error')) {
            size_title_eng_input.removeClass('parsley-error');
        }
        if (error === 0) {
            $.ajax({
                url: $(location).attr('href'),
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'send_data_cs',
                    is_color: 'False',
                    title: size_title_input.val(),
                    title_eng: size_title_eng_input.val(),
                    size_id: $("#size_id").val(),
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrftoken,
                },
                success: function (res) {
                    $('.bs-edit-size-modal-sm').modal('toggle');
                    sessionStorage.setItem("update_value", "true");
                    document.location.reload();
                },
                error: function (res) {
                    new PNotify({
                        title: 'عملیات ناموفق',
                        text: res.status,
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'لطفا تمامی فیلد هارا پر کنید',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    }
}

function get_category() {
    if (arguments.length === 7) {
        $("#category_id").val(arguments[0])
        $("#category_title").val(arguments[1]);
        $("#category_url_title").val(arguments[2]);
        $("#category_parent").val(arguments[3]);
        $("#brand_image_url").attr("src",arguments[4]);
        if (arguments[5]) {
            const is_active_field = $("#category_is_active");
            is_active_field.iCheck('check');
            is_active_field.prop("checked", true);
        }
        if (arguments[6]) {
            const is_menu_field = $("#category_is_menu");
            is_menu_field.iCheck('check');
            is_menu_field.prop("checked", true);
        }
    }
}

function get_shipping() {
    if (arguments.length === 3) {
        $("#shipping_id").val(arguments[0])
        $("#shipping_title").val(arguments[1]);
        if (arguments[2]) {
            const is_active_field = $("#shipping_is_active");
            is_active_field.iCheck('check');
            is_active_field.prop("checked", true);
        }
    }
}
function get_brand(id) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'get_brand',
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: function (res) {
                $("#brand_id").val(id)
                $("#brand_title").val(res.title);
                $("#brand_url_title").val(res.url_title);
                $("#brand_description").val(res.description);
                if (res.is_active) {
                    const is_active_field = $("#brand_is_active");
                    is_active_field.iCheck('check');
                    is_active_field.prop("checked", true);
                }
            },
            error: (error) => {
                $('.bs-edit-category-modal-lg').modal('toggle');
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

$(document).ready(function () {
    $("#send_brand").click(function () {
        let error = 0;
        const title = $("#brand_title");
        const url_title = $("#brand_url_title");
        const description = $("#brand_description");
        if (title.val() == null || title.val() === "") {
            title.addClass('parsley-error');
            error += 1
        } else if (title.hasClass('parsley-error')) {
            title.removeClass('parsley-error');
        }
        if (url_title.val() == null || url_title.val() === "") {
            url_title.addClass('parsley-error');
            error += 1
        } else if (url_title.hasClass('parsley-error')) {
            url_title.removeClass('parsley-error');
        }
        if (description.val() == null || description.val() === "") {
            description.addClass('parsley-error');
            error += 1
        } else if (description.hasClass('parsley-error')) {
            description.removeClass('parsley-error');
        }
        if (error === 0) {
            $.ajax({
                url: $(location).attr('href'),
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'send_brand',
                    id: $("#brand_id").val(),
                    title: title.val(),
                    url_title: url_title.val(),
                    description: description.val(),
                    is_active: $("#brand_is_active").prop('checked'),
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrftoken,
                },
                success: function (res) {
                    $('.bs-edit-brand-modal-lg').modal('toggle');
                    sessionStorage.setItem("update_value", "true");
                    document.location.reload();
                },
                error: (error) => {
                    $('.bs-edit-brand-modal-lg').modal('toggle');
                    new PNotify({
                        title: 'عملیات ناموفق',
                        text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'لطفا تمامی فیلد هارا پر کنید',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
});

function get_warranty(id) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'get_warranty',
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: function (res) {
                $("#warranty_id").val(id)
                $("#warranty_name").val(res.name);
                $("#warranty_months").val(res.months);
                if (res.is_active) {
                    const is_active_field = $("#warranty_is_active");
                    is_active_field.iCheck('check');
                    is_active_field.prop("checked", true);
                }
            },
            error: (error) => {
                $('.bs-edit-category-warranty-lg').modal('toggle');
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

$(document).ready(function () {
    $("#send_warranty").click(function () {
        let error = 0;
        const name = $("#warranty_name");
        const months = $("#warranty_months");
        if (name.val() == null || name.val() === "") {
            name.addClass('parsley-error');
            error += 1
        } else if (name.hasClass('parsley-error')) {
            name.removeClass('parsley-error');
        }
        if (months.val() == null || months.val() === "") {
            months.addClass('parsley-error');
            error += 1
        } else if (months.hasClass('parsley-error')) {
            months.removeClass('parsley-error');
        }
        if (error === 0) {
            $.ajax({
                url: $(location).attr('href'),
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'send_warranty',
                    id: $("#warranty_id").val(),
                    name: name.val(),
                    months: months.val(),
                    is_active: $("#warranty_is_active").prop('checked'),
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrftoken,
                },
                success: function (res) {
                    $('.bs-edit-warranty-modal-lg').modal('toggle');
                    sessionStorage.setItem("update_value", "true");
                    document.location.reload();
                },
                error: (error) => {
                    $('.bs-edit-warranty-modal-lg').modal('toggle');
                    new PNotify({
                        title: 'عملیات ناموفق',
                        text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'لطفا تمامی فیلد هارا پر کنید',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
});

function get_img_link(id, banner) {
    if (id !== null) {
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'get_img_link',
                banner: banner,
                id: id,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: function (res) {
                $("#id_value_img").val(id);
                $("#banner_value").val(banner);
                $("#link_changer").val(res.link);
            },
            error: (error) => {
                $('.bs-link-modal-sm').modal('toggle');
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

$(document).ready(function () {
    $("#img_submit").click(function () {
        let error = 0;
        const link = $("#link_changer");
        if (link.val() == null || link.val() === "") {
            link.addClass('parsley-error');
            error += 1
        } else if (link.hasClass('parsley-error')) {
            link.removeClass('parsley-error');
        }
        if (error === 0) {
            $.ajax({
                url: $(location).attr('href'),
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    cond: 'send_img_link',
                    id: $("#id_value_img").val(),
                    banner: $("#banner_value").val(),
                    link:  $("#link_changer").val(),
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRFToken': csrftoken,
                },
                success: function (res) {
                    $('.bs-link-modal-sm').modal('toggle');
                    new PNotify({
                        title: 'عملیات موفق',
                        text: 'لینک با موفقیت بروزرسانی شد',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                },
                error: (error) => {
                    $('.bs-link-modal-sm').modal('toggle');
                    new PNotify({
                        title: 'عملیات ناموفق',
                        text: 'مشکلی پیش آمده است صفحه را رفرش کنید',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'لطفا تمامی فیلد هارا پر کنید',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
});

function init_datepicker_with_input() {
    jalaliDatepicker.startWatch({
        minDate: "today",
        initTime: "01:01:01",
        time: true,
        separatorChars: {
            date: "-",
            between: " ",
            time: ":"
        },
    });
    const cbox = document.querySelectorAll("[data-jdp-miladi-input]");
    for (let i = 0; i < cbox.length; i++) {
        cbox[i].addEventListener("jdp:change", function() {
            const miladiInput = document.getElementById(cbox[i].getAttribute("data-jdp-miladi-input"));
            if (!cbox[i].value) {
                miladiInput.value = "";
                return;
            }
            const datetime = cbox[i].value.split(" ");
            const date = datetime[0].split("-");
            const first_value = jalali_to_gregorian(date[0], date[1], date[2]).join("-")
            const doubled_digits = first_value.split('-').map(c => (c < 10 ? '0' : '') + +c).join('-')
            miladiInput.value = doubled_digits + ' ' + datetime[1]
        });
    }
    function jalali_to_gregorian(jy, jm, jd) {
        jy = Number(jy);
        jm = Number(jm);
        jd = Number(jd);
        let gy = (jy <= 979) ? 621 : 1600;
        jy -= (jy <= 979) ? 0 : 979;
        let days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4))
            + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
        gy += 400 * (parseInt(days / 146097));
        days %= 146097;
        if (days > 36524) {
            gy += 100 * (parseInt(--days / 36524));
            days %= 36524;
            if (days >= 365) days++;
        }
        gy += 4 * (parseInt((days) / 1461));
        days %= 1461;
        gy += parseInt((days - 1) / 365);
        if (days > 365) days = (days - 1) % 365;
        let gd = days + 1;
        let sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let gm
        for (gm = 0; gm < 13; gm++) {
            var v = sal_a[gm];
            if (gd <= v) break;
            gd -= v;
        }
        return [gy, gm, gd];
    }
}

$(document).ready(function () {
    $("#answer_button").on("click", function () {
        const answer_sec = $('#answer_section')
        if (answer_sec.hasClass('hidden')) {
            answer_sec.removeClass('hidden');
            $(this).hide()
        }
    });
    $("#links_btn").on("click", function () {
        const links_section = $('.links_item')
        const links_place = $('#links_div')
        if (links_section.length < 5){
            const links_html = '<div class="links_item"><div class="form-group col-md-4 col-sm-12 col-xs-12"><input type="text" name="title_links" placeholder="عنوان لینک" class="form-control"></div><div class="form-group col-md-8 col-sm-12 col-xs-12"><input type="url" name="link_links" placeholder="آدرس لینک" class="form-control"></div></div>';
            links_place.append(links_html);
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'حداکثر تعداد لینک ها فقط 5 عدد می باشد',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
    $("#social_btn").on("click", function () {
        const socials_section = $('.socials_item')
        const socials_place = $('#socials_div')
        if (socials_section.length < 7){
            const socials_html = '<div class="socials_item col-md-12 col-sm-12 col-xs-12"><div class="form-group col-md-5 col-sm-12 col-xs-12"><input type="file" name="social_icon"></div><div class="col-md-1 col-sm-12 col-xs-12 avatar"><img src="" alt=""></div><div class="form-group col-md-6 col-sm-12 col-xs-12"><input type="url" name="social_link" class="form-control" placeholder="لینک"></div></div>';
            socials_place.append(socials_html);
        } else {
            new PNotify({
                title: 'عملیات ناموفق',
                text: 'حداکثر تعداد لینک ها فقط 7 عدد می باشد',
                type: 'error',
                styling: 'bootstrap3'
            });
        }
    });
    $("#trust_icons").on("click", function () {
        const trust_place = $('#trust_div')
        const trust_html = '<div class="form-group"><textarea name="trust_codes" class="form-control" placeholder="کد نماد اعتماد"></textarea></div>';
        trust_place.append(trust_html);
    });
});


function notify_status(status) {
    if (status){
        $.ajax({
            url: $(location).attr('href'),
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                cond: 'status-changer',
                pk: status,
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRFToken': csrftoken,
            },
            success: () => {
                sessionStorage.setItem("update_value", "true");
                document.location.reload();
            },
            error: () => {
                new PNotify({
                    title: 'عملیات ناموفق',
                    text: 'مشکلی پیش آمده است',
                    type: 'error',
                    styling: 'bootstrap3'
                });
            }
        });
    }
}

function initTodo() {
    function callAjax(data, status) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: $(location).attr("href"),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    todo: true,
                    payload: data,
                    status: status,
                }),
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRFToken": csrftoken,
                },
                success: (response) => resolve(response),
                error: (xhr) => reject(xhr),
            });
        });
    }

    function toggleAddTodoForm() {
        const form = document.getElementById("add_todo_form");
        const link = document.getElementById("add_todo_text");
        if (form.classList.contains("hidden")) {
            form.classList.remove("hidden");
            link.textContent = "پنهان کردن فرم افزودن";
        } else {
            form.classList.add("hidden");
            link.textContent = "افزودن کار جدید";
        }
    }

    function addTodo() {
        const text = document.getElementById("add_todo_inp").value.trim();
        if (!text) {
            new PNotify({
                title: "اطلاعیه",
                text: "لطفاً متن را وارد کنید!",
                type: "error",
                styling: "bootstrap3",
            });
            return;
        }
        callAjax({ title: text }, "add")
            .then((response) => {
                if (response.html) {
                    document.getElementById("todo_content").innerHTML = response.html;
                    document.getElementById("add_todo_inp").value = "";
                    initializeICheck()
                    new PNotify({
                        title: "اطلاعیه",
                        text: "آیتم با موفقیت اضافه شد!",
                        type: "success",
                        styling: "bootstrap3",
                    });
                }
            })
            .catch(() => {
                new PNotify({
                    title: "اطلاعیه",
                    text: "خطا در ارتباط با سرور!",
                    type: "error",
                    styling: "bootstrap3",
                });
            });
    }

    function removeTodo(id) {
        callAjax(id, "remove")
            .then((response) => {
                if (response.html) {
                    document.getElementById("todo_content").innerHTML = response.html;
                    initializeICheck()
                    new PNotify({
                        title: "اطلاعیه",
                        text: "آیتم با موفقیت حذف شد!",
                        type: "success",
                        styling: "bootstrap3",
                    });
                }
            })
            .catch(() => {
                new PNotify({
                    title: "اطلاعیه",
                    text: "خطا در ارتباط با سرور!",
                    type: "error",
                    styling: "bootstrap3",
                });
            });
    }

    function editTodo(id) {
        const todoElement = document.getElementById(`todo-${id}`);
        const currentText = todoElement.querySelector(".todo-text p").textContent;
        const newTitle = prompt("عنوان جدید را وارد کنید:", currentText);

        if (newTitle && newTitle.trim() !== "") {
            callAjax({ id: id, title: newTitle.trim() }, "edit")
                .then((response) => {
                    if (response.html) {
                        document.getElementById("todo_content").innerHTML = response.html;
                        initializeICheck()
                        new PNotify({
                            title: "اطلاعیه",
                            text: "آیتم با موفقیت ویرایش شد!",
                            type: "success",
                            styling: "bootstrap3",
                        });
                    }
                })
                .catch(() => {
                    new PNotify({
                        title: "اطلاعیه",
                        text: "خطا در ارتباط با سرور!",
                        type: "error",
                        styling: "bootstrap3",
                    });
                });
        } else {
            new PNotify({
                title: "اطلاعیه",
                text: "ویرایش لغو شد یا عنوان خالی است!",
                type: "info",
                styling: "bootstrap3",
            });
        }
    }

    function toggleTodoStatus(id, isChecked) {
        callAjax(id, isChecked ? "checked" : "unchecked")
            .then((response) => {
                if (response.html) {
                    const todoElement = document.getElementById(`todo-${id}`);
                    if (todoElement) {
                        todoElement.outerHTML = response.html;
                        initializeICheck();
                    }
                }
            })
            .catch((error) => {
                new PNotify({
                    title: "اطلاعیه",
                    text: "خطا در تغییر وضعیت کار!",
                    type: "error",
                    styling: "bootstrap3",
                });
            });
    }

    function initializeICheck() {
        // Initialize iCheck only for the checkboxes (input.flat)
        $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });
    }

    // Bind global event handlers
    document.getElementById("add_todo_text").onclick = toggleAddTodoForm;
    document.getElementById("add_todo_button").onclick = addTodo;

    // Bind dynamic events for actions
    $(document).on("click", ".todo-actions .fa-pencil", function () {
        const id = $(this).closest(".todo-item").attr("id").split("-")[1];
        editTodo(id);
    });

    $(document).on("click", ".todo-actions .fa-close", function () {
        const id = $(this).closest(".todo-item").attr("id").split("-")[1];
        removeTodo(id);
    });

    $(document).on('ifToggled', 'input.flat', function(event) {
        const $input = $(this);
        const todoId = $input.data('todo-id');
        toggleTodoStatus(todoId, event.target.checked);
    });
}

// saeed custom