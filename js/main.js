/* Api de google maps */

var api = "AIzaSyDs1AMt5WQaEE-OrSAyyb5C6jPu0fMiHjs";


 function initMap() {
    var latLng = {
        lat: 19.331637, 
        lng: -99.192039
    };

    var  map = new google.maps.Map(document.getElementById('mapa'), {
        'center': latLng,
        'zoom': 14,
        'mapTypeId': google.maps.MapTypeId.ROARMAP
    });

    var contenido = '<h2>GDLWEBCAMP</h2>' +
                    '<p>Del 10 al 12 de Diciembre</p>' +
                    '<p>Visitanos!</p>';  
 
    var informacion = new google.maps.InfoWindow({
        content: contenido
    });

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        tittle: 'gdlwebcamp'
    });

    marker.addListener('click', function(){
        informacion.open(map, marker);
    });
}

/* ---------------------------------------------------*/
    
// Modo debugger 
var pruebas = true;
var log = function(string){  
if(pruebas){  
    console.log(string);
    }  
};

//variables
path = window.location.pathname;

(function() {
    "use strict";




    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function (){

        //Campos datos de ususario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        //Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //Botones y divs
        var calcular = document.getElementById('calcular');
        var errordiv = document.getElementById('error');   
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //Extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');
        
        if(document.getElementById('calcular')){
        
            calcular.addEventListener('click',calcularMontos);
            
            pase_dia.addEventListener('blur', mostrarDias);
            pase_dosdias.addEventListener('blur', mostrarDias);
            pase_completo.addEventListener('blur', mostrarDias);

            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarMail);

            function validarCampos(){
                if(this.value == ''){
                    errordiv.style.display = "block";
                    errordiv.innerHTML = "Este campo es obligatorio";
                    this.style.border = '1px solid red';
                    errordiv.style.border = '1px solid red';
                }else{
                    errordiv.style.display = "none";
                    this.style.border = '1px solid #cccccc';
                }
            }

            function validarMail(){
                if(this.value.indexOf("@") > -1){
                    errordiv.style.display = "none";
                    this.style.border = '1px solid #cccccc';
                }else{
                    errordiv.style.display = "block";
                    errordiv.innerHTML = "Ingresa un email válido";
                    this.style.border = '1px solid red';
                    errordiv.style.border = '1px solid red';
                }
            }

            function calcularMontos(event){
                event.preventDefault();
                if(regalo.value === ''){
                    alert("Debes elegir un regalo");
                    regalo.focus();
                }else{
                    var boletosDia = parseInt(pase_dia.value, 10) || 0,
                        boletos2dias = parseInt(pase_dosdias.value, 10) || 0,
                        boletosCompleto = parseInt(pase_completo.value, 10) || 0,
                        cantEtiquetas = parseInt(etiquetas.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0;

                    var totalPagar = (boletosDia * 30) + (boletos2dias * 45) + (boletosCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);

                    var listadoProductos = [];

                    if(boletosDia >= 1){
                        listadoProductos.push(boletosDia + ' Pases por día');
                    }
                    if(boletos2dias >= 1){
                        listadoProductos.push(boletos2dias + ' Pases por 2 días');
                    }
                    if(boletosCompleto >= 1){
                        listadoProductos.push(boletosCompleto + ' Pases completos');
                    }
                    if(cantCamisas >= 1){
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }
                    if(cantEtiquetas >= 1){
                        listadoProductos.push(cantEtiquetas + ' Etiquetas');
                    }

                    log(listadoProductos);

                    lista_productos.style.display = "block";
                    lista_productos.innerHTML  = '';
                    for(var i = 0; i < listadoProductos.length; i++){
                        lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                    }

                    suma.innerHTML = '$ ' + totalPagar.toFixed(2); 

                }
            }


            function mostrarDias(){
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletosCompleto = parseInt(pase_completo.value, 10) || 0;

                    var diasElegidos = [];
                    if(boletosDia > 0){
                        diasElegidos.push('viernes');
                    }
                    if(boletos2dias > 0){
                        diasElegidos.push('viernes', 'sabado');
                    }
                    if(boletosCompleto > 0){
                        diasElegidos.push('viernes', 'sabado', 'domingo');
                    }
                    for(var i = 0; i < diasElegidos.length; i ++){
                        log(diasElegidos[i]);
                        document.getElementById(diasElegidos[i]).style.display = 'block';
                    }
            }
        }
    });
})();

$(document).ready(function(){

    //Lettering
    $('.nombre-sitio').lettering();

    //menú fijo
    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > windowHeight){
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraAltura + 'px'});
        }else{
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
    });

    //menu responsive
    $('.menu-movil').on('click', function(){
        $('.navegacion-principal').slideToggle();
    });

    $('.programa-evento .info-curso').hide();
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');


    $('.menu-programa a').on('click',function(e){
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        e.preventDefault();
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

    });

    // animaciones para los numeros
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);

    //cuenta regresiva
    $('.cuenta-regresiva').countdown('2017/08/08 09:00:00', function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });


    //agregando clases en conferencia
    if(path == "/conferencia.php"){
        $('body').addClass('conferencia');
        $('.navegacion-principal a[href="conferencia.php"]').addClass('activo');

    }

});