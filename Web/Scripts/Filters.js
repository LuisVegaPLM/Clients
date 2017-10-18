function show_loader() {
    $("#bloqueo").show();
}

function login(User, Pass) {
    var usr = $(User).val();
    var psw = $(Pass).val();

    if ((!usr.trim() == false) && (!psw.trim() == false)) {
        $("#bloqueo").show();
    }
}

function getbook(CountryId) {
    $('#bookn').empty();
    $('#Edition').empty();
    $('#clients').empty();
    document.getElementById("CountryId").value = CountryId;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/books",
        traditional: true,
        data: { country: CountryId },
        success: function (data) {
            $('#bookn')
               .append($("<option></option>")
               .attr("value", 0)
               .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#bookn')
                .append($("<option></option>")
                .attr("value", val.BookId)
                .text(val.BookName));
            });
        }
    });
}

function geteditions(book) {
    document.getElementById("BookId").value = book;
    var idcountry = $("#pais").val();
    $('#clients').empty();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/editions",
        traditional: true,
        data: { country: idcountry, bookid: book },
        success: function (data) {
            $('#Edition').empty();
            $('#Edition')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#Edition')
                .append($("<option></option>")
                .attr("value", val.EditionId)
                .text(val.NumberEdition));
            });
        }
    });
}

function getclients() {
    var idcountry = $("#pais").val();
    var edition = $("#Edition").val();
    document.getElementById("EditionId").value = edition;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getclients",
        traditional: true,
        data: { country: idcountry },
        success: function (data) {
            $('#clients').empty();
            $('#clients')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clients')
                .append($("<option></option>")
                .attr("value", val.ClientId)
                .text(val.CompanyName));
            });
        }
    });
}


function getclientsspecialities() {
    var idcountry = $("#pais").val();
    var edition = $("#Edition").val();
    document.getElementById("EditionId").value = edition;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getclientspecialities",
        traditional: true,
        data: { country: idcountry },
        success: function (data) {
            console.log(data);
            $('#clients').empty();
            $('#clients')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clients')
                .append($("<option></option>")
                .attr("value", val.ClientId)
                .text(val.CompanyName));
            });
        }
    });
}

function getresults(clientid) {
    document.getElementById("ClientId").value = clientid;
    $('#InsertParam').trigger('click');
    $("#bloqueo").show();
}

function getUsers() {
    var idcountry = $("#pais").val();
    var edition = $("#Edition").val();
    document.getElementById("EditionId").value = edition;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getUsers",
        traditional: true,
        data: { Country: idcountry },
        success: function (data) {
            $('#clients').empty();
            $('#clients')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clients')
                .append($("<option></option>")
                .attr("value", val.UserId)
                .text(val.UserName));
            });
        }
    });
}

function getresultsReport(clientid) {
    document.getElementById("ClientId").value = clientid;
    $('#InsertParam').trigger('click');
    $("#bloqueo").show();
}

function getresultsEditionClients(edition) {
    document.getElementById("EditionId").value = edition;
    $('#InsertParam').trigger('click');
    $("#bloqueo").show();
}


function getinternationalclients() {
    var idcountry = $("#pais").val();
    var edition = $("#Edition").val();
    document.getElementById("EditionId").value = edition;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getinternationalclients",
        traditional: true,
        data: { country: idcountry },
        success: function (data) {
            $('#clients').empty();
            $('#clients')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clients')
                .append($("<option></option>")
                .attr("value", val.ClientId)
                .text(val.CompanyName));
            });
        }
    });
}

function getClientTypes(edition) {
    document.getElementById("EditionId").value = edition;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getClientTypes",
        traditional: true,
        success: function (data) {
            $('#clienttypes').empty();
            $('#clienttypes')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clienttypes')
                .append($("<option></option>")
                .attr("value", val.ClientTypeId)
                .text(val.TypeName));
            });
        }
    });
}

function getinternationalclientsLI(ClientType) {
    var idcountry = $("#pais").val();
    document.getElementById("ClientTypeId").value = ClientType;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Filters/getclientsByCountryByClientType",
        traditional: true,
        data: { country: idcountry, CTId: ClientType },
        success: function (data) {
            $('#clients').empty();
            $('#clients')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#clients')
                .append($("<option></option>")
                .attr("value", val.ClientId)
                .text(val.CompanyName));
            });
        }
    });
}


function getresultsCA(EditionId) {
    document.getElementById("EditionId").value = EditionId;
    $('#InsertParam').trigger('click');
    $("#bloqueo").show();
}

function getresultsGeolocation(ClientType) {
    document.getElementById("ClientTypeId").value = ClientType;
    $('#InsertParam').trigger('click');
    $("#bloqueo").show();
}