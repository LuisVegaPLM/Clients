$(document).ready(function () {
    $(".dropdown").hover(
        function () {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown("400");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideUp("400");
            $(this).toggleClass('open');
        }
    );
});
$(document).ready(function () {
    $("._refresh").click(function () {
        swal("¡Página actualizada!", "", "success");
        setTimeout(function () { location.reload(1); }, 300);
    });
});
$(function () {
    $("._closesession").click(function () {
        $("#_chargeOut").show();
    });
    $("#_chargeOut").hide();
});
$(function () {
    $(".zindex").click(function () {
        $("#_chargeTime").show();
    });
    $("#_chargeTime").hide();
});