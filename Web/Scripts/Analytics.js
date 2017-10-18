
$(document).ready(function () {
    $(document).ready(function () {
        $('#example').dataTable({
            "columnDefs": [{ "searchable": false, "targets": [1, 2] }] ,
            "language": {
                "lengthMenu": "<div class='col-md-3 title_filter'>" +
                    "<div class='title-word' style='font-weight:normal; text-transform:none; font-size:17px;'> Mostrar <select class='form-control input-sm'> </div>" +
                  '<option value="10">10</option>' +
                  '<option value="20">20</option>' +
                  '<option value="30">30</option>' +
                  '<option value="40">40</option>' +
                  '<option value="50">50</option>' +
                  '<option value="-1">Todo</option>' +
                  '</select> productos' + '</div>'
            }
        });
    });
});

function addFile(item) {

    $('#txtFileName').val($(item).val())
    var fln = $("#txtFileName").val();
    $("#example tbody").empty();
    $("#Res").empty();

    if (!fln.trim() == true) {
        swal({ title: "¡Atención!", type: "error", text: "Selecione un archivo csv" });
    }
    else {
        $("#SendCSVFile").ajaxSubmit({
            type: "POST",
            url: "../Analytics/Index",
            success: function (data) {
                var res = data;
                document.getElementById('Botones').style.display = 'block';
            }
        })
    }
}

function addFileCode(item) {

    $('#txtFileNameCode').val($(item).val())
    var fln = $("#txtFileNameCode").val();
    
    var value =1;


    if (!fln.trim() == true) {
        swal({ title: "¡Atención!", type: "error", text: "Selecione un archivo csv" });
    }
    else {
        $("#SendCSVFileCode").ajaxSubmit({
            type: "POST",
            url: "../Analytics/Index",
            data: { Value: value },
            success: function (data) {
                var res = data;
                document.getElementById('BotonesCode').style.display = 'block';
            }
        })
    }
}

function rowsPerPage(item) {

    var val = item;
    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Analytics/rowsPerPage",
        data: { Value: val },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
        }
    })

}

function Profesion() {
    var _value = 1;
    var Professions = [];
    var total = [];
    var color = 'rgba(0, 99, 132, 0.6)';
    var color2 = 'rgba(150, 99, 132, 1)';//
    var sumatotal = 0;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Analytics/GetData",
        traditional: true,
        data: {
            value: _value
        },
        success: function (data) {
            $.each(data, function (index, item) {
                Professions.push(item.Name);
                total.push(item.Total);
                sumatotal = sumatotal + item.Total;
                $("#_Prof tbody").append(
                              "<tr>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profe' >" + item.Name + "</td>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profetotal' >" + item.Total + "</td>"
                              + "</tr>"
                              );

            });
            $("#TotalProf").append(
                              "<Span>Total: " + sumatotal + " </Span"
                              );
            var popCanvas = document.getElementById("GraphProfessions").getContext("2d");
            var barChart = new Chart(popCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: Professions,
                    datasets: [{
                        label: 'PROFESIÓN',
                        data: total,
                        backgroundColor: color
                    }]
                },
                options: {
                    onClick: ClickProfession,
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 100,
                        }
                    }
                }
            });

            function ClickProfession(evt, element)
            {
                if (element.length)
                {
                    var data = Professions[element[0]._index];
                    alert(data);
                }
            }
            document.getElementById('verProfessions').style.display = 'block';
        }
    });
}
function OcultarProf(elemet) {
    document.getElementById('verProfessions').style.display = 'none';
    $("#_Prof tbody").empty();
    $("#TotalProf").empty();
}

function Specialities() {
    var _value = 2;
    var Specialities = [];
    var total = [];
    var color = 'rgba(120, 99, 132, 1)';
    var color2 = 'rgba(90, 99, 132, 1)';//
    var sumatotal = 0;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Analytics/GetData",
        traditional: true,
        data: {
            value: _value
        },
        success: function (data) {
            $.each(data, function (index, item) {
                Specialities.push(item.Name);
                total.push(item.Total);
                sumatotal = sumatotal + item.Total;
                $("#_Spe tbody").append(
                              "<tr>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profe' >" + item.Name + "</td>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profetotal' >" + item.Total + "</td>"
                              + "</tr>"
                              );

            });
            $("#TotalSpe").append(
                              "<Span>Total: " + sumatotal + " </Span"
                              );
            var popCanvas = document.getElementById("GraphSpecialities").getContext("2d");
            var barChart = new Chart(popCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: Specialities,
                    datasets: [{
                        label: 'ESPECIALIDAD',
                        data: total,
                        backgroundColor: color
                    }]
                },
                options: {
                    onClick: ClickSpecialities,
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 100,
                        }
                    }
                }
            });

            function ClickSpecialities(evt, element) {
                if (element.length) {
                    var data = Specialities[element[0]._index];
                    alert(data);
                }
            }
            document.getElementById('verSpecialities').style.display = 'block';
        }
    });
}
function OcultarSpe(elemet) {
    document.getElementById('verSpecialities').style.display = 'none';
    $("#_Spe tbody").empty();
    $("#TotalSpe").empty();
}

function Countries() {
    var _value = 3;
    var Countries = [];
    var total = [];
    var color = 'rgba(255, 206, 86, 0.6)';
    var color2 = 'rgba(90, 99, 132, 1)';//
    var sumatotal = 0;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Analytics/GetData",
        traditional: true,
        data: {
            value: _value
        },
        success: function (data) {
            $.each(data, function (index, item) {
                Countries.push(item.Name);
                total.push(item.Total);
                sumatotal = sumatotal + item.Total;
                $("#_Coun tbody").append(
                              "<tr>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profe' >" + item.Name + "</td>"
                              + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profetotal' >" + item.Total + "</td>"
                              + "</tr>"
                              );

            });
            $("#TotalCoun").append(
                              "<Span>Total: " + sumatotal + " </Span"
                              );
            var popCanvas = document.getElementById("GraphCountry").getContext("2d");
            var barChart = new Chart(popCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: Countries,
                    datasets: [{
                        label: 'PAÍS',
                        data: total,
                        backgroundColor: color
                    }]
                },
                options: {
                    onClick: ClickCountries,
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 100,
                        }
                    }
                }
            });

            function ClickCountries(evt, element) {
                if (element.length) {
                    var data = Countries[element[0]._index];
                    alert(data);
                }
            }
            document.getElementById('verCountry').style.display = 'block';
        }
    });
}
function OcultarCoun(elemet) {
    document.getElementById('verCountry').style.display = 'none';
    $("#_Coun tbody").empty();
    $("#TotalCoun").empty();
}

function Country()
{
    document.getElementById('verState').style.display = 'none';
    $("#_State tbody").empty();
    $("#TotalState").empty();
    $("#GraphStates").remove();
    $("#divstate").append("<canvas id='GraphStates'></canvas>");

    $("#Getcountries").empty();
    var  _value = 1;
    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Analytics/GetCountry",
        data: { Value: _value },
        success: function (data) {
            $("#Getcountries").append(
                                  "<option value='0'>Seleccione el País...</option>");
                $.each(data, function (index, item) {
                    $("#Getcountries").append(
                                  "<option value='" + item.CountryId + "'>" + item.CountryName
                                  + "</option>"
                                  );

                });
                document.getElementById('Getcountries').style.display = 'block';
        }
    })

}

function States() {
    document.getElementById('verState').style.display = 'none';
    $("#_State tbody").empty();
    $("#TotalState").empty();
    var _cid = $("#Getcountries").val();
    $("#Getcountries").empty();
    document.getElementById('Getcountries').style.display = 'none';

    var _value = 4;
    var States = [];
    var total = [];
    var color = 'rgba(153, 102, 255, 0.6)';
    var color2 = 'rgba(90, 99, 132, 1)';//
    var sumatotal = 0;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Analytics/GetData",
        traditional: true,
        data: {
            value: _value, cid : _cid
        },
        success: function (data) {
            if (data == false)
            {
                swal({ title: "¡Sin Datos!", type: "error"});
            }
            else {
                $.each(data, function (index, item) {
                    States.push(item.Name);
                    total.push(item.Total);
                    sumatotal = sumatotal + item.Total;
                    $("#_State tbody").append(
                                  "<tr>"
                                  + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profe' >" + item.Name + "</td>"
                                  + "<td style='vertical-align:middle' align='center'>" + "<input type='hidden' id='_profetotal' >" + item.Total + "</td>"
                                  + "</tr>"
                                  );

                });
                $("#TotalState").append(
                                  "<Span>Total: " + sumatotal + " </Span"
                                  );
                var popCanvas = document.getElementById("GraphStates").getContext("2d");
                var barChart = new Chart(popCanvas, {
                    type: 'horizontalBar',
                    data: {
                        labels: States,
                        datasets: [{
                            label: 'ESTADO',
                            data: total,
                            backgroundColor: color
                        }]
                    },
                    options: {
                        onClick: ClickStates,
                        responsive: true,
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 100,
                            }
                        }
                    }
                });

                function ClickStates(evt, element) {
                    if (element.length) {
                        var data = States[element[0]._index];
                        alert(data);
                    }
                }
                document.getElementById('verState').style.display = 'block';
            }
            
        }
    });
}
function OcultarState(elemet) {
    document.getElementById('verState').style.display = 'none';
    $("#_State tbody").empty();
    $("#TotalState").empty();
}