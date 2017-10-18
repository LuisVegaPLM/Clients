function getproductstatusSM(item) {

    var tr = $(item).parents("tr:first");

    var value = $(item).val();

    var CId = $("#ClientId").val();

    var PId = $("#inputProductId");

    $(PId).val(value);

    var name = tr.find("#lblName").text();

    var PName = $("#lblProductName");

    $(PName).text(name);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/getproductstatus",
        data: { Product: value, Client: CId },
        success: function (data) {
            $("#ProductStatus").trigger("click");
            $("#results").empty();
            $.each(data, function (index, val) {
                $("#results")
                 .append($("<div></div>").append(val.StatusName))
            });

        }
    })
}

function getproductstatusProd(item) {

    var tr = $(item).parents("tr:first");

    var value = $(item).val();

    var CId = $("#ClientId").val();

    var PId = $("#inputProductId");

    $(PId).val(value);

    var name = tr.find("#lblNameProd").text();

    var PName = $("#lblProductName");

    $(PName).text(name);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/getproductstatus",
        data: { Product: value, Client: CId },
        success: function (data) {
            $("#ProductStatus").trigger("click");
            $("#results").empty();
            $.each(data, function (index, val) {
                $("#results")
                 .append($("<div></div>").append(val.StatusName))
            });

        }
    })
}

function checkPrintedProducts(item) {

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/insertprintedproducts",
            data: { Product: PId, Client: CId, Edition: EId },
            success: function (data) {
                if (data == "_existContent") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto tiene Contenido. Contactar al Administrador!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $(item).prop("checked", false);
                }
                if (data == "_NotExistECP") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:18px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto no esta marcado como Participante!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $(item).prop("checked", false);
                }
                if (data == true) {
                }

            }
        })
    }
    else if ($(item).is(":not(:checked)")) {

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/deleteprinteddproducts",
            data: { Product: PId, Client: CId, Edition: EId },
            success: function (data) {
                if (data == true) {
                    $(item).prop("checked", false);
                }
            }
        })
    }
}

function checkparticipantproducts(item) {

    var tr = $(item).parents("tr:first");

    var prodId = tr.find("#lblProductid").val();
    var client = $("#ClientId").val();
    var edition = $("#EditionId").val();

    if (tr.find("#Participant").is(":checked")) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "../SalesModule/insertparticipantproducts",
            data: { Product: prodId, Client: client, Edition: edition },
            success: function (data) {
                if (data == true) {
                }
            }
        });
    }
    else if (tr.find("#Participant").is(":not(:checked)")) {

        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "../SalesModule/deleteparticipantproducts",
            data: { Product: prodId, Client: client, Edition: edition },
            success: function (data) {
                if (data == true) {
                    //tr.find("#clasifbtn").hide();
                    tr.find("#Mentionated").prop("checked", false);
                    tr.find("#SIDEF").prop("checked", false);
                    tr.find("#CC").prop("checked", false);
                    tr.find("#SC").prop("checked", false);
                }
                if (data == "_errorpc") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto tiene Contenido. Contactar al Administrador!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    tr.find("#Participant").prop("checked", true);
                }
                if (data == "_existContent") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto tiene Contenido. Contactar al Administrador!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    tr.find("#Participant").prop("checked", true);
                }
            }
        });
    }
}

function GetCorrectionsClasif(item) {

    var tr = $(item).parents("tr:first");

    var PName = tr.find("#lblName").text();
    var PId = tr.find("#lblProductid").val();
    var CId = $("#ClientId").val();

    var elmPname = document.getElementById("lblProductNameCls");

    $(elmPname).text(PName);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/SavePId",
        data: { Product: PId, Client: CId },
        success: function (data) {
            if (data == true) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../SalesModule/GetCategories",
                    data: { Product: PId, Client: CId },
                    success: function (data) {
                        $("#ReasignedCats").empty();
                        $("#ReasignedCats").append($("<thead class='webgrid-header'></thead>").append($("<tr><th style='width:50%'>Categor&iacute;a Nivel 3</th><th style='width:50%'>Categor&iacute;a Nivel 4</th></tr>")));
                        $.each(data, function (index, val) {
                            $("#ReasignedCats").append($("<tbody></tbody>").append($("<tr><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.CategoryThree + "</label></td><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.LeafCategory + "</label></td></tr>")));
                        })
                    }
                })

                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../SalesModule/GetDeletedCategories",
                    data: { Product: PId, Client: CId },
                    success: function (data) {
                        $("#AsociatedCats").empty();
                        $("#AsociatedCats").append($("<thead class='webgrid-header'></thead>").append($("<tr><th style='width:50%'>Categor&iacute;a Nivel 3</th><th style='width:50%'>Categor&iacute;a Nivel 4</th></tr>")));
                        $.each(data, function (index, val) {
                            $("#AsociatedCats").append($("<tbody></tbody>").append($("<tr><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.CategoryThree + "</label></td><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.LeafCategory + "</label></td></tr>")));
                        })
                    }
                })

                $("#Btncorrections").trigger("click");

            }
        }
    })





}


/*                                                  MARCAS                                                      */

function Distributors(item) {

    var tr = $(item).parents("tr:first");

    var BId = tr.find("#lblBrandId").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/Distributors",
            data: { Brand: BId, Edition: EId, Client: CId, Operation: "INSERT" },
            success: function (data) {
                if (data == true) {
                    tr.find("#Representative").prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/Distributors",
            data: { Brand: BId, Edition: EId, Client: CId, Operation: "DELETE" },
            success: function (data) {

            }
        })
    }

}

function Representative(item) {

    var tr = $(item).parents("tr:first");

    var BId = tr.find("#lblBrandId").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/Representative",
            data: { Brand: BId, Edition: EId, Client: CId, Operation: "INSERT" },
            success: function (data) {
                if (data == true) {
                    tr.find("#Distributors").prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/Representative",
            data: { Brand: BId, Edition: EId, Client: CId, Operation: "DELETE" },
            success: function (data) {

            }
        })
    }
}

function editExpireDescription(item) {

    var tr = $(item).parents("tr:first");

    tr.find("#lblExpireDescription").hide();
    tr.find("#txtExpireDescription").show();

}

function saveExpireDescription(item) {
    var tr = $(item).parents("tr:first");

    tr.find("#lblExpireDescription").show();
    tr.find("#txtExpireDescription").hide();

    var Exp = $(item).val();
    var BId = tr.find("#lblBrandId").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/EditClientBrands",
        data: { Client: CId, Edition: EId, Brand: BId, Expire: Exp },
        success: function (data) {
            if (data == true) {
                tr.find("#lblExpireDescription").text(Exp);
            }
        }
    })

}

/*                                                  EDITAR PRODUCTOS                                            */

function activefieldstoeditproductSM(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".display-mode").hide();
    tr.find(".edit-mode").show();

    var PName = tr.find("#lblName").text();
    var RS = tr.find("#lblregister").text();
    var CB = tr.find("#lblbarcode").text();

    sessionStorage.PName = PName;
    sessionStorage.RS = RS;
    sessionStorage.CB = CB;
}

function canceleditproductSM(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".edit-mode").hide();
    tr.find(".display-mode").show();

    tr.find("#Name").val(sessionStorage.PName);

    tr.find("#Register").val(sessionStorage.RS);

    tr.find("#barcode").val(sessionStorage.CB);

    sessionStorage.PName = null;
    sessionStorage.RS = null;
    sessionStorage.CB = null;

    removerequieredfieldSM(item);
}

function savechangeseditproductsSM(item) {
    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var PName = tr.find("#Name").val();
    var RS = tr.find("#Register").val();
    var CB = tr.find("#barcode").val();
    var CId = $("#ClientId").val();
    var BCId = tr.find("#lblBarCodeId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!PName.trim() == true) {

        tr.find("#Name").css("border-color", "red");

        var place = tr.find("#Name");

        var msg = $.parseHTML("El Campo no puede quedar Vac&iacute;o");

        var message = msg[0].textContent;

        $(place).attr("placeholder", "" + message + "");
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/EditProduct",
            data: { Product: PId, ProductName: PName, Register: RS, BarCode: CB, Client: CId, BarCodeI: BCId },
            success: function (data) {
                if (data == "_existProduct") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "_barcodeempty") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El C&oacute;digo de Barras no puede quedar vac&iacuteo!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == true) {
                    tr.find(".edit-mode").hide();
                    tr.find(".display-mode").show();
                    tr.find("#lblName").text(PName);
                    tr.find("#lblregister").text(RS);
                    tr.find("#lblbarcode").text(CB);
                    //
                }
                else if (data == "_RegisterSanitaryExist") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Registro Sanitario ya existe asociado a otro Producto!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "_alreadyexistBarCode") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El C&oacute;digo de Barras ya existe asociado a otro Producto!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "OKBC") {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function removerequieredfieldSM(item) {
    var tr = $(item).parents("tr:first");

    tr.find("#Name").css('border', '1px solid #ccc')

    var place = tr.find("#Name");

    $(place).attr("placeholder", "");
}


/*                                                  MARCAR SIDEF                                                */

function inserproductSIDEF(item) {

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataTyp: "Json",
            url: "../SalesModule/inserproductSIDEF",
            data: { Product: PId, Edition: EId, Client: CId },
            success: function (data) {
                if (data != true) {
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataTyp: "Json",
            url: "../SalesModule/deleteproductSIDEF",
            data: { Product: PId, Edition: EId, Client: CId },
            success: function (data) {
                if (data != true) {
                }
            }
        })
    }

}


/*                                                  CAMBIOS EN PRODUCTOS                                                */

function insertProductChanges(item) {

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/insertProductChanges",
            data: { Product: PId, Client: CId, Edition: EId, Operation: "Insert" },
            success: function (data) {
                if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto NO esta marcado como Participante!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $(item).prop("checked", false);
                }
                if (data == true) {
                    tr.find("#SC").prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/insertProductChanges",
            data: { Product: PId, Client: CId, Edition: EId, Operation: "Delete" },
            success: function (data) {

            }
        })
    }

}

function insertProductWithoutChanges(item) {
    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var CDId = $("#CountryId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ($(item).is(":checked")) {

        $("#bloqueo").show();

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/insertProductWithoutChanges",
            data: { Product: PId, Client: CId, Edition: EId, Operation: "Insert", Country: CDId },
            success: function (data) {
                if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Operaci&oacute;n Invalida!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto NO esta marcado como Participante!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $(item).prop("checked", false);

                    $("#bloqueo").hide();
                }
                if (data == true) {
                    tr.find("#CC").prop("checked", false);

                    $("#bloqueo").hide();
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/insertProductChanges",
            data: { Product: PId, Client: CId, Edition: EId, Operation: "Delete", Country: CDId },
            success: function (data) {

            }
        })
    }
}

/*                                                  AGREGAR PRODUCTO                                            */

function openformaddproduct() {
    $("#btnaddProduct").trigger("click");

    var CId = $("#CountryId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/getManufactures",
        data: { Country: CId },
        success: function (data) {
            $("#Manufactures").empty();
            $('#Manufactures')
               .append($("<option></option>")
               .attr("value", 0)
               .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#Manufactures')
                .append($("<option></option>")
                .attr("value", val.ManufacturerId)
                .text(val.Manufacturer));
            });
        }
    })

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/getDistributors",
        data: { Country: CId },
        success: function (data) {
            $("#Distributors").empty();
            $('#Distributors')
               .append($("<option></option>")
               .attr("value", 0)
               .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#Distributors')
                .append($("<option></option>")
                .attr("value", val.DistributorId)
                .text(val.Distributor));
            });
        }
    })
}

function addProduct() {

    $("#bloqueo").show();

    var PName = $("#txtProductName").val();
    var RS = $("#Regsanitary").val();
    var BC = $("#BarCode").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var M = $("#Manufactures").val();
    var Dist = $("#Distributors").val();
    var PPImp = false;

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ($("#PPImp").is(":checked")) {
        PPImp = true;
    }

    //if ((!PName.trim() == false) && (M != 0) && (Dist != 0)) {
    if ((!PName.trim() == false)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/addProduct",
            data: {
                Product: PName,
                Register: RS,
                BarCode: BC,
                Client: CId,
                Manufacture: M,
                Distributor: Dist,
                Printed: PPImp,
                Edition: EId
            },
            success: function (data) {

                if (data == true) {
                    setTimeout('document.location.reload()');
                }
                else if (data == "_existProduct") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "_RegisterSanitaryExist") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Registro Sanitario YA existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }

                else if (data == "_alreadyexistBarCode") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Código de Barras YA existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
            }
        })

    }
    else {
        if (!PName.trim() == true) {
            $('#divProductName').addClass('has-error');
            $('.errorP').show();
        }

        //if (M == 0) {
        //    $('#SelectManufactures').addClass('has-error');
        //    $('.errorM').show();
        //}

        //if (Dist == 0) {
        //    $('#SelectDistributor').addClass('has-error');
        //    $('.errorD').show();
        //}
    }
}

function cancelcreateproduct() {
    $('#divProductName').removeClass('has-error');
    $('.errorP').hide()

    $('#SelectManufactures').removeClass('has-error');
    $('.errorM').hide();

    $('#SelectDistributor').removeClass('has-error');
    $('.errorD').hide();

    $("#txtProductName").val('');
    $("#Regsanitary").val('');
    $("#BarCode").val('');

    $("#PPImp").prop("checked", false);
    $("#PPSE").prop("checked", false);

    $("#bloqueo").hide();
}



/*                                                  CLASIFICAR PRODUCTOS                                    */

var list = [];

function getlevel4SM(value) {

    sessionStorage.HomogeneousCategoryIdSM = value;

    sessionStorage.ListItems = 1;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmexp).hide();
    $(elmclp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/getlevel4",
        data: { HomogeneousCategory: value, Client: CId, Product: PId },
        success: function (data) {
            $(elmls).empty();
            $.each(data, function (index, val) {
                $(elmls).append($("<li></li>").append("<input type='checkbox' onclick='checkCategoriesSM($(this))' value='" + val.LeafCategoryId + "'/><span>&nbsp;&nbsp;" + val.LeafCategory + "</span>"));
            });
        }
    })
}

function collapselevel4(value) {

    sessionStorage.HomogeneousCategoryId = null;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmclp).hide();
    $(elmexp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    $(elmls).empty();

}

function searchCategoriesSM() {

    $("#bloqueo").show();

    var value = $("#TextSearch").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/searchCategories",
        data: { CategoryName: value },
        success: function (data) {
            setTimeout('document.location.reload()');
        }
    })

}

function checkCategoriesSM(item) {

    var Id = $(item).val();
    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    var HCId = sessionStorage.HomogeneousCategoryIdSM;

    if ($(item).is(":checked")) {

        list.push({
            'Id': Id,
            'CId': CId,
            'PId': PId,
            'HCId': HCId
        });

    }
    else if ($(item).is(":not(:checked)")) {

        var index = functiontofindIndexByKeyValue(list, "Id", "HCId", "PId", "CId", Id, HCId, PId, CId);

        if (index == null) {
        } else if (index >= 0) {

            list.splice(index, 1);
        }
    }
}

function functiontofindIndexByKeyValue(arraytosearch, Id, HCId, PId, CId, valuetosearch, valueHCId, valuePId, valueCId) {
    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][Id] == valuetosearch) {
            if (arraytosearch[i][HCId] == valueHCId) {
                if (arraytosearch[i][PId] == valuePId) {
                    if (arraytosearch[i][CId] == valueCId) {
                        return i;
                    }
                }
            }
        }
    }
    return null;
};

function saveCategoriesSM() {
    $("#bloqueo").show();

    var jsonresponse = JSON.stringify(list);
    var size = $(list).size();
    var EId = $("#editionid").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (size == 0) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; No se ha seleccionado ninguna Categor&iacute;a!!!</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/saveCategories",
            data: { ListItems: jsonresponse, ArraySize: size, Edition: EId },
            success: function (data) {
                setTimeout('document.location.reload()');
            }
        })
    }
}

function deleteProductLeafCategoriesSM(item) {
    $("#bloqueo").show();
    var tr = $(item).parents("tr:first");

    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    var Id = tr.find("#LeafCategoryIdL4").val();
    var HCId = tr.find("#HomogeneousCategoryIdL3").val();
    var EId = $("#editionid").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/deleteProductLeafCategories",
        data: { Client: CId, Product: PId, LeafCategory: Id, Category: HCId, Edition: EId },
        success: function (data) {
            if (data == false) {
                d += "<p class='labels'></p>";
                d += "<p class='labels'>- Ocurrio un Error. Contactar al Administrador.</p>";
                apprise("" + d + "", { 'animate': true });

                $("#bloqueo").hide();
            }
            if (data == true) {
                setTimeout('document.location.reload()');
            }
        }
    })

}



/*                                                  ANUNCIOS                                                     */

function OperAddAdvert(item) {

    var tr = $(item).parents("tr:first");

    var CTId = tr.find("#lblCategoryThreeId").val();
    var CT = tr.find("#lblCategoryThree").text();
    var CN = $("#spnCompanyName").text();

    var elmCN = document.getElementById("lblCompanyName");
    $(elmCN).text(CN);

    var elmCT = document.getElementById("lblCategoryName");
    $(elmCT).text(CT);

    var elmCTId = document.getElementById("txtCategoryId");
    $(elmCTId).val(CTId);

    $("#OperAddAdvert").trigger("click");

}

function AddAdverts() {

    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();
    var Name = $("#AdvertName").val();
    var Desc = $("#AdvertDescription").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!Name.trim() == false) && (!Desc.trim() == false)) {

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/AddAdverts",
            data: { Edition: EId, Client: CId, AdvertName: Name, Description: Desc },
            success: function (data) {
                if (data == true) {
                    setTimeout('document.location.reload()');
                }
                else if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ocurrio un error. Contactar al Administrador!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "_existAdvertName") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El nombre de anuncio ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })

    }
    else {
        if (!Name.trim() == true) {
            $('#divAdvertName').addClass('has-error');
            $('.errorAN').show();
        }
        if (!Desc.trim() == true) {
            $('#divAdvertDescription').addClass('has-error');
            $('.errorAD').show();
        }
    }
}

function cancelAddAdverts() {
    $('#AdvertName').val('');
    $('#AdvertDescription').val('');

    $('#divAdvertName').removeClass('has-error');
    $('.errorAN').hide();

    $('#divAdvertDescription').removeClass('has-error');
    $('.errorAD').hide();

}

function helpAddAdvert() {
    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Aviso!!!</label>"
    d += "<p></p>"
    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Debe ingresar Anuncio, de lo contrario NO podr&aacute; asociar la Categor&iacute;a!!!</p>"
    apprise("" + d + "", { 'animate': true });
}

function deleteclientAdverts(item) {

    var tr = $(item).parents("tr:first");

    var CTId = tr.find("#lblCategoryThreeId").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/deleteclientAdverts",
        data: { Edition: EId, Client: CId, Category: CTId },
        success: function (data) {
            if (data == true) {
                setTimeout('document.location.reload()');
            }
            if (data == false) {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ocurrio un error. Contactar al Administrador!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
        }
    })

}

//function 



/*                                                  SUCURSALES                                                     */

function ActivefieldstoEditBranch(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeB").hide();
    tr.find(".edit-modeB").show();

    var cn = tr.find("#lblCompanyNameB").text();

    sessionStorage.CNB = cn;

    var sn = tr.find("#lblShortNameB").text();

    sessionStorage.SNB = sn;

}

function CancelEditBranch(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeB").hide();
    tr.find(".display-modeB").show();

    tr.find("#CompanyNameB").val(sessionStorage.CNB);
    tr.find("#ShortNameB").val(sessionStorage.SNB);

    sessionStorage.SNB = null;
    sessionStorage.CNB = null;
}

function SaveChangesBranch(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientIdB").val();
    var cn = tr.find("#CompanyNameB").val();
    var sn = tr.find("#ShortNameB").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/EditBranch",
        data: { Client: CId, CompanyName: cn, ShortName: sn },
        success: function (data) {
            if (data == true) {
                tr.find(".edit-modeB").hide();
                tr.find(".display-modeB").show();

                sessionStorage.SNB = null;
                sessionStorage.CNB = null;

                tr.find("#lblCompanyNameB").text(cn);
                tr.find("#lblShortNameB").text(sn);
            }
            if (data == "_existsClient") {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El nombre de Cliente ya Existe!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
        }
    })
}

function InsertParticipantClient(item) {

    var tr = $(item).parents("tr:first");
    var CId = tr.find("#lblClientIdB").val();
    var EId = $("#EditionId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/InsertParticipantClient",
            data: { Client: CId, Edition: EId },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeleteParticipantClients",
            data: { Client: CId, Edition: EId },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", true);
                }
            }
        })
    }
}

function AddBranchs() {

    var Name = $("#BranchName").val();
    var ShortN = $("#BranchShortName").val();
    var CId = $("#ClientId").val();
    var CNId = $("#CountryId").val();
    var EId = $("#EditionId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!Name.trim() == true) {
        $("#divAddBranch").addClass("has-error");
        $('.errorB').show();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/AddBranchs",
            data: { Client: CId, CompanyName: Name, ShortName: ShortN, Country: CNId, Edition: EId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ocurrio un error. Contactar al Administrador!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                if (data == "_existsClient") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El nombre de Cliente ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }
}

function cancelAddBranchs() {
    $("#divAddBranch").removeClass("has-error");
    $('.errorB').hide();

    $("#BranchShortName").val('');
    $("#BranchName").val('');
}




/*                                                  DIRECCIONES                                                 */

function ActiveFieldstoEditAddress(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".display-modeA").hide();
    tr.find(".edit-modeA").show();

    var lblAddress = tr.find("#lblAddress").text();
    sessionStorage.lblAddress = lblAddress;

    var lblSuburb = tr.find("#lblSuburb").text();
    sessionStorage.lblSuburb = lblSuburb;

    var lblCity = tr.find("#lblCity").text();
    sessionStorage.lblCity = lblCity;

    var lblState = tr.find("#lblState").text();
    sessionStorage.lblState = lblState;

    var lblZipCode = tr.find("#lblZipCode").text();
    sessionStorage.lblZipCode = lblZipCode;

    var lblEmail = tr.find("#lblEmail").text();
    sessionStorage.lblEmail = lblEmail;

    var lblWeb = tr.find("#lblWeb").text();
    sessionStorage.lblWeb = lblWeb;

    var Location = tr.find("#lblLocation").text();
    sessionStorage.lblLocation = Location;
}

function CancelEditAddress(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeA").hide();
    tr.find(".display-modeA").show();

    tr.find("#txtAddress").val(sessionStorage.lblAddress);
    tr.find("#txtSuburb").val(sessionStorage.lblSuburb);
    tr.find("#txtCity").val(sessionStorage.lblCity);
    tr.find("#txtState").val(sessionStorage.lblSuburb);
    tr.find("#txtZipCode").val(sessionStorage.lblZipCode);
    tr.find("#txtEmail").val(sessionStorage.lblEmail);
    tr.find("#txtWeb").val(sessionStorage.lblWeb);
    tr.find("#txtLocation").val(sessionStorage.lblLocation);
}

function SaveChangedAddress(item) {

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressId").val();
    var Addr = tr.find("#txtAddress").val();
    var Sub = tr.find("#txtSuburb").val();
    var Cty = tr.find("#txtCity").val();
    var ST = tr.find("#txtState").val();
    var CP = tr.find("#txtZipCode").val();
    var ml = tr.find("#txtEmail").val();
    var WB = tr.find("#txtWeb").val();
    var lc = tr.find("#txtLocation").val();
    var StId = tr.find("#SelectStateId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!lc.trim() == true) && (!Addr.trim() == true) && (!Cty.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!ml.trim() == true) && (!WB.trim() == true)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        var lgZC = CP.length;

        if (lgZC == 4) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Aviso!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El campo C&oacute;digo Postal, tiene 4 digitos, ser&aacute; agregado un Cero al principio para completar el dato </p>"
            apprise("" + d + "", { 'verify': true }, function (r) {
                if (r) {
                    CP = "0" + CP;
                    tr.find("#txtZipCode").val(CP);

                    $.ajax({
                        Type: "POST",
                        dataType: "Json",
                        url: "../SalesModule/SaveChangedAddress",
                        data: {
                            AddressIdd: AddrId,
                            Address: Addr,
                            Suburb: Sub,
                            City: Cty,
                            State: ST,
                            ZipCode: CP,
                            Mail: ml,
                            Web: WB,
                            Location: lc,
                            StateI: StId
                        },
                        success: function (data) {
                            if (data == true) {
                                setTimeout("document.location.reload()");
                            }
                        }
                    })
                }
                else {

                }
            });


        }
        else if (lgZC < 4) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; C&oacute;digo Postal incorrecto, sobrepasa el n&uacute;mero m&iacute;nimo de caracteres.</p>"
            apprise("" + d + "", { 'animate': true });
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/SaveChangedAddress",
                data: {
                    AddressIdd: AddrId,
                    Address: Addr,
                    Suburb: Sub,
                    City: Cty,
                    State: ST,
                    ZipCode: CP,
                    Mail: ml,
                    Web: WB,
                    Location: lc,
                    StateI: StId
                },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
}

function AddAddress() {

    var STId = $("#SelectStateIdfrm").val();
    var CTy = $("#City").val();
    var Sub = $("#Suburb").val();
    var CP = $("#ZipCode").val();
    var ST = $("#Street").val();
    var mail = $("#Email").val();
    var wb = $("#Web").val();
    var Lc = $("#Location").val();
    var CId = $("#CountryId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((STId == 0) && (STId == '0')) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Debe seleccionar Estado!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        if ((!CTy.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!mail.trim() == true) && (!wb.trim() == true)) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
            apprise("" + d + "", { 'animate': true });
        }
        else {
            if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../SalesModule/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: BId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
            else {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../SalesModule/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: CLId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
        }
    }
}

function DeleteAddresses(item) {

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: BId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: CLId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }

}

function GetStatesByCountry(value) {

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../IP/GetStatesByCountry",
        traditional: true,
        data: { Country: value },
        success: function (data) {

            $('#SelectStateIdIP').empty();
            $('#SelectStateIdIP')
                .append($("<option></option>")
                .attr("value", 0)
                .text("Seleccione..."));
            $.each(data, function (index, val) {
                $('#SelectStateIdIP')
                .append($("<option></option>")
                .attr("value", val.StateId)
                .text(val.StateName));
            });
        }
    });
}

function AddAddressIP() {

    var STId = $("#SelectStateIdIP").val();
    var CTy = $("#City").val();
    var Sub = $("#Suburb").val();
    var CP = $("#ZipCode").val();
    var ST = $("#Street").val();
    var mail = $("#Email").val();
    var wb = $("#Web").val();
    var Lc = $("#Location").val();
    var CId = $("#SelectCountryIP").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();


    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";


    if ((CId == 0) && (CId == '0')) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Debe seleccionar Pa&iacute;s!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        if ((!CTy.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!mail.trim() == true) && (!wb.trim() == true)) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
            apprise("" + d + "", { 'animate': true });
        }
        else {

            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/AddAddress",
                data: {
                    Address: ST,
                    Suburb: Sub,
                    City: CTy,
                    StateI: STId,
                    ZipCode: CP,
                    Mail: mail,
                    Web: wb,
                    Country: CId,
                    Client: CLId,
                    Location: Lc
                },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
}


/*                                                  TELÉFONOS                                                 */

function ActiveFieldsToEditPhone(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCP").hide();
    tr.find(".edit-modeCP").show();

    var lda = tr.find("#lblLada").text();
    var nmbr = tr.find("#lblNumber").text();

    sessionStorage.Lada = lda;
    sessionStorage.Number = nmbr;

}

function CancelEditPhone(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCP").show();
    tr.find(".edit-modeCP").hide();

    tr.find("#txtLada").val(sessionStorage.Lada);
    tr.find("#txtNumber").val(sessionStorage.Number);
}

function SaveChangesEditPhone(item) {

    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneId").val();
    var lda = tr.find("#txtLada").val();
    var nmbr = tr.find("#txtNumber").val();

    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    lda = lda.replace("(", "");
    lda = lda.replace(")", "");

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!nmbr.trim() == true) {

        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Campo <b>N&uacute;mero</b> NO puede quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });

    }
    else {
        if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/EditPhones",
                data: { ClientPhone: CPId, Lada: lda, Number: nmbr, Client: BId },
                success: function (data) {
                    if (data == true) {
                        tr.find(".display-modeCP").show();
                        tr.find(".edit-modeCP").hide();

                        tr.find("#lblLada").text(lda);
                        tr.find("#txtLada").val(lda);
                        tr.find("#lblNumber").text(nmbr);

                    }
                }
            })
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/EditPhones",
                data: { ClientPhone: CPId, Lada: lda, Number: nmbr, Client: CLId },
                success: function (data) {
                    if (data == true) {
                        tr.find(".display-modeCP").show();
                        tr.find(".edit-modeCP").hide();

                        tr.find("#lblLada").text(lda);
                        tr.find("#txtLada").val(lda);
                        tr.find("#lblNumber").text(nmbr);

                    }
                }
            })
        }
    }
}

function AddPhones() {

    var pt = $("#PhoneTypes").val();
    var lda = $("#Lada").val();
    var nmbr = $("#Number").val();

    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    lda = lda.replace("(", "");
    lda = lda.replace(")", "");

    if ((pt != 0) && (!nmbr.trim() == false)) {
        if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: BId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: CLId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
    else {
        if (pt == 0) {
            $("#divPhoneTypes").addClass("has-error");
            $(".errorPT").show();
        }
        if (!nmbr.trim() == true) {
            $("#divNumber").addClass("has-error");
            $(".errorN").show();
        }
    }
}

function DeletePhones(item) {
    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeletePhones",
            data: { ClientPhone: CPId, Client: BId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeletePhones",
            data: { ClientPhone: CPId, Client: CLId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}



/*                                              BUSCADORES                                                  */

function searchproduct() {

    var ProductName = $("#SearchProduct").val();

    window.location.href = '../SalesModule/Index?ProductName=' + ProductName + ''

}


function searchIP() {

    var ProductName = $("#SearchIP").val();

    window.location.href = '../IP/Index?ProductName=' + ProductName + ''

}

function searchIPProd() {

    var ProductName = $("#SearchIPProd").val();

    window.location.href = '../IP/IndexProd?ProductName=' + ProductName + ''

}

function searchAdverts() {

    var CategoryName = $("#SearchCategoryName").val();

    window.location.href = '../SalesModule/SearchAdverts?CategoryName=' + CategoryName + ''
}

function searchAdvertsAsoc() {

    var CategoryName = $("#SearchCategoryNameAsoc").val();

    window.location.href = '../SalesModule/AdvertsByClient?CategoryName=' + CategoryName + ''
}

function searchBrands() {

    var BrandName = $("#SearchBrandName").val();

    window.location.href = '../SalesModule/SearchBrand?BrandName=' + BrandName + ''
}

function searchBrandsAsoc() {

    var BrandName = $("#SearchBrandNameAsoc").val();

    window.location.href = '../SalesModule/Brands?BrandName=' + BrandName + ''
}


function searchproductCL() {

    var ProductName = $("#SearchProduct").val();

    window.location.href = '../LI/Index?ProductName=' + ProductName + ''

}

function searchproductProd() {

    var ProductName = $("#SearchProduct").val();

    window.location.href = '../Production/Index?ProductName=' + ProductName + ''

}



function searchBrandsAsocProd() {

    var BrandName = $("#SearchBrandNameAsoc").val();

    window.location.href = '../Production/Brands?BrandName=' + BrandName + ''
}

/*                                              REPORTES                                                  */

function GetDate() {
    var date = $("#FormDate").val();

    if (!date.trim() == true) {

    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Reports/GetDate",
            data: { Date: date },
            success: function (data) {

            }
        })
    }


}








/////////////------------------------------------   CLASIFICACIÓN

/*                                                  CLASIFICAR PRODUCTOS                                    */

var listCL = [];

function getlevel4CL(value) {

    sessionStorage.HomogeneousCategoryIdCL = value;

    sessionStorage.ListItems = 1;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmexp).hide();
    $(elmclp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/getlevel4",
        data: { HomogeneousCategory: value, Client: CId, Product: PId },
        success: function (data) {
            $(elmls).empty();
            $.each(data, function (index, val) {
                $(elmls).append($("<li></li>").append("<input type='checkbox' onclick='checkCategoriesCL($(this))' value='" + val.LeafCategoryId + "'/><span>&nbsp;&nbsp;" + val.LeafCategory + "</span>"));
            });
        }
    })
}

function collapselevel4CL(value) {

    sessionStorage.HomogeneousCategoryIdCL = null;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmclp).hide();
    $(elmexp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    $(elmls).empty();

}

function searchCategoriesCL() {

    $("#bloqueo").show();

    var value = $("#TextSearch").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/searchCategories",
        data: { CategoryName: value },
        success: function (data) {
            setTimeout('document.location.reload()');
        }
    })

}

function checkCategoriesCL(item) {

    var Id = $(item).val();
    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    var HCId = sessionStorage.HomogeneousCategoryIdCL;

    if ($(item).is(":checked")) {

        listCL.push({
            'Id': Id,
            'CId': CId,
            'PId': PId,
            'HCId': HCId
        });
    }
    else if ($(item).is(":not(:checked)")) {

        var index = functiontofindIndexByKeyValueLC(listCL, "Id", "HCId", "PId", "CId", Id, HCId, PId, CId);

        if (index == null) {
        } else if (index >= 0) {

            listCL.splice(index, 1);
        }
    }
}

function functiontofindIndexByKeyValueLC(arraytosearch, Id, HCId, PId, CId, valuetosearch, valueHCId, valuePId, valueCId) {
    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][Id] == valuetosearch) {
            if (arraytosearch[i][HCId] == valueHCId) {
                if (arraytosearch[i][PId] == valuePId) {
                    if (arraytosearch[i][CId] == valueCId) {
                        return i;
                    }
                }
            }
        }
    }
    return null;
};

function saveCategoriesCL() {
    $("#bloqueo").show();

    var jsonresponse = JSON.stringify(listCL);
    var size = $(listCL).size();
    var EId = $("#editionid").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (size == 0) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; No se ha seleccionado ninguna Categor&iacute;a!!!</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/saveCategories",
            data: { ListItems: jsonresponse, ArraySize: size, Edition: EId },
            success: function (data) {
                setTimeout('document.location.reload()');
            }
        })
    }
}

function deleteProductLeafCategoriesCL(item) {
    $("#bloqueo").show();
    var tr = $(item).parents("tr:first");

    var CId = $("#clientid").val();
    var PId = $("#ProductId").val();
    var Id = tr.find("#LeafCategoryIdL4").val();
    var HCId = tr.find("#HomogeneousCategoryIdL3").val();
    var EId = $("#editionid").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/deleteProductLeafCategories",
        data: { Client: CId, Product: PId, LeafCategory: Id, CategoryThree: HCId, Edition: EId },
        success: function (data) {
            if (data == false) {
                d += "<p class='labels'></p>";
                d += "<p class='labels'>- Ocurrio un Error. Contactar al Administrador.</p>";
                apprise("" + d + "", { 'animate': true });

                $("#bloqueo").hide();
            }
            if (data == true) {
                setTimeout('document.location.reload()');
            }
        }
    })

}

function getproductstatus(item) {

    $("#results").empty();

    var tr = $(item).parents("tr:first");

    var value = $(item).val();

    var CId = $("#ClientId").val();

    var PId = $(item).val();

    $(PId).val(value);

    var name = tr.find("#lblName").text();

    var PName = $("#lblProductName");

    $(PName).text(name);

    var elmPId = document.getElementById("inputProductId");

    $(elmPId).val(PId);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/getproductstatus",
        data: { Product: value, Client: CId },
        success: function (data) {
            $("#ProductStatus").trigger("click");
            $("#results").empty();
            $.each(data, function (index, val) {
                $("#results")
                 .append($("<div></div>").append(val.StatusName))
            });

        }
    })
}

function insertproductstatus(Status) {
    var PId = $("#inputProductId").val();
    var CId = $("#ClientId").val();
    var STId = $(Status).val();

    if ($(Status).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/insertproductstatus",
            data: { Product: PId, Client: CId, Status: STId, Operation: "Insert" },
            success: function (data) {
            }
        })
    }
    else if ($(Status).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/insertproductstatus",
            data: { Product: PId, Client: CId, Status: STId, Operation: "Delete" },
            success: function (data) {
            }
        })
    }
}

function insertproductstatusProd(Status) {
    var PId = $("#inputProductId").val();
    var CId = $("#ClientId").val();
    var STId = $(Status).val();

    if ($(Status).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/insertproductstatus",
            data: { Product: PId, Client: CId, Status: STId, Operation: "Insert" },
            success: function (data) {
            }
        })
    }
    else if ($(Status).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/insertproductstatus",
            data: { Product: PId, Client: CId, Status: STId, Operation: "Delete" },
            success: function (data) {
            }
        })
    }
}


function GetCorrectionsClasifLI(item) {

    var tr = $(item).parents("tr:first");

    var PName = tr.find("#lblName").text();
    var PId = tr.find("#lblProductid").val();
    var CId = $("#ClientId").val();

    var elmPname = document.getElementById("lblProductNameCls");

    $(elmPname).text(PName);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/SavePId",
        data: { Product: PId, Client: CId },
        success: function (data) {
            if (data == true) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../LI/GetCategories",
                    data: { Product: PId, Client: CId },
                    success: function (data) {
                        $("#ReasignedCats").empty();
                        $("#ReasignedCats").append($("<thead class='webgrid-header'></thead>").append($("<tr><th style='width:50%'>Categor&iacute;a Nivel 3</th><th style='width:50%'>Categor&iacute;a Nivel 4</th></tr>")));
                        $.each(data, function (index, val) {
                            $("#ReasignedCats").append($("<tbody></tbody>").append($("<tr><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.CategoryThree + "</label></td><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.LeafCategory + "</label></td></tr>")));
                        })
                    }
                })

                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../LI/GetDeletedCategories",
                    data: { Product: PId, Client: CId },
                    success: function (data) {
                        $("#AsociatedCats").empty();
                        $("#AsociatedCats").append($("<thead class='webgrid-header'></thead>").append($("<tr><th style='width:50%'>Categor&iacute;a Nivel 3</th><th style='width:50%'>Categor&iacute;a Nivel 4</th></tr>")));
                        $.each(data, function (index, val) {
                            $("#AsociatedCats").append($("<tbody></tbody>").append($("<tr><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.CategoryThree + "</label></td><td style='width:50%'><label style='font-weight:100; font-size:11px'>" + val.LeafCategory + "</label></td></tr>")));
                        })
                    }
                })

                $("#Btncorrections").trigger("click");

            }
        }
    })

}

function OpenFormAddType(item) {

    var tr = $(item).parents("tr:first");

    var CTId = tr.find("#lblCategoryThreeId").val();

    var CName = tr.find("#lblCategoryThree").text();

    var elmNC = document.getElementById("lblCategoryAddT");
    $(elmNC).text(CName);

    var elmCId = document.getElementById("txtCategoryThreeIdAddT");
    $(elmCId).val(CTId);

    $("#BtnAddAdvert").trigger("click");
}

function AddCategoriesToAdverts(item) {

    var tr = $(item).parents("tr:first");

    var CTId = $("#txtCategoryThreeIdAddT").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var Type = $("#SelectAdvertTypes").val();
    var Adv = $("#txtAdvertId").val();

    if (Type == 0) {
        $('#divAdvertTypesA').addClass('has-error');
        $('.errorSATA').show();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/AddCategoriesToAdverts",
            data: { CategoryThree: CTId, Client: CId, Edition: EId, AdvertType: Type, Advert: Adv },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function DeleteAdverts(item) {

    var tr = $(item).parents("tr:first");

    var CTId = tr.find("#lblCategoryThreeIdAs").val();
    var Type = tr.find("#AdvertTypeIdAs").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var Adv = $("#txtAdvertId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/DeleteAdverts",
        data: { CategoryThree: CTId, Client: CId, Edition: EId, AdvertType: Type, Advert: Adv },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
        }
    })
}

function InsertClientProductCategories(item) {
    var tr = $(item).parents("tr:first");

    var CTId = tr.find("#lblCategoryThreeIdAs").val();
    var Type = tr.find("#AdvertTypeIdAs").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var Adv = $("#txtAdvertId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/InsertPPCategoriesToAdverts",
            data: { CategoryThree: CTId, Client: CId, Edition: EId, AdvertType: Type, Advert: Adv },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/DeletePPAdverts",
            data: { CategoryThree: CTId, Client: CId, Edition: EId, AdvertType: Type, Advert: Adv },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", false);
                }
            }
        })
    }
}

function ActiveFieldsEditAdvert(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeAd").hide();
    tr.find(".edit-modeAd").show();


    sessionStorage.lblAdvertName = tr.find("#lblAdvertName").text();
    sessionStorage.lblAdvertDescription = tr.find("#lblAdvertDescription").text();
}

function CancelEditAdvert(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeAd").show();
    tr.find(".edit-modeAd").hide();

    tr.find("#txtAdvertName").val(sessionStorage.lblAdvertName);
    tr.find("#txtAdvertDescription").val(sessionStorage.lblAdvertDescription);
}

function SaveEditAdvert(item) {

    var tr = $(item).parents("tr:first");

    var AdId = tr.find("#lblAdvertId").val();
    var AdName = tr.find("#txtAdvertName").val();
    var AdDesc = tr.find("#txtAdvertDescription").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!AdName.trim() == true) || (!AdDesc.trim() == true)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; No pueden quedar todos los campos vac&iacute;os!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/EditAdvert",
            data: { Advert: AdId, Name: AdName, Description: AdDesc },
            success: function (data) {
                if (data == true) {
                    tr.find(".display-modeAd").show();
                    tr.find(".edit-modeAd").hide();

                    tr.find("#lblAdvertName").text(AdName);
                    tr.find("#lblAdvertDescription").text(AdDesc);
                }
                else if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; El nombre de anuncio ya existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }

}


function addAdvertImage(item) {

    var tr = $(item).parents("tr:first");

    tr.find('#txtFileName').val($(item).val())

}

function SaveAdvertImage(item) {

    var tr = $(item).parents("tr:first");

    var AId = tr.find("#lblAdvertId").val();
    var FileName = tr.find("#txtFileName").val();
    var CId = $("#CountryId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!FileName.trim() == true) {
        var message = "Debe seleccionar una Imagen...";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        tr.find("#sendimages").ajaxSubmit({
            type: "POST",
            url: "../SalesModule/addAdvertImage",
            data: { Advert: AId, Country: CId },
            success: function (data) {
                if (data == true) {
                    setTimeout('document.location.reload()');
                }
            }
        })
    }
}

function ShowFormAddAdvertImage(item) {

    var tr = $(item).parents("tr:first");

    tr.find('#DivAdvertImage').hide();
    tr.find('#DivAddAdvert').show();

}

function CancelAdvertImage(item) {
    var tr = $(item).parents("tr:first");

    tr.find('#txtFileName').val('');

    tr.find('#DivAdvertImage').show();
    tr.find('#DivAddAdvert').hide();
}


/************************* ************************ ************************ ************************ ************************ */
/************************               PRODUCTION          ************************ */


/*                                                  EDITAR PRODUCTOS                                            */

function activefieldstoeditproductProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".display-mode").hide();
    tr.find(".edit-mode").show();

    var PName = tr.find("#lblNameProd").text();
    var RS = tr.find("#lblregisterProd").text();
    var CB = tr.find("#lblbarcodeProd").text();

    sessionStorage.PNameProd = PName;
    sessionStorage.RSProd = RS;
    sessionStorage.CBProd = CB;
}

function canceleditproductProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".edit-mode").hide();
    tr.find(".display-mode").show();

    tr.find("#NameProd").val(sessionStorage.PNameProd);

    tr.find("#RegisterProd").val(sessionStorage.RSProd);

    tr.find("#barcodeProd").val(sessionStorage.CBProd);

    sessionStorage.PNameProd = null;
    sessionStorage.RSProd = null;
    sessionStorage.CBProd = null;

    removerequieredfieldProd(item);
}

function savechangeseditproductsProd(item) {
    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductidProd").val();
    var PName = tr.find("#NameProd").val();
    var RS = tr.find("#RegisterProd").val();
    var CB = tr.find("#barcodeProd").val();
    var CId = $("#ClientId").val();
    var BCId = tr.find("#lblBarCodeIdProd").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!PName.trim() == true) {

        tr.find("#NameProd").css("border-color", "red");

        var place = tr.find("#NameProd");

        var msg = $.parseHTML("El Campo no puede quedar Vac&iacute;o");

        var message = msg[0].textContent;

        $(place).attr("placeholder", "" + message + "");
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditProduct",
            data: { Product: PId, ProductName: PName, Register: RS, BarCode: CB, Client: CId, BarCodeI: BCId },
            success: function (data) {
                if (data == "_existProduct") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "_barcodeempty") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El C&oacute;digo de Barras no puede quedar vac&iacuteo!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == true) {
                    sessionStorage.PName = null;
                    sessionStorage.RS = null;
                    sessionStorage.CB = null;
                    tr.find(".edit-mode").hide();
                    tr.find(".display-mode").show();
                    tr.find("#lblNameProd").text(PName);
                    tr.find("#lblregisterProd").text(RS);
                    tr.find("#lblbarcodeProd").text(CB);
                }
                else if (data == "_RegisterSanitaryExist") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Registro Sanitario ya existe asociado a otro Producto!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == "_alreadyexistBarCode") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El C&oacute;digo de Barras ya existe asociado a otro Producto!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }
}

function removerequieredfieldProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find("#NameProd").css('border', '1px solid #ccc')

    var place = tr.find("#NameProd");

    $(place).attr("placeholder", "");
}


/*                                                 AGREGAR HTML                                                 */

function addHTMLFile(item) {

    $('#txtFileName').val($(item).val())

}

function SaveHTMLFile(item) {

    $("#bloqueo").show();

    var PId = $("#ProductId").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    var FileName = $("#txtFileName").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!FileName.trim() == true) {
        var message = "Debe seleccionar una Imagen...";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {
        $("#SendHTMLFile").ajaxSubmit({
            type: "POST",
            url: "../Production/SaveHTMLFile",
            data: { Product: PId, Client: CId, Edition: EId },
            success: function (data) {
                if (data == true) {
                    setTimeout('document.location.reload()');
                }
                else if (data == "errorProductName") {
                    var message = "Hubo un error al Obtener el Nombre del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorPropag") {
                    var message = "Hubo un error al Obtener la Propaganda del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorLaboratory") {
                    var message = "Hubo un error al Obtener el Laboratorio del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorAttributes") {
                    var message = "Hubo un error al Obtener los Atributos del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "Error_File") {
                    var message = "Hubo un error al Procesar archivo. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "_error") {
                    var message = "Hubo un error al Generar archivo XML. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
            }
        })
    }
}

function CanceladdHTMLFile(item) {

    $('#txtFileName').val('');
}


/*                                                 AGREGAR HTML                                                 */

function ActivefieldstoEditBranchProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeBProd").hide();
    tr.find(".edit-modeBProd").show();

    var cn = tr.find("#lblCompanyNameBProd").text();

    sessionStorage.CNBProd = cn;

    var sn = tr.find("#lblShortNameBProd").text();

    sessionStorage.SNBProd = sn;

}

function CancelEditBranchProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeBProd").hide();
    tr.find(".display-modeBProd").show();

    tr.find("#CompanyNameBProd").val(sessionStorage.CNBProd);
    tr.find("#ShortNameBProd").val(sessionStorage.SNBProd);

    sessionStorage.SNB = null;
    sessionStorage.CNB = null;
}

function SaveChangesBranchProd(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientIdBProd").val();
    var cn = tr.find("#CompanyNameBProd").val();
    var sn = tr.find("#ShortNameBProd").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/EditBranch",
        data: { Client: CId, CompanyName: cn, ShortName: sn },
        success: function (data) {
            if (data == true) {
                tr.find(".edit-modeBProd").hide();
                tr.find(".display-modeBProd").show();

                sessionStorage.SNBProd = null;
                sessionStorage.CNBProd = null;

                tr.find("#lblCompanyNameBProd").text(cn);
                tr.find("#lblShortNameBProd").text(sn);
            }
            if (data == "_existsClient") {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El nombre de Cliente ya Existe!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
        }
    })
}


/*                                                  DIRECCIONES                                                 */

function ActiveFieldstoEditAddressProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".display-modeAProd").hide();
    tr.find(".edit-modeAProd").show();

    var lblAddress = tr.find("#lblAddressProd").text();
    sessionStorage.lblAddressProd = lblAddress;

    var lblSuburb = tr.find("#lblSuburbProd").text();
    sessionStorage.lblSuburbProd = lblSuburb;

    var lblCity = tr.find("#lblCityProd").text();
    sessionStorage.lblCityProd = lblCity;

    var lblState = tr.find("#lblStateProd").text();
    sessionStorage.lblStateProd = lblState;

    var lblZipCode = tr.find("#lblZipCodeProd").text();
    sessionStorage.lblZipCodeProd = lblZipCode;

    var lblEmail = tr.find("#lblEmailProd").text();
    sessionStorage.lblEmailProd = lblEmail;

    var lblWeb = tr.find("#lblWebProd").text();
    sessionStorage.lblWebProd = lblWeb;

    var Location = tr.find("#lblLocationProd").text();
    sessionStorage.lblLocationProd = Location;
}

function CancelEditAddressProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeAProd").hide();
    tr.find(".display-modeAProd").show();

    tr.find("#txtAddressProd").val(sessionStorage.lblAddressProd);
    tr.find("#txtSuburbProd").val(sessionStorage.lblSuburbProd);
    tr.find("#txtCityProd").val(sessionStorage.lblCityProd);
    tr.find("#txtStateProd").val(sessionStorage.lblSuburbProd);
    tr.find("#txtZipCodeProd").val(sessionStorage.lblZipCodeProd);
    tr.find("#txtEmailProd").val(sessionStorage.lblEmailProd);
    tr.find("#txtWebProd").val(sessionStorage.lblWebProd);
    tr.find("#txtLocationProd").val(sessionStorage.lblLocationProd);
}

function SaveChangedAddressProd(item) {

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressIdProd").val();
    var Addr = tr.find("#txtAddressProd").val();
    var Sub = tr.find("#txtSuburbProd").val();
    var Cty = tr.find("#txtCityProd").val();
    var CP = tr.find("#txtZipCodeProd").val();
    var ml = tr.find("#txtEmailProd").val();
    var WB = tr.find("#txtWebProd").val();
    var lc = tr.find("#txtLocationProd").val();
    var StId = tr.find("#SelectStateIdProd").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!lc.trim() == true) && (!Addr.trim() == true) && (!Cty.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ml.trim() == true) && (!WB.trim() == true)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        var lgZC = CP.length;

        if (lgZC == 4) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Aviso!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El campo C&oacute;digo Postal, tiene 4 digitos, ser&aacute; agregado un Cero al principio para completar el dato </p>"
            apprise("" + d + "", { 'verify': true }, function (r) {
                if (r) {
                    CP = "0" + CP;
                    tr.find("#txtZipCodeProd").val(CP);

                    $.ajax({
                        Type: "POST",
                        dataType: "Json",
                        url: "../Production/SaveChangedAddress",
                        data: {
                            AddressIdd: AddrId,
                            Address: Addr,
                            Suburb: Sub,
                            City: Cty,
                            State: "",
                            ZipCode: CP,
                            Mail: ml,
                            Web: WB,
                            Location: lc,
                            StateI: StId
                        },
                        success: function (data) {
                            if (data == true) {
                                setTimeout("document.location.reload()");
                            }
                        }
                    })
                }
                else {

                }
            });
        }
        else if (lgZC < 4) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; C&oacute;digo Postal incorrecto, sobrepasa el n&uacute;mero m&iacute;nimo de caracteres.</p>"
            apprise("" + d + "", { 'animate': true });
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../Production/SaveChangedAddress",
                data: {
                    AddressIdd: AddrId,
                    Address: Addr,
                    Suburb: Sub,
                    City: Cty,
                    State: "",
                    ZipCode: CP,
                    Mail: ml,
                    Web: WB,
                    Location: lc,
                    StateI: StId
                },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
}

function AddAddressProd() {

    $("#bloqueo").show();

    var STId = $("#SelectStateIdProdFrm").val();
    var CTy = $("#CityProd").val();
    var Sub = $("#SuburbProd").val();
    var CP = $("#ZipCodeProd").val();
    var ST = $("#StreetProd").val();
    var mail = $("#EmailProd").val();
    var wb = $("#WebProd").val();
    var Lc = $("#LocationProd").val();
    var CId = $("#CountryId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((STId == 0) && (STId == '0')) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Debe seleccionar Estado!!!</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {
        if ((!CTy.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!mail.trim() == true) && (!wb.trim() == true)) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
            apprise("" + d + "", { 'animate': true });
            $("#bloqueo").hide();
        }
        else {
            if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../Production/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: BId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
            else {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../Production/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: CLId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
        }
    }
}

function DeleteAddressesProd(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressIdProd").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: BId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: CLId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }

}


/*                                                  TELÉFONOS                                                 */

function ActiveFieldsToEditPhoneProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCPProd").hide();
    tr.find(".edit-modeCPProd").show();

    var lda = tr.find("#lblLadaProd").text();
    var nmbr = tr.find("#lblNumberProd").text();

    sessionStorage.LadaProd = lda;
    sessionStorage.NumberProd = nmbr;

}

function CancelEditPhoneProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCPProd").show();
    tr.find(".edit-modeCPProd").hide();

    tr.find("#txtLadaProd").val(sessionStorage.LadaProd);
    tr.find("#txtNumberProd").val(sessionStorage.NumberProd);
}

function SaveChangesEditPhoneProd(item) {

    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneIdProd").val();
    var lda = tr.find("#txtLadaProd").val();
    var nmbr = tr.find("#txtNumberProd").val();

    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    lda = lda.replace("(", "");
    lda = lda.replace(")", "");

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!nmbr.trim() == true) {

        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Campo <b>N&uacute;mero</b> NO puede quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });

    }
    else {

        if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../Production/EditPhones",
                data: { ClientPhone: CPId, Lada: lda, Number: nmbr, Client: BId },
                success: function (data) {
                    if (data == true) {
                        tr.find(".display-modeCPProd").show();
                        tr.find(".edit-modeCPProd").hide();

                        tr.find("#lblLadaProd").text(lda);
                        tr.find("#txtLadaProd").val(lda);
                        tr.find("#lblNumberProd").text(nmbr);
                    }
                }
            })
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../Production/EditPhones",
                data: { ClientPhone: CPId, Lada: lda, Number: nmbr, Client: CLId },
                success: function (data) {
                    if (data == true) {
                        tr.find(".display-modeCPProd").show();
                        tr.find(".edit-modeCPProd").hide();

                        tr.find("#lblLadaProd").text(lda);
                        tr.find("#txtLadaProd").val(lda);
                        tr.find("#lblNumberProd").text(nmbr);

                    }
                }
            })
        }
    }
}

function AddPhonesProd() {

    $("#bloqueo").show();

    var pt = $("#PhoneTypesProd").val();
    var lda = $("#LadaProd").val();
    var nmbr = $("#NumberProd").val();

    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    lda = lda.replace("(", "");
    lda = lda.replace(")", "");

    if ((pt != 0) && (!nmbr.trim() == false)) {
        if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../Production/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: BId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../Production/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: CLId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
    else {
        if (pt == 0) {
            $("#divPhoneTypesProd").addClass("has-error");
            $(".errorPTProd").show();
        }
        if (!nmbr.trim() == true) {
            $("#divNumberProd").addClass("has-error");
            $(".errorNProd").show();
        }
        $("#bloqueo").hide();
    }
}

function DeletePhonesProd(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneIdProd").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/DeletePhones",
            data: { ClientPhone: CPId, Client: BId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/DeletePhones",
            data: { ClientPhone: CPId, Client: CLId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function cancelAddPhones() {

    $("#divPhoneTypesProd").removeClass("has-error");
    $(".errorPTProd").hide();

    $("#divNumberProd").removeClass("has-error");
    $(".errorNProd").hide();
}


/*                                                  MARCAS                                                      */

function ActiveFieldsEditBrand(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeBRProd").hide();
    tr.find(".edit-modeBRProd").show();

    var BName = tr.find("#lblBrandNameProd").text();

    sessionStorage.BName = BName;

    var BDesc = tr.find("#lblExpireDescriptionProd").text();

    sessionStorage.BDesc = BDesc;
}

function CancelEditBrand(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeBRProd").show();
    tr.find(".edit-modeBRProd").hide();

    tr.find("#txtBrandNameProd").val(sessionStorage.BName);
    tr.find("#txtExpireDescriptionProd").val(sessionStorage.BDesc);
}

function SaveBrand(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var BId = tr.find("#lblBrandIdProd").val();
    var BName = tr.find("#txtBrandNameProd").val();
    var BDesc = tr.find("#txtExpireDescriptionProd").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var BTId = tr.find("#SelectBrandType").val();

    var Ids = "#Id_" + BTId;

    var BTName = tr.find(Ids).text();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!BName.trim() == true) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El nombre de Marca NO puede quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/SaveBrand",
            data: { Brand: BId, Name: BName, Description: BDesc, Client: CId, Edition: EId, BrandType: BTId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else {
                    $("#bloqueo").hide();
                }
            }
        })
    }
}


/*                                                 AGREGAR IMAGEN DE MARCAS                                                 */

function addBrandName(item) {

    $('#txtFileName').val($(item).val())

}

function SaveBrandImage() {

    $("#bloqueo").show();

    var txt = $("#txtFileName").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var BId = $("#BrandId").val();
    var CNId = $("#CountryId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!txt.trim() == true) {

        var message = "Debe seleccionar una Imagen...";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();
    }
    else {
        $("#SendBrandImages").ajaxSubmit({
            type: "POST",
            url: "../Production/InsertBrandImage",
            data: { Client: CId, Edition: EId, Brand: BId, Country: CNId },
            success: function (data) {
                if (data == true) {
                    setTimeout('document.location.reload()');
                }
            }
        })
    }

}

function CancelSaveBrand() {
    $("#txtFileName").val('');
}


/*                                                  ANUNCIOS                                                      */

function ShowFormAddAdvertImageProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find('#DivAdvertImage').hide();
    tr.find('#DivAddAdvertProd').show();

}

function CancelAdvertImageProd(item) {
    var tr = $(item).parents("tr:first");

    tr.find('#txtFileName').val('');

    tr.find('#DivAdvertImage').show();
    tr.find('#DivAddAdvertProd').hide();
}

function SaveAdvertImageProd(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var AId = tr.find("#lblAdvertIdProd").val();
    var FileName = tr.find("#txtFileName").val();
    var CountryId = $("#CountryId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!FileName.trim() == true) {
        var message = "Debe seleccionar una Imagen...";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();
    }
    else {
        tr.find("#sendimages").ajaxSubmit({
            type: "POST",
            url: "../Production/addAdvertImage",
            data: { Advert: AId, Country: CountryId },
            success: function (data) {
                if (data == true) {
                    setTimeout('document.location.reload()');
                }
            }
        })
    }
}

function ActiveFieldsEditAdvertProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeAd").hide();
    tr.find(".edit-modeAd").show();


    sessionStorage.lblAdvertNameProd = tr.find("#lblAdvertNameProd").text();
    sessionStorage.lblAdvertDescriptionProd = tr.find("#lblAdvertDescriptionProd").text();
}

function CancelEditAdvertProd(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeAd").show();
    tr.find(".edit-modeAd").hide();

    tr.find("#txtAdvertNameProd").val(sessionStorage.lblAdvertNameProd);
    tr.find("#txtAdvertDescriptionProd").val(sessionStorage.lblAdvertDescriptionProd);
}

function SaveEditAdvertProd(item) {

    var tr = $(item).parents("tr:first");

    var AdId = tr.find("#lblAdvertIdProd").val();
    var AdName = tr.find("#txtAdvertNameProd").val();
    var AdDesc = tr.find("#txtAdvertDescriptionProd").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!AdName.trim() == true) || (!AdDesc.trim() == true)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; No pueden quedar todos los campos vac&iacute;os!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditAdvert",
            data: { Advert: AdId, Name: AdName, Description: AdDesc },
            success: function (data) {
                if (data == true) {
                    tr.find(".display-modeAd").show();
                    tr.find(".edit-modeAd").hide();

                    tr.find("#lblAdvertNameProd").text(AdName);
                    tr.find("#lblAdvertDescriptionProd").text(AdDesc);
                }
                else if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; El nombre de anuncio ya existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }

}


/*                                                  ANUNCIOS                                                      */

function SaveProductShot() {

    $("#bloqueo").show();

    var Ims = $("#SelectImageSize").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PId = $("#ProductId").val();
    var File = $("#txtFileName").val();
    var CNId = $("#CountryId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((Ims == "0") || (Ims == 0) || (Ims == null) || (Ims == undefined)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; Debe seleccionar un tama&ntilde;o de Imagen!!!</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();

    }
    else {
        if (!File.trim() == true) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; Debe seleccionar una Imagen!!!</p>"
            apprise("" + d + "", { 'animate': true });

            $("#bloqueo").hide();

        }
        else {
            $("#SendProductShots").ajaxSubmit({
                type: "POST",
                url: "../Production/AddProductShots",
                data: { Client: CId, Edition: EId, Product: PId, ImageSize: Ims, Country: CNId },
                success: function (data) {
                    if (data == true) {
                        setTimeout('document.location.reload()');
                    }
                    else if (data == false) {
                        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                        d += "<p></p>"
                        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; El Producto no ha sido marcado por Ventas para Insertar SIDEF</p>"
                        apprise("" + d + "", { 'animate': true });

                        $("#bloqueo").hide();

                    }
                }
            })
        }
    }

}

function DeleteProductShot(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var Id = tr.find("#EditionClientProductShotId").val();
    var Size = tr.find("#ImageSizeId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/DeleteProductShot",
        data: { EditionClientProductShot: Id, SizeI: Size },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
            else {
                $("#bloqueo").hide();
            }
        }
    })
}

function DeleteProductShotSIDEF(item) {

    var tr = $(item).parents("tr:first");

    var Id = tr.find("#EditionClientProductShotId").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/DeleteProductShotSIDEF",
        data: { Product: Id, Edition: EId, Client: CId },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
            else {
                $("#bloqueo").hide();
            }
        }
    })

}

function GetParticipantClient(CId) {

    $("#bloqueo").show();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/GetParticipantClient",
        data: { Client: CId },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
            else {
                $("#bloqueo").hide();
            }
        }
    })

}


/*                                                  PAGINAR ANUNCIOS                                                      */

function addCategoryPage(item) {

    var tr = $(item).parents("tr:first");

    var CP = tr.find("#CategoryPage").val();
    var PG = tr.find("#ProductPage").val();
    var EId = $("#EditionId").val();
    var CTId = tr.find("#lblCategoryThreeId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/addCategoryPage",
        data: { CategoryThree: CTId, Edition: EId, ProductPage: PG, CategoryPage: CP },
        success: function (data) {
            if (data == true) {
                $(item).prop("focus", false);
            }
        }
    })
}


/*                                                  PAGINAR CLIENTES                                                      */

function addClientPage(item) {

    var tr = $(item).parents("tr:first");

    var Val = $(item).val();
    var CId = tr.find("#lblClientId").val();
    var EId = $("#EditionId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/addClientPage",
        data: { Client: CId, Page: Val, Edition: EId },
        success: function (data) {
            if (data == true) {
                $(item).prop("focus", false);
            }
        }
    })
}

function ActiveFieldsEditClient(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeEC").hide();
    tr.find(".edit-modeEC").show();


    sessionStorage.lblCompanyNameEC = tr.find("#lblCompanyName").text();
    sessionStorage.lblShortNameEC = tr.find("#lblShortName").text();
}

function CancelEditClient(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeEC").hide();
    tr.find(".display-modeEC").show();

    tr.find("#txtCompanyName").val(sessionStorage.lblCompanyNameEC);
    tr.find("#txtShortName").val(sessionStorage.lblShortNameEC);
}

function SaveEditClients(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientId").val();
    var CN = tr.find("#txtCompanyName").val();
    var SN = tr.find("#txtShortName").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!CN.trim() == true) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; El nombre de Cliente NO puede quedar vac&iacute;o!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditClient",
            data: { Client: CId, CompanyName: CN, ShortName: SN },
            success: function (data) {
                if (data == true) {
                    sessionStorage.lblCompanyNameEC = null;
                    tr.find("#lblCompanyName").text(CN);

                    sessionStorage.lblShortNameEC = null;
                    tr.find("#lblShortName").text(SN);

                    tr.find(".edit-modeEC").hide();
                    tr.find(".display-modeEC").show();
                }
                else if (data == false) {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; El nombre de Cliente ya existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }
}





/*                                                  PAGINAR CLIENTES                                                      */

function loadAddHTML() {

    var Div = sessionStorage.ElmId;

    Div = "#" + Div;

    $(Div).trigger("click");

}

function GetAttributesForm() {

    sessionStorage.ElmId = "AttrHTML";

    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PId = $("#ProductId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/GetAttributes",
        data: { Product: PId, Client: CId, Edition: EId },
        success: function (data) {
            $("#AttributesFormTable").empty();
            $("#AttributesFormTable").append($("<thead class='webgrid-header'></thead>").append($("<tr><th>Atributos de Formaci&oacute;n</th><th class='column10'>Existe en BD</th></tr>")));
            $.each(data, function (index, val) {
                $("#AttributesFormTable").append($("<tbody></tbody>").append($("<tr><td><label style='font-weight:100; font-size:11px' class='NewAttributes'>" + val.AttributeName + "</label></td><td class='column10 text-center'>" + val.Exist + "</td></tr>")));
            })

            $("#AddNewAttributes").show();

        }
    })

}

function AddNewAttributes() {

    $("#bloqueo").show();

    var size = $(".NewAttributes").size();
    var EId = $("#EditionId").val();

    var list = [];

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    var count = 0;

    for (var i = 0; i <= size - 1; i++) {
        if ((i != 0) || (i != undefined)) {
            var r1 = $(".NewAttributes")[i];
            var rd = $(r1).text();

            if (rd.startsWith("<img")) {
                count = count + 1;
            }

            var obj = {}
            obj['Value'] = rd;
            list.push(obj);
        }
    }

    if (count > 0) {
        d += "<p style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Verificar Atributos!!!</p>"
        d += "<p style='width:300px;text-align:center;color:#05606d;font-style:italic'>Etiquetas de Imagen NO pueden ser Atributos.</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();

    }
    else {
        var jsonresponse = JSON.stringify(list);

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/AddNewAttributes",
            data: { ListItems: jsonresponse, Size: size, Edition: EId },
            success: function (data) {
                if (data == true) {
                    //$("#AttrHTML").trigger("click");

                    //$("#bloqueo").hide();
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function AddEditionAttributeGroup(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var AGId = $(item).val();
    var AId = tr.find("#AttributeId").val();
    var EId = $("#EditionId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/AddEditionAttributeGroup",
        data: { AttributeGroup: AGId, Attribute: AId, Edition: EId },
        success: function (data) {
            if (data == true) {

                setTimeout("document.location.reload()");

            }
        }
    })
}

function InsertProductContents() {

    $("#bloqueo").show();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PId = $("#ProductId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/InsertProductContents",
        data: { Client: CId, Edition: EId, Product: PId },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
            else {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Ocurrio un Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull; Ocurrio un error al asociar contenido por atributos, verificar HTML!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
        }
    })
}

function GetHTMLContent() {

    $("#DivHTMLContent").empty();
    sessionStorage.ElmId = 'HTML';

    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PId = $("#ProductId").val();
    var CNId = $("#CountryId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/GetHTMLContentAsc",
        data: { Client: CId, Edition: EId, Product: PId, Country: CNId },
        success: function (data) {
            var html = $.parseHTML(data);

            $("#DivHTMLContent").append(html);
        }
    })
}

function GetContent() {

    $("#tablecontent").empty();

    sessionStorage.ElmId = 'PC'

    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PId = $("#ProductId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/GetContent",
        data: { Client: CId, Edition: EId, Product: PId },
        success: function (data) {
            if (data != false) {
                $("#messagecontentnull").hide();
                $("#messagecontent").show();
                $('#tablecontent').empty();
                $('#tablecontent').append($("<thead class='webgrid-header'><tr><th class='labelsform'>ATRIBUTO</th><th class='labelsform'>CONTENIDO</th></tr></thead>"));
                $.each(data, function (index, val) {
                    if (val.Content.includes("<table")) {
                        $('#tablecontent')
                        .append($("<tr></tr>")
                            .append($("<td style='text-align:left; font-size:14px' class='labelsform'></td>")
                                .text(val.AttributeName))
                                    .append($("<td></td>").append($.parseHTML(val.Content))));
                    }

                    else if (val.Content.includes("<img")) {
                        $('#tablecontent')
                        .append($("<tr></tr>")
                            .append($("<td style='text-align:left; font-size:14px' class='labelsform'></td>")
                                .text(val.AttributeName))
                                    .append($("<td></td>").append($.parseHTML(val.Content))));
                    }
                    else {
                        $('#tablecontent')
                        .append($("<tr></tr>")
                            .append($("<td style='text-align:left; font-size:14px' class='labelsform'></td>")
                                .text(val.AttributeName))
                                    .append($("<td></td>").append($.parseHTML(val.Content))));
                    }
                });
            }
            else {
                $("#messagecontentnull").show();
            }
        }
    })
}



/*                                                  SEGMENTAR BLOAQUE HTML                                                  */

function SendHTML() {

    $("#bloqueo").show();

    var fln = $("#txtFileName").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!fln.trim() == true) {
        var message = "Para Segmentar debe seleccionar un archivo HTML";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {
        $("#SendHTMLFile").ajaxSubmit({
            type: "POST",
            url: "../Production/segmentallcontent",
            //data: { Product: PId, Client: CId, Edition: EId },
            success: function (data) {

                console.log(data);

                if (data == true) {
                    setTimeout('document.location.reload()');
                }
                else if (data == "errorProductName") {
                    var message = "Hubo un error al Obtener el Nombre del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorPropag") {
                    var message = "Hubo un error al Obtener la Propaganda del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorLaboratory") {
                    var message = "Hubo un error al Obtener el Laboratorio del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "errorAttributes") {
                    var message = "Hubo un error al Obtener los Atributos del producto. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "Error_File") {
                    var message = "Hubo un error al Procesar archivo. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == "_error") {
                    var message = "Hubo un error al Generar archivo XML. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else if (data == false) {
                    var message = "Hubo un error al Procesar archivo. Verificar etiquetas de HTML";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                    $("#bloqueo").hide();
                }
                else {
                    $("#bloqueo").hide();
                    $("#xmlresults").trigger("click");
                    $('#tablexmlerror').empty();
                    $.each(data, function (index, val) {
                        $('#tablexmlerror')
                        .append($("<div> &bull; &nbsp;" + val + "</div>"));
                    });

                    $("#xmlresult").show();
                    $("#xmlresults").show();
                }
            }
        })
    }
}

function AddHTMLCM(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#tblProductId").val();
    var CId = tr.find("#tblClientId").val();
    var EId = $("#EditionId").val();
    var FN = $(item).val();


    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/checkcontent",
        data: { Product: PId, Client: CId, Edition: EId },
        success: function (data) {
            if (data == true) {
                apprise('El producto ya tiene contenido asociado. &iquest;Desea continuar?', { 'verify': true }, function (r) {
                    if (r) {
                        // user clicked 'Yes'
                        $.ajax({
                            Type: "POST",
                            dataType: "Json",
                            url: "../Production/asociateContent",
                            data: { Product: PId, Client: CId, FileName: FN, Edition: EId },
                            success: function (data) {
                                if (data == true) {
                                    setTimeout("document.location.reload()");
                                }
                            }
                        })
                    }
                    else {
                        $("#bloqueo").hide();
                    }
                });
            }
            else if (data == false) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../Production/asociateContent",
                    data: { Product: PId, Client: CId, FileName: FN, Edition: EId },
                    success: function (data) {

                        console.log(data);

                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
        }
    })



}

function check() {

    apprise('Ready to begin?', { 'verify': true }, function (r) {
        if (r) {
            // user clicked 'Yes'
            alert("si");
        }
        else {
            // user clicked 'No'
            alert("no");
        }
    });
}

function SaveTargets() {
    $("#bloqueo").show();
    var product = $("#pname").val();
    product = replace(product);
    var propag = $("#propag").val();
    propag = replace(propag);
    var attr = $("#attribute").val();
    attr = replace(attr);
    var lab = $("#laboratory").val();
    lab = replace(lab);
    var prf = $("#lblpf").val();
    prf = replace(prf);
    var img = $("#lblimg").val();
    img = replace(img);
    var tbl = $("#lbltable").val();
    tbl = replace(tbl);
    var tr = $("#lbltr").val();
    tr = replace(tr);
    var td = $("#lbltd").val();
    td = replace(td);
    var reg = $("#lblreg").val();
    reg = replace(reg);
    var blt = $("#lblbullet").val();
    blt = replace(blt);
    var blt1 = $("#lblbullet1").val();
    blt1 = replace(blt1);
    var blt2 = $("#lblbullet2").val();
    blt2 = replace(blt2);
    var blt3 = $("#lblbullet3").val();
    blt3 = replace(blt3);
    var lg = $("#lbllogo").val();
    lg = replace(lg);
    var bld = $("#lblbold").val();
    bld = replace(bld);
    var ref = $("#lblreference").val();
    ref = replace(ref);
    var supind = $("#lblsuperindice").val();
    supind = replace(supind);
    var dat = $("#lbldata").val();
    dat = replace(dat);
    var cont = $("#lblcontainer").val();
    cont = replace(cont);
    var bdy = $("#lblbody").val();
    bdy = replace(bdy);
    $.ajax({
        type: "POST",
        dataType: "Json",
        url: "../Targets/gettargets",
        traditional: true,
        data: {
            pname: product, propaganda: propag, attribute: attr, laboratory: lab, paragraph: prf, image: img, table: tbl, row: tr, column: td,
            register: reg, bullet: blt, bullet1: blt1, bullet2: blt2, bullet3: blt3, log: lg, bold: bld, reference: ref, superindice: supind,
            _data: dat, container: cont, body: bdy
        },
        success: function (data) {
            if (data == true) {
                setTimeout('document.location.reload()');
            }
        }
    })
}


function replace(_string) {

    while ((_string.includes("<")) || (_string.includes(">")) || _string.includes("/")) {

        _string = _string.replace("<", "60");
        _string = _string.replace("/", "47");
        _string = _string.replace(">", "62");
        _string = _string.replace("62<", "6260");
        _string = _string.replace(">", "62");
    }

    return _string;
}

function AddProductPage(item) {

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductidProd").val();
    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();
    var Pg = $(item).val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/AddProductPage",
        data: { Product: PId, Client: CId, Edition: EId, Page: Pg },
        success: function (data) {
            if (data == false) {
                $(item).val('');
            }
        }
    })

}

function getxmlcnt() {

    sessionStorage.ElmId = 'XML';

    $(".getxmlcnt").empty();

    var EId = $("#EditionId").val();
    var CId = $("#ClientId").val();
    var PId = $("#ProductId").val();

    $.ajax({
        Type: "GET",
        dataType: "Json",
        data: { Edition: EId, Client: CId, Product: PId },
        url: "../Production/GetXMLCNT",
        success: function (data) {
            $(".getxmlcnt").append(data);
        }
    })
}



/*                  INTERNACIONALES             */

function addInternationalProduct() {

    var PN = $("#txtInternationalProductName").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!PN.trim() == true) {
        $('#divInternationalProductName').addClass('has-error');
        $('.errorIP').show();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/AddProduct",
            data: { Product: PN, Client: CId, Edition: EId },
            success: function (data) {
                if (data == "_existProduct") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto ya Existe!!!</p>"
                    apprise("" + d + "", { 'animate': true });
                }
                else if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}


function canceladdInternationalProduct() {
    $("#txtInternationalProductName").val('');
    $('#divInternationalProductName').removeClass('has-error');
    $('.errorIP').hide();
}

function activefieldstoeditIP(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeIP").hide();
    tr.find(".edit-modeIP").show();

    sessionStorage.IPName = tr.find("#lblName").text();
}

function CanceleditIP(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeIP").show();
    tr.find(".edit-modeIP").hide();

    tr.find("#InternationalProductName").val(sessionStorage.IPName);
}

function savechangeseditIP(item) {

    var tr = $(item).parents("tr:first");

    var PN = tr.find("#InternationalProductName").val();
    var CId = $("#ClientId").val();
    var IPId = tr.find("#lblInternationalProductId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../IP/EditProduct",
        data: { Product: PN, Client: CId, InternationalProduct: IPId },
        success: function (data) {
            if (data == "_existProduct") {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Producto ya Existe!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
            else if (data == true) {
                tr.find(".display-modeIP").show();
                tr.find(".edit-modeIP").hide();

                tr.find("#lblName").text(PN);
            }
        }
    })
}


function checkparticipantproductIP(item) {

    var tr = $(item).parents("tr:first");

    var ID = tr.find("#lblInternationalProductId").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/checkparticipantproductIP",
            data: { Edition: EId, Client: CId, InternationalProduct: ID, Operation: "Insert" },
            success: function (data) {

            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/checkparticipantproductIP",
            data: { Edition: EId, Client: CId, InternationalProduct: ID, Operation: "Delete" },
            success: function (data) {

            }
        })
    }
}

function updateGeolocalization(item) {

    var tr = $(item).parents("tr:first");

    var AId = tr.find("#lblAddressId").val();
    var Lat = tr.find("#txtLatitud").val();
    var Long = tr.find("#txtLongitud").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../IP/updateGeolocalization",
        data: { Address: AId, Latitud: Lat, Longitud: Long },
        success: function (data) {
            if (data == true) {
                tr.find("#lblLatitud").text(Lat);
                tr.find("#lblLongitud").text(Long);


                tr.find(".edit-modeA").hide();
                tr.find(".display-modeA").show();
            }
        }
    })

}

function ActiveFieldstoEditGeolocalization(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeA").hide();
    tr.find(".edit-modeA").show();

    sessionStorage.Longitud = tr.find("#lblLatitud").text();
    sessionStorage.Latitud = tr.find("#lblLongitud").text();
}

function CancelEditGeolocalization(item) {

    var tr = $(item).parents("tr:first");

    tr.find("#txtLatitud").val(sessionStorage.Latitud);
    tr.find("#txtLongitud").val(sessionStorage.Longitud);


    tr.find(".edit-modeA").hide();
    tr.find(".display-modeA").show();
}

function AddClientDescription() {

    $(".display-description").hide();
    $(".edit-description").show();


    sessionStorage.ClientDescription = $("#lblClientDescription").text();
}

function CancelAddClientDescription() {

    $(".edit-description").hide();
    $(".display-description").show();

    $("#txtClientDescription").val(sessionStorage.ClientDescription);
}

function SaveClientDescription() {

    var CId = $("#ClientId").val();
    var CD = $("#txtClientDescription").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../IP/ClientDescription",
        data: { Client: CId, Description: CD },
        success: function (data) {
            if (data == true) {
                $(".edit-description").hide();
                $(".display-description").show();
                $("#lblClientDescription").text(CD);

            }
        }
    })

}

function GetHTMLFiles(name) {

    var CId = $("#CountryId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Production/GetHTMLFiles",
        data: { FileName: name, Country: CId },
        success: function (data) {
            $("#HTMLContent").empty();
            $("#HTMLFileName").text('');
            $("#HTMLFileName").append($.parseHTML("<i>" + name + "</i>"));
            $("#HTMLContent").append($.parseHTML(data));

            $("#btnlookHTML").trigger("click");
        }
    })
}

function txtAddPhone(item) {

    $('#divNumber').removeClass('has-error');
    $('.errorN').hide();

    var ph = $(item).val();

    var len = ph.length;

    if (len == 3) {
        ph = ph + "-";

        $("#Number").val('');
        $("#Number").val(ph);
    }

}

function cancelAddPhone() {

    var pt = document.getElementById("PT0");

    $("#PhoneTypes").val($(pt).val());
    $("#Lada").val('');
    $("#Number").val('');
}

function SendTargets() {

    var tg = $("#TargetDescription").val();

    tg = replace(tg);

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../Targets/GetAddTargets",
        data: { TargetDescription: tg },
        success: function (data) {
            if (data == true) {
                setTimeout("document.location.reload()");
            }
            else if (data == false) {
                d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                d += "<p></p>"
                d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La Etiqueta ya Existe!!!</p>"
                apprise("" + d + "", { 'animate': true });
            }
        }
    })

}

function EditClientData() {

    $(".edtdc").hide();
    $(".shdc").show();

    sessionStorage.RSClient = $("#SPRSClient").text();
    sessionStorage.SNClient = $("#SPSNClient").text();

}

function saveEditClientData() {

    var rs = $("#RSClient").val();
    var sn = $("#SNClient").val();
    var cid = $("#ClientId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!rs.trim() == true) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Nombre de Cliente NO puede quedar vac&iacute;o</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/EditClientData",
            data: { Client: cid, RS: rs, SN: sn },
            success: function (data) {
                if (data == true) {
                    $("#SPRSClient").text(rs);
                    $("#SPSNClient").text(sn);

                    $(".edtdc").show();
                    $(".shdc").hide();
                }
            }
        })
    }

}

function CancelClientData() {

    $("#RSClient").val(sessionStorage.RSClient);
    $("#SNClient").val(sessionStorage.SNClient);

    $(".edtdc").show();
    $(".shdc").hide();
}


function GetManufacturers(item) {

    var tr = $(item).parents("tr:first");

    var PId = tr.find("#lblProductid").val();
    var CId = $("#CountryId").val();

    $("#inputProductIdMD").val(PId);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/GetManufacturersandDistributorts",
        data: { Product: PId, Country: CId },
        success: function (data) {

            $("#lblManufacturer").text(data.Manufacturer);
            $("#lblDistributor").text(data.Distributor);

            $("#txtManufacturerId").val(data.ManufacturerId);
            $("#txtDistributorId").val(data.DistributorId);

            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/getManufactures",
                data: { Country: CId },
                success: function (data) {
                    $("#EditManufactures").empty();
                    $('#EditManufactures')
                       .append($("<option></option>")
                       .attr("value", 0)
                       .text("Seleccione..."));
                    $.each(data, function (index, val) {
                        $('#EditManufactures')
                        .append($("<option></option>")
                        .attr("value", val.ManufacturerId)
                        .text(val.Manufacturer));
                    });
                }
            })

            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../SalesModule/getDistributors",
                data: { Country: CId },
                success: function (data) {
                    $("#EditDistributors").empty();
                    $('#EditDistributors')
                       .append($("<option></option>")
                       .attr("value", 0)
                       .text("Seleccione..."));
                    $.each(data, function (index, val) {
                        $('#EditDistributors')
                        .append($("<option></option>")
                        .attr("value", val.DistributorId)
                        .text(val.Distributor));
                    });
                }
            })
        }
    })

    $("#BtnManufacturers").trigger("click");

}

function CancelEditManufacturer() {
    $("#BtnEditManufacturers").hide();
    $("#trEditManufacturer").hide();
    $("#trEditDistributor").hide();
}

function SaveEditManufacturers() {

    $("#bloqueo").show();

    var mnf = $("#EditManufactures").val();
    var dst = $("#EditDistributors").val();
    var PId = $("#inputProductIdMD").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/SaveManufacturers",
        data: { Product: PId, Manufacturer: mnf, Distributor: dst },
        success: function (data) {
            setTimeout("document.location.reload()");
        }
    })


}

function DeleteManufacturer(item) {

    var PId = $("#inputProductIdMD").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/DeleteManufacturer",
        data: { Product: PId },
        success: function (data) {
            $("#txtManufacturerId").val('');
            $("#lblManufacturer").text('');
            $(item).hide();
        }
    })

}

function DeleteDistributor(item) {

    var PId = $("#inputProductIdMD").val();
    var DId = $("#txtDistributorId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/DeleteDistributor",
        data: { Product: PId, Distributor: DId },
        success: function (data) {
            $("#txtDistributorId").val('');
            $("#lblDistributor").text('');
            $(item).hide();
        }
    })

}


function GetClinicalAnalysisClients(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/Index?Letter=' + Letter + ''

}

function GetClinicalAnalysisClientsProd(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/IndexProd?Letter=' + Letter + ''

}

function GetClinicalAnalysisClientsLI(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/IndexLI?Letter=' + Letter + ''

}

function checkparticipantClientCA(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientId").val();
    var EId = $("#EditionId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/ParticipantCA",
            data: { Client: CId, Edition: EId, Operation: "Insert" },
            success: function (data) {

            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/ParticipantCA",
            data: { Client: CId, Edition: EId, Operation: "Delete" },
            success: function (data) {

            }
        })
    }
}


function checkparticipantClientCH(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientId").val();
    var EId = $("#EditionId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/ParticipantCH",
            data: { Client: CId, Edition: EId, Operation: "Insert" },
            success: function (data) {

            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/ParticipantCH",
            data: { Client: CId, Edition: EId, Operation: "Delete" },
            success: function (data) {

            }
        })
    }
}

function activefieldstoeditCCA(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCA").hide();
    tr.find(".edit-userCA").show();

    sessionStorage.CCACN = tr.find("#lblCompanyName").text();
    sessionStorage.CCASN = tr.find("#lblShortName").text();

}

function cancelfieldstoeditCCA(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".edit-userCA").hide();
    tr.find(".display-modeCA").show();

    tr.find("#txtCompanyName").val(sessionStorage.CCACN);
    tr.find("#txtShortName").val(sessionStorage.CCASN);
}

function saveClientCCA(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientId").val();
    var CN = tr.find("#txtCompanyName").val();
    var SN = tr.find("#txtShortName").val();

    if (!CN.trim() == true) {
        alert("empty");
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/EditClients",
            data: { Client: CId, CompanyName: CN, ShortName: SN },
            success: function (data) {
                if (data == true) {

                    tr.find("#lblCompanyName").text(CN.trim());
                    tr.find("#lblShortName").text(SN.trim());

                    tr.find(".edit-userCA").hide();
                    tr.find(".display-modeCA").show();
                }
            }
        })
    }
}

function ActiveFieldstoEditAddressCCA(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".display-modeA").hide();
    tr.find(".edit-modeA").show();

    var lblAddressCCA = tr.find("#lblAddress").text();
    sessionStorage.lblAddressCCA = lblAddressCCA;

    var lblSuburbCCA = tr.find("#lblSuburb").text();
    sessionStorage.lblSuburbCCA = lblSuburbCCA;

    var lblCityCCA = tr.find("#lblCity").text();
    sessionStorage.lblCityCCA = lblCityCCA;

    var lblStateCCA = tr.find("#lblState").text();
    sessionStorage.lblStateCCA = lblStateCCA;

    var lblZipCodeCCA = tr.find("#lblZipCode").text();
    sessionStorage.lblZipCodeCCA = lblZipCodeCCA;

    var lblEmailCCA = tr.find("#lblEmail").text();
    sessionStorage.lblEmailCCA = lblEmailCCA;

    var lblWebCCA = tr.find("#lblWeb").text();
    sessionStorage.lblWebCCA = lblWebCCA;

    var LocationCCA = tr.find("#lblLocation").text();
    sessionStorage.lblLocationCCA = LocationCCA;

    var LatitudCCA = tr.find("#lblLatitud").text();
    sessionStorage.lblLatitud = LatitudCCA;

    var LongitudCCA = tr.find("#lblLongitud").text();
    sessionStorage.lblLongitud = LongitudCCA;
}

function CancelEditAddressCCA(item) {
    var tr = $(item).parents("tr:first");

    tr.find(".edit-modeA").hide();
    tr.find(".display-modeA").show();

    tr.find("#txtAddress").val(sessionStorage.lblAddressCCA);
    tr.find("#txtSuburb").val(sessionStorage.lblSuburbCCA);
    tr.find("#txtCity").val(sessionStorage.lblCityCCA);
    tr.find("#txtState").val(sessionStorage.lblSuburbCCA);
    tr.find("#txtZipCode").val(sessionStorage.lblZipCodeCCA);
    tr.find("#txtEmail").val(sessionStorage.lblEmailCCA);
    tr.find("#txtWeb").val(sessionStorage.lblWebCCA);
    tr.find("#txtLocation").val(sessionStorage.lblLocationCCA);
    tr.find("#txtLatitud").val(sessionStorage.lblLatitud);
    tr.find("#txtLongitud").val(sessionStorage.lblLongitud);
}

function SaveChangedAddressCCA(item) {

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressId").val();
    var Addr = tr.find("#txtAddress").val();
    var Sub = tr.find("#txtSuburb").val();
    var Cty = tr.find("#txtCity").val();
    var ST = tr.find("#txtState").val();
    var CP = tr.find("#txtZipCode").val();
    var ml = tr.find("#txtEmail").val();
    var WB = tr.find("#txtWeb").val();
    var lc = tr.find("#txtLocation").val();
    var StId = tr.find("#SelectStateId").val();
    var lt = tr.find("#txtLatitud").val();
    var lg = tr.find("#txtLongitud").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((!lt.trim() == true) && (!lg.trim() == true) && (!lc.trim() == true) && (!Addr.trim() == true) && (!Cty.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!ml.trim() == true) && (!WB.trim() == true)) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/SaveChangedAddress",
            data: {
                AddressIdd: AddrId,
                Address: Addr,
                Suburb: Sub,
                City: Cty,
                State: ST,
                ZipCode: CP,
                Mail: ml,
                Web: WB,
                Location: lc,
                StateI: StId,
                Latitud: lt,
                Longitud: lg
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function AddAddressCCA() {

    var STId = $("#SelectStateIdfrm").val();
    var CTy = $("#City").val();
    var Sub = $("#Suburb").val();
    var CP = $("#ZipCode").val();
    var ST = $("#Street").val();
    var mail = $("#Email").val();
    var wb = $("#Web").val();
    var Lc = $("#Location").val();
    var CId = $("#CountryId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((STId == 0) && (STId == '0')) {
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Debe seleccionar Estado!!!</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        if ((!CTy.trim() == true) && (!Sub.trim() == true) && (!CP.trim() == true) && (!ST.trim() == true) && (!mail.trim() == true) && (!wb.trim() == true)) {
            d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
            d += "<p></p>"
            d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; Ningun Campo debe quedar Vacio!!!</p>"
            apprise("" + d + "", { 'animate': true });
        }
        else {
            if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../ClinicalAnalysis/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: BId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
            else {
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../ClinicalAnalysis/AddAddress",
                    data: {
                        Address: ST,
                        Suburb: Sub,
                        City: CTy,
                        StateI: STId,
                        ZipCode: CP,
                        Mail: mail,
                        Web: wb,
                        Country: CId,
                        Client: CLId,
                        Location: Lc
                    },
                    success: function (data) {
                        if (data == true) {
                            setTimeout("document.location.reload()");
                        }
                    }
                })
            }
        }
    }
}

function DeleteAddressesCCA(item) {

    var tr = $(item).parents("tr:first");

    var AddrId = tr.find("#lblAddressId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: BId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/DeleteAddresses",
            data: {
                Address: AddrId,
                Client: CLId
            },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == "_existPhone") {
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; La direcci&oacute;n no se puede eliminar. Tiene tel&eacute;fonos asociados.!!!</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }

}


/*                                                  TELÉFONOS                                                 */

function ActiveFieldsToEditPhoneCCA(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCP").hide();
    tr.find(".edit-modeCP").show();

    var lda = tr.find("#lblLada").text();
    var nmbr = tr.find("#lblNumber").text();

    sessionStorage.Lada = lda;
    sessionStorage.Number = nmbr;

}

function CancelEditPhoneCCA(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeCP").show();
    tr.find(".edit-modeCP").hide();

    tr.find("#txtLada").val(sessionStorage.Lada);
    tr.find("#txtNumber").val(sessionStorage.Number);
}

function SaveChangesEditPhoneCCA(item) {

    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneId").val();
    var lda = tr.find("#txtLada").val();
    var nmbr = tr.find("#txtNumber").val();

    var CLId = $("#ClientId").val();

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";

    if (!nmbr.trim() == true) {

        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic'>&bull; El Campo <b>N&uacute;mero</b> NO puede quedar Vacio!!!</p>"
        apprise("" + d + "", { 'animate': true });

    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/EditPhones",
            data: { ClientPhone: CPId, Lada: lda, Number: nmbr, Client: CLId },
            success: function (data) {
                if (data == true) {
                    tr.find(".display-modeCP").show();
                    tr.find(".edit-modeCP").hide();

                    tr.find("#lblLada").text(lda);
                    tr.find("#lblNumber").text(nmbr);

                }
            }
        })
    }
}

function AddPhonesCCA() {

    var pt = $("#PhoneTypes").val();
    var lda = $("#Lada").val();
    var nmbr = $("#Number").val();

    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    if ((pt != 0) && (!nmbr.trim() == false)) {
        if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../ClinicalAnalysis/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: BId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
        else {
            $.ajax({
                Type: "POST",
                dataType: "Json",
                url: "../ClinicalAnalysis/AddPhone",
                data: { Lada: lda, Number: nmbr, PhoneType: pt, Client: CLId },
                success: function (data) {
                    if (data == true) {
                        setTimeout("document.location.reload()");
                    }
                }
            })
        }
    }
    else {
        if (pt == 0) {
            $("#divPhoneTypes").addClass("has-error");
            $(".errorPT").show();
        }
        if (!nmbr.trim() == true) {
            $("#divNumber").addClass("has-error");
            $(".errorN").show();
        }
    }
}

function DeletePhonesCCA(item) {
    var tr = $(item).parents("tr:first");

    var CPId = tr.find("#lblClientPhoneId").val();
    var CLId = $("#ClientId").val();
    var BId = $("#BranchId").val();

    if ((BId != '') && (BId != 0) && (BId != null) && (BId != undefined)) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/DeletePhones",
            data: { ClientPhone: CPId, Client: BId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../ClinicalAnalysis/DeletePhones",
            data: { ClientPhone: CPId, Client: CLId },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
            }
        })
    }
}

function GetHospitalClients(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/Hospitals?Letter=' + Letter + ''

}

function GetHospitalClientsProd(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/HospitalsProd?Letter=' + Letter + ''

}

function GetHospitalClientsLI(item) {

    $("#bloqueo").show();

    var Letter = $(item).val();

    window.location.href = '../ClinicalAnalysis/HospitalsLI?Letter=' + Letter + ''

}

function getlevel4LI(value) {

    sessionStorage.HomogeneousCategoryIdLI = value;

    sessionStorage.ListItems = 1;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmexp).hide();
    $(elmclp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/Getfourlevel",
        data: { CategoryThree: value },
        success: function (data) {
            $(elmls).empty();
            $.each(data, function (index, val) {
                $(elmls).append($("<li></li>").append("<label style='font-weight:100;cursor:pointer' data-toggle=\"tooltip\" title=\"Doble click en el Nombre para Editar " + val.LeafCategory + "\" ondblclick=\"OpenEditLeafCategory($('" + val.LeafCategoryId + "'),$('" + val.LeafCategory + "'))\">" + val.LeafCategory + "</label>"));
            });
        }
    })
}

function collapselevel4LI(value) {

    sessionStorage.HomogeneousCategoryIdLI = null;

    var exp = "Expand_" + value;

    var elmexp = document.getElementById(exp);

    var clp = "Collapse_" + value;

    var elmclp = document.getElementById(clp);

    $(elmclp).hide();
    $(elmexp).show();

    var lstid = "ListL2_" + value;

    var elmls = document.getElementById(lstid);

    $(elmls).empty();

}

function GetDataAddCategory(HomogeneousCategoryId, item) {

    $("#TextCategoryName").text('');
    $("#TextCategoryId").val('');

    var HomogeneousCategory = $(item).val();

    $("#TextCategoryName").text(HomogeneousCategory);
    $("#TextCategoryId").val(HomogeneousCategoryId);

    $("#ModalAddCategory").fadeIn("slow");
    $('#ModalAddCategoryThree').hide();

}

function CancelAddCategory() {

    $("#ModalAddCategory").fadeOut("slow");

    $("#TextCategoryName").text('');
    $("#CategoryName").val('');
    $("#TextCategoryId").val('');

    $("#AlertSuccess").fadeOut("slow");
    $("#AlertError").fadeOut("slow");

    $("#divCategoryName").removeClass('has-error');
    $(".errorC").hide();
}

function SaveCategory() {

    var Category = $("#CategoryName").val();
    var Id = $("#TextCategoryId").val();

    if (!Category.trim() == true) {

        $("#divCategoryName").addClass('has-error');
        $(".errorC").show();

    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/AddCategory4Level",
            data: { CategoryName: Category, CategoryI: Id },
            success: function (data) {

                if (data == true) {

                    var exp = "#Expand_" + Id;

                    $(exp).trigger("click");

                    $("#CategoryName").val('');

                    $("#AlertSuccess").fadeIn("slow");
                }
                else if (data == "exists") {
                    $("#CategoryName").val('');

                    $("#AlertError").fadeIn("slow");
                }
            }
        })
    }
}

function removerequieredfieldCats() {

    $('#divCategoryName').removeClass('has-error');
    $('.errorC').hide();

    $("#AlertSuccess").fadeOut("slow");
    $("#AlertError").fadeOut("slow");
}

function OpenformAddCategoryLevel3() {

    $("#ModalAddCategory").hide();

    $("#TextCategoryName").text('');
    $("#CategoryName").val('');
    $("#TextCategoryId").val('');

    $("#AlertSuccess").fadeOut("slow");
    $("#AlertError").fadeOut("slow");


    $('#ModalAddCategoryThree').fadeIn("slow");

}

function removerequieredfieldCats3() {

    $('#divCategoryName3').removeClass('has-error');
    $('.errorC3').hide();

    $("#AlertSuccess3").fadeOut("slow");
    $("#AlertError3").fadeOut("slow");
}

function CancelAddCategory3() {

    $("#ModalAddCategoryThree").fadeOut("slow");

    $("#CategoryName3").val('');

    $("#AlertSuccess3").fadeOut("slow");
    $("#AlertError3").fadeOut("slow");

    $("#divCategoryName3").removeClass('has-error');
    $(".errorC3").hide();

}

function SaveCategory3() {

    var Category = $("#CategoryName3").val();

    if (!Category.trim() == true) {

        $("#divCategoryName3").addClass('has-error');
        $(".errorC3").show();

    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/AddCategory3Level",
            data: { CategoryName: Category },
            success: function (data) {

                if (data == true) {

                    setTimeout("document.location.reload()");

                }
                else if (data == "exists") {
                    $("#CategoryName3").val('');

                    $("#AlertError3").fadeIn("slow");
                }
            }
        })
    }
}

function checks() {

    if (sessionStorage.FilterClasificated == "Clasif") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    else if (sessionStorage.FilterClasificated == "Ok") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    else if (sessionStorage.FilterClasificated == "NotClasif") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    else if (sessionStorage.FilterClasificated == "NotOk") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    else if (sessionStorage.FilterClasificated == "CCS") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    else if (sessionStorage.FilterClasificated == "NotCCS") {

        var Id = "Id_" + sessionStorage.FilterClasificated;

        var elm = document.getElementById(Id);

        $("#Filters").val($(elm).val());

    }
    if (sessionStorage.RowsperPageLI != null) {

        var Id = "RP_" + sessionStorage.RowsperPageLI;

        var elm = document.getElementById(Id);

        $("#RowsPP").val($(elm).val());

    }
    else if (sessionStorage.RowsperPageLIH != null) {

        var Id = "Id_" + sessionStorage.RowsperPageLIH;

        console.log(Id);

        var elm = document.getElementById(Id);

        $("#SRowsperPageLIH").val($(elm).val());
    }
}

function FiltersLI(item) {

    var value = $(item).val();



    if (value == "Clasif") {

        sessionStorage.FilterClasificated = value;
    }
    else if (value == "Ok") {

        sessionStorage.FilterClasificated = value;
    }
    else if (value == "NotClasif") {

        sessionStorage.FilterClasificated = value;
    }
    else if (value == "NotOk") {

        sessionStorage.FilterClasificated = value;
    }
    else if (value == "CCS") {

        sessionStorage.FilterClasificated = value;
    }
    else if (value == "NotCCS") {

        sessionStorage.FilterClasificated = value;
    }
    else {

        sessionStorage.FilterClasificated = null;
    }

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetType",
        data: {
            Type: value
        },
        success: function (data) {
            setTimeout("document.location.reload()");
        }
    })
}

function RowsperPageLI(item) {

    var val = $(item).val();

    sessionStorage.RowsperPageLI = val;

    var ss = sessionStorage.FilterClasificated;

    if ((ss != undefined) && (ss != null) && (ss != "null")) {

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/GetQuantity",
            data: {
                Type: ss, Num: val
            },
            success: function (data) {
                setTimeout("document.location.reload()");
            }
        })
    }
    else {

        ss = "";

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/GetQuantity",
            data: {
                Type: ss, Num: val
            },
            success: function (data) {
                setTimeout("document.location.reload()");
            }
        })
    }
}

function addWork() {

    var val = $("#txtNotification").val();

    if (!val.trim() == true) {

        $('#AddWork').addClass('has-error');
        $('.errorW').show();
    }
    else {

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/AddWork",
            data: { Work: val },
            success: function (data) {
                if (data == false) {

                    $("#AlertErrorAW").fadeIn("slow");

                }
                else {
                    $("#listWorks").empty();
                    $.each(data, function (index, val) {
                        $("#listWorks").append($("<li style='margin-left:15px'>" +
                            "<div class='form-group'>" +
                                "<input type='checkbox' data-layout='fixed' value='" + val.WorkId + "' class='pull-right' onclick='disableWork($(this))'/>" +
                                "<label class='control-sidebar-subheading'><i>" + val.UserName + "</i>.</label>" +
                            "</div>" +
                        "</li>"));
                    });

                    var dt = $(data).size();

                    $("#txtNotification").val('');

                    $("#txtNotification").focus();

                    $("#smNotifications").text(dt);

                    $("#smNotifications").fadeIn("slow");
                }
            }
        })
    }
}

function GetWorks() {

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetWorks",
        success: function (data) {
            $("#listWorks").empty();
            $.each(data, function (index, val) {

                $("#listWorks").append($("<li style='margin-left:15px'>" +
                    "<div class='form-group'>" +
                        "<input type='checkbox' data-layout='fixed' value='" + val.WorkId + "' class='pull-right' onclick='disableWork($(this))'/>" +
                        "<label class='control-sidebar-subheading'>" + val.UserName + " </label>" +
                    "</div>" +
                "</li>"));
            });

            var dt = $(data).size();

            $("#smNotifications").text(dt);

            $("#smNotifications").fadeIn("slow");
        }
    })

}


function disableWork(item) {

    if ($(item).is(":checked")) {

        var WId = $(item).val();

        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-size:14px'>&bull; Al marcar la tarea, esta quedar&aacute; finalizada.</p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-size:14px;text-align:center'>&iquest;Desea continuar con la operaci&oacute;n?</p>"

        apprise("" + d + "", { 'verify': true }, function (r) {
            if (r) {
                /////////// user clicked 'Yes'
                $.ajax({
                    Type: "POST",
                    dataType: "Json",
                    url: "../LI/disableWork",
                    data: { Work: WId },
                    success: function (data) {
                        if (data == true) {
                            GetWorks();
                        }
                    }
                })
            }
            else {
                $(item).prop("checked", false);
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        alert("not checked");
    }

}

function getClientsByAddressByGeolocation(item) {

    $("#bloqueo").show();

    var value = $(item).val();

    window.location.href = '../ClinicalAnalysis/IndexLI?Type=' + value + ''
}

function getClientTypesByGeolocation(item) {

    $("#bloqueo").show();

    var value = $(item).val();

    window.location.href = '../IP/Geolocalization?Type=' + value + ''
}

function getHospitalsByAddressByGeolocation(item) {

    $("#bloqueo").show();

    var value = $(item).val();

    window.location.href = '../ClinicalAnalysis/HospitalsLI?Type=' + value + ''
}

function AddNews(ProductName, ProductId, CompanyName, ClientId) {
    //alert(ProductName);

    $("#lblCompanyNameAN").text(CompanyName);
    $("#txtClientIdAN").val(ClientId);

    $("#lblProductNameAN").text(ProductName);
    $("#txtProductIdAN").val(ProductId);

    $("#BtnAddNews").trigger("click");
}

function SaveNews() {

    var Cat = $("#AddCategoryNameAN").val();
    var PId = $("#txtProductIdAN").val();
    var CId = $("#txtClientIdAN").val();



    if (!Cat.trim() == true) {
        $('#divAddCategoryNameAN').addClass('has-error');
        $('.errorAN').show();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/AddWork",
            data: { Work: Cat, Product: PId, Client: CId },
            success: function (data) {
                if (data == false) {

                    $("#AlertErrorAW").fadeIn("slow");

                }
                else {
                    $("#listWorks").empty();
                    $.each(data, function (index, val) {
                        $("#listWorks").append($("<li style='margin-left:15px'>" +
                            "<div class='form-group'>" +
                                "<input type='checkbox' data-layout='fixed' value='" + val.WorkId + "' class='pull-right' onclick='disableWork($(this))'/>" +
                                "<label class='control-sidebar-subheading'>" + val.UserName + " </label>" +
                            "</div>" +
                        "</li>"));
                    });

                    set();

                    var dt = $(data).size();

                    $("#listWorkstoAdd").empty();

                    $("#AddCategoryNameAN").val('');

                    $("#AddCategoryNameAN").focus();

                    $("#smNotifications").text(dt);

                    // $("#CancelSaveNewsAN").trigger("click");
                }
            }
        })
    }

}

function GetCategoriestoAdd(WorkDescription, WorkDescriptionN3) {
    $("#AddCategoryNameAN").val("");
    $("#AddCategoryNameAN3").val("");

    if ((!WorkDescription.trim() == false) || (!WorkDescriptionN3.trim() == false)) {
        var Description = "Id_" + WorkDescription;

        $("#tableWorkstoAdd").append($("<tr class=\"AddNewCategoriesList\">" +
                                       "<td style='width:45%'>" +
                                       "<span id=\"WorkDescriptionN3\" style='font-size:12px'>" + WorkDescriptionN3.toUpperCase() + "</span>" +
                                       "</td>" +
                                       "<td style='width:45%'>" +
                                       "<span id=\"WorkDescription\" style='font-size:12px'>" + WorkDescription.toUpperCase() + "</span>" +
                                       "</td>" +
                                       "<td style='text-align:center; width:10%'>" +
                                       "<button onclick=\"RemoveItemofList($(this))\" class=\"btn btn-danger btn-sm\"><span class=\"glyphicon glyphicon-remove\"></span></button>" +
                                       "</td>" +
                                       "</tr>"));

    }
}

function RemoveItemofList(item) {

    //var Id = "#Id_" + $(WorkDescription).attr("Id");

    var tr = $(item).parents("tr:first");

    //$(WorkDescription).remove();

    $(tr).remove();
}

function CancelAddNews() {
    $('#divAddCategoryNameAN').removeClass('has-error');
    $('.errorAN').hide();

    $("#AddCategoryNameAN").val('');

    $("#listWorkstoAdd").empty();

    $("#tableWorkstoAdd").empty();
}

function SeeNews(ProductName, ProductId, CompanyName, ClientId) {

    CancelSeeNews();

    $("#lblCompanyNameSN").text(CompanyName);

    $("#lblProductNameSN").text(ProductName);

    $("#ADNewsProductId").val(ProductId);

    $("#ADNewsClientId").val(ClientId);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetCategoryByProductByClient",
        data: { Product: ProductId, Client: ClientId },
        success: function (data) {

            $("#SeeCategoryNameSN").append(data);
        }
    })

    $("#BtnSeeNews").trigger("click");

}

function CancelSeeNews() {

    $("#SeeCategoryNameSN").empty();

    $("#lblCompanyNameSN").text('');

    $("#lblProductNameSN").text('');

    $('#TableDetails').fadeOut("slow");

    $('#AlertSuccessAC').fadeOut('slow');
}

function set() {
    $(".notifications").addClass("tests");
    $(".SpanNotification").css("color", "white");
}

function unset() {
    $(".notifications").removeClass("tests");
    $(".SpanNotification").css("color", "#b8c7ce");
}

function AddComentToAddCategory(item) {



    var tr = $(item).parents("tr:first");

    var WorkDescription = tr.find("#lblWorkDescription").text();
    var WorkDescriptionLevelThree = tr.find("#lblWorkDescriptionLevelThree").text();

    console.log(WorkDescriptionLevelThree);

    var Id = $(item).attr("Id");

    $('#AlertSuccessAC').fadeOut('slow');

    $("#AddDetailToAddCategory").val('');
    $("#WorkIdAD").val(Id);

    $('#TableDetails').fadeIn("slow");

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetDetailsByWork",
        data: { Work: Id },
        success: function (data) {
            if (data == false) {
                var place = $("#AddDetailToAddCategory");

                if (!WorkDescription.trim() == false) {

                    var msg = $.parseHTML("Agregar detalle de Categor&iacute;a: " + WorkDescription + ".");

                    var message = msg[0].textContent;

                    $(place).attr("placeholder", "" + message + "");

                }
                else if (!WorkDescriptionLevelThree.trim() == false) {

                    var msg = $.parseHTML("Agregar detalle de Categor&iacute;a: " + WorkDescriptionLevelThree + ".");

                    var message = msg[0].textContent;

                    $(place).attr("placeholder", "" + message + "");
                }
            }
            else {
                $("#AddDetailToAddCategory").val(data);
            }
        }
    })


}

function CancelAddCategoryWork() {

    $("#AddDetailToAddCategory").val('');
    $("#WorkIdAD").val('');

    $('#TableDetails').fadeOut("slow");

    $('#AlertSuccessAC').fadeOut('slow');
}

function SaveCategoryWork() {

    var WorkDescription = $("#AddDetailToAddCategory").val();
    var WorkId = $("#WorkIdAD").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/SaveDetails",
        data: { Work: WorkId, Details: WorkDescription },
        success: function (data) {
            if (data == true) {
                $('#TableDetails').fadeOut("slow");
            }
        }
    })

}

function openComentToAddCategory(WorkId) {

    var d = "";
    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
    d += "<p></p>"
    d += "<p style='width:300px;text-align:justify;color:#05606d;font-size:14px'>La Categor&iacute;a solicitada no ha sido agregada, debido a la siguiente observaci&oacute;n:</p>"

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetDetailsByWork",
        data: { Work: WorkId },
        success: function (data) {

            d += "<p style='width:300px;text-align:justify;color:#003870;font-size:14px;text-align:center'>&bull; " + data + "</p>"

            apprise("" + d + "", { 'animate': true });
        }
    })
}

function SeeNewsSM(ProductName, ProductId, CompanyName, ClientId) {

    CancelSeeNews();

    $("#lblCompanyNameSN").text(CompanyName);

    $("#lblProductNameSN").text(ProductName);


    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/GetCategoryByProductByClientSM",
        data: { Product: ProductId, Client: ClientId },
        success: function (data) {
            $("#SeeCategoryNameSN").append(data);
        }
    })

    $("#BtnSeeNews").trigger("click");

}

function CloseWorkLI(item) {

    var WId = $(item).val();

    var ProductId = $("#ADNewsProductId").val();

    var ClientId = $("#ADNewsClientId").val();

    var tr = $(item).parents("tr:first");

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/disableWork",
        data: { Work: WId, Product: ProductId, Client: ClientId },
        success: function (data) {
            if (data == true) {
                GetWorks();
                tr.find("#DisableWorkLI").removeClass("btn-success");
                tr.find("#DisableWorkLI").empty();
                tr.find("#DisableWorkLI").append("<span class=\"glyphicon glyphicon-remove\"></span>");
                tr.find("#DisableWorkLI").addClass("btn-warning");
            }
            else if (data == false) {
                setTimeout("document.location.reload()");
            }
        }
    })
}

function SaveNewsList(size, CId, PId) {

    var list = [];

    for (var i = 0; i <= size - 1; i++) {
        if ((i != 0) || (i != undefined)) {
            var item = $(".AddNewCategoriesList")[i];

            var three = $(item).find("#WorkDescriptionN3").text();
            var four = $(item).find("#WorkDescription").text();

            list.push(
                {
                    "Category4": four,
                    "Category3": three,
                });

        }
    }

    var jsonresponse = JSON.stringify(list);

    console.log(jsonresponse);

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../LI/SaveNews",
        data: { ListItems: jsonresponse, Size: size, Client: CId, Product: PId },
        success: function (data) {

            if (data.Result == false) {

                $("#MessageExistsCategory").html("&nbsp; La Categor&iacute;a <i>" + data.Category + "</i> ya existe.");

                $("#AlertErrorAW").fadeIn("slow");

                $("#listWorkstoAdd").empty();
            }
            else if (data.Result == true) {
                $("#listWorks").empty();
                $.each(data.List, function (index, val) {
                    $("#listWorks").append($("<li style='margin-left:15px'>" +
                        "<div class='form-group'>" +
                            "<input type='checkbox' data-layout='fixed' value='" + val.WorkId + "' class='pull-right' onclick='disableWork($(this))'/>" +
                            "<label class='control-sidebar-subheading'><i>" + val.UserName + "</i>.</label>" +
                        "</div>" +
                    "</li>"));
                });

                set();

                var dt = $(data.List).size();

                $("#txtNotification").val('');

                $("#txtNotification").focus();

                $("#smNotifications").text(dt);

                $("#smNotifications").fadeIn("slow");

                $("#listWorkstoAdd").empty();

                $("#CancelSaveNewsAN").trigger("click");
            }
        }
    })
}

function SaveNewsNew() {

    var PId = $("#txtProductIdAN").val();
    var CId = $("#txtClientIdAN").val();
    var size = $(".AddNewCategoriesList").size();

    var Category = $("#AddCategoryNameAN").val();
    var CategoryThree = $("#AddCategoryNameAN3").val();


    if ((size != 0) || (size != "0")) {
        SaveNewsList(size, CId, PId);
    }
    else if ((size == 0) && ((!Category.trim() == false) || (!CategoryThree.trim() == false))) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../LI/SaveNewsNew",
            data: { Work: Category, WorkN3: CategoryThree, Product: PId, Client: CId },
            success: function (data) {

                if (data.Result == false) {

                    $("#MessageExistsCategory").html("&nbsp; La Categor&iacute;a <i>" + data.Category + "</i> ya existe.");

                    $("#AlertErrorAW").fadeIn("slow");

                    $("#listWorkstoAdd").empty();
                }
                else if (data.Result == true) {
                    $("#listWorks").empty();
                    $.each(data.List, function (index, val) {
                        $("#listWorks").append($("<li style='margin-left:15px'>" +
                            "<div class='form-group'>" +
                                "<input type='checkbox' data-layout='fixed' value='" + val.WorkId + "' class='pull-right' onclick='disableWork($(this))'/>" +
                                "<label class='control-sidebar-subheading'><i>" + val.UserName + "</i>.</label>" +
                            "</div>" +
                        "</li>"));
                    });

                    set();

                    var dt = $(data.List).size();

                    $("#txtNotification").val('');

                    $("#txtNotification").focus();

                    $("#AddCategoryNameAN").val('');

                    $("#AddCategoryNameAN").focus();

                    $("#smNotifications").text(dt);

                    $("#smNotifications").fadeIn("slow");

                    $("#listWorkstoAdd").empty();

                    $("#AddCategoryNameAN3").val('');

                    $("#CancelSaveNewsAN").trigger("click");
                }
            }
        })
    }
    else {
        $("#AddCategoryNameAN").val('');

        $("#AddCategoryNameAN").focus();
    }

}

function GetUser(item, Text) {

    var Value = $(item).val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../GetReports/GetUser",
        data: { User: Value, NickName: "" },
        success: function (data) {

        }
    })

}

function ActiveEditICSM(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".EditICSM").show();
    tr.find(".ShowICSM").hide();

}

function CancelEditICSM(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".ShowICSM").show();
    tr.find(".EditICSM").hide();

}

function SaveEditICSM(item) {

    var tr = $(item).parents("tr:first");

    var CName = tr.find("#txtCompanyNameIC").val();
    var SName = tr.find("#txtShortNameIC").val();
    var ClientId = tr.find("#lblClientId").val();

    if (!CName.trim() == true) {
        alert("error");
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../SalesModule/EditBranch",
            data: { Client: ClientId, CompanyName: CName, ShortName: SName },
            success: function (data) {
                if (data == true) {

                    tr.find("#lblCompanyNameIC").text(CName);
                    tr.find("#lblShortNameIC").text(SName);

                    tr.find(".ShowICSM").show();
                    tr.find(".EditICSM").hide();

                }
            }
        })
    }
}

function checkparticipantClientIP(item) {

    var tr = $(item).parents("tr:first");

    var CId = tr.find("#lblClientId").val();
    var EId = $("#EditionId").val();

    if ($(item).is(":checked")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/Participant",
            data: { Client: CId, Edition: EId, Operation: "Insert" },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", false);
                }
            }
        })
    }
    else if ($(item).is(":not(:checked)")) {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/Participant",
            data: { Client: CId, Edition: EId, Operation: "Delete" },
            success: function (data) {
                if (data == false) {
                    $(item).prop("checked", true);
                }
            }
        })
    }
}

function RowsperPageLIH(item) {

    var val = $(item).val();

    sessionStorage.RowsperPageLIH = val;

    var ss = sessionStorage.FilterClasificated;

    if ((ss != undefined) && (ss != null) && (ss != "null")) {

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/GetQuantityHospitals",
            data: {
                Type: ss, Num: val
            },
            success: function (data) {
                setTimeout("document.location.reload()");
            }
        })
    }
    else {

        ss = "";

        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../IP/GetQuantityHospitals",
            data: {
                Type: ss, Num: val
            },
            success: function (data) {
                setTimeout("document.location.reload()");
            }
        })
    }
}

function rps(item) {

    var txt = $(item).val();

    var stxt = txt.replace("C:", "").replace("\\", "").replace("fakepath", "").replace("\\", "");

    $("#txtFileName").val(stxt);

}


function SaveAddPDF(item) {

    $("#bloqueo").show();

    var tr = $(item).parents("tr:first");

    var txt = $("#txtFileName").val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();
    var PAOrder = $("#OrderOfAdvert").val();
    var Desc = $("#txtDescriptionProductAdvert").val();
    var CTId = $("#ClientTypeId").val();
    var CNTId = $("#CountryId").val();

    if (!txt.trim() == true) {
        var message = "Debe seleccionar una archivo...";
        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });
        $("#bloqueo").hide();
    }
    else {

        if (!PAOrder.trim() == true) {
            $('#SelectOrder').addClass('has-error');
            $('.errorO').show();
            $("#OrderOfAdvert").focus();
            $("#bloqueo").hide();
        }
        else {
            $("#SendPDFFile").ajaxSubmit({
                type: "POST",
                url: "../SalesModule/AddPDFFile",
                data: { Client: CId, Edition: EId, Order: PAOrder, Description: Desc, ClientType: CTId, Country: CNTId },
                success: function (data) {
                    if (data == true) {
                        setTimeout('document.location.reload()');
                    }
                    else
                    {
                        $("#bloqueo").hide();
                    }
                }
            })
        }
    }
}


function ActFldsEditCat(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeECT").hide();
    tr.find(".edit-modeECT").show();

    sessionStorage.CTName = tr.find("#lblCategoryThree").text();

}

function DisFldsEditCat(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeECT").show();
    tr.find(".edit-modeECT").hide();

    tr.find("#txtCategoryThree").val(sessionStorage.CTName);
}


function SaveFldsEditCat(item) {

    var tr = $(item).parents("tr:first");

    tr.find(".display-modeECT").hide();
    tr.find(".edit-modeECT").show();

    var CTId = tr.find("#lblCategoryThreeId").val();
    var CTName = tr.find("#txtCategoryThree").val();

    if (!CTName.trim() == true) {
        var message = "El campo Nombre de Categor&iacute;a no puede quedar vac&iacute;o";
        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditCategoryName",
            data: { Category: CTId, CategoryName: CTName, TableName: 'CategoryThree' },
            success: function (data) {
                if (data == true) {
                    tr.find("#lblCategoryThree").text(CTName);
                    tr.find(".display-modeECT").show();
                    tr.find(".edit-modeECT").hide();
                }
                else if (data == false) {
                    var message = "Ya existe una Categor&iacute;a con el mismo nombre.";
                    var d = "";
                    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });
                }
            }
        })
    }
}


function OpenEditCategory(ValId, ValName) {

    $("#inputCategoryThreeId").val(ValId.selector);
    $("#InputCategoryThree").val(ValName.selector);

    $('#BtnEditCategory').trigger('click');
}

function EditCategoriesLI() {

    $("#bloqueo").show();

    var CTId = $("#inputCategoryThreeId").val();
    var CTName = $("#InputCategoryThree").val();

    if (!CTName.trim() == true) {
        var message = "El campo Nombre de Categor&iacute;a no puede quedar vac&iacute;o";
        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditCategoryName",
            data: { Category: CTId, CategoryName: CTName, TableName: 'CategoryThree' },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == false) {
                    var message = "Ya existe una Categor&iacute;a con el mismo nombre.";
                    var d = "";
                    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }
}

function OpenEditLeafCategory(ValId, ValName) {

    $("#inputLeafCategoryId").val(ValId.selector);
    $("#InputLeafCategory").val(ValName.selector);

    $('#BtnEditLeafCategory').trigger('click');
}

function EditLeafCategoriesLI() {

    $("#bloqueo").show();

    var CTId = $("#inputLeafCategoryId").val();
    var CTName = $("#InputLeafCategory").val();

    if (!CTName.trim() == true) {
        var message = "El campo Nombre de Categor&iacute;a no puede quedar vac&iacute;o";
        var d = "";
        d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
        d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
        d += "<p></p>"
        d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
        apprise("" + d + "", { 'animate': true });

        $("#bloqueo").hide();
    }
    else {
        $.ajax({
            Type: "POST",
            dataType: "Json",
            url: "../Production/EditCategoryName",
            data: { Category: CTId, CategoryName: CTName, TableName: 'LeafCategories' },
            success: function (data) {
                if (data == true) {
                    setTimeout("document.location.reload()");
                }
                else if (data == false) {
                    var message = "Ya existe una Categor&iacute;a con el mismo nombre.";
                    var d = "";
                    d += "<div align='center'><img src='../Images/alerta.png' /> </div>";
                    d += "<label style='width:300px;text-align:center;color:#05606d;font-style:italic;font-size:20px'>Error!!!</label>"
                    d += "<p></p>"
                    d += "<p style='width:300px;text-align:justify;color:#05606d;font-style:italic;font-size:14px'>&bull;" + message + "</p>"
                    apprise("" + d + "", { 'animate': true });

                    $("#bloqueo").hide();
                }
            }
        })
    }
}

function AddClientImage() {

    var CLId = $("#ClientId").val();
    var CId = $("#CountryId").val();

    $("#AddClientImageForm").ajaxSubmit({
        type: "POST",
        url: "../Production/AddClientImage",
        data: { Country: CId, Client: CLId },
        success: function (data) {
            if (data == true) {
                setTimeout('document.location.reload()');
            }
        }
    })
}


function DeleteProductAdverts(item) {

    $("#bloqueo").show();

    var Id = $(item).val();
    var CId = $("#ClientId").val();
    var EId = $("#EditionId").val();

    $.ajax({
        Type: "POST",
        dataType: "Json",
        url: "../SalesModule/DeleteProductAdverts",
        data: { ProductAdvert: Id, Client: CId, Edition: EId },
        success: function (data) {
            setTimeout("document.location.reload()");
        }
    })
}