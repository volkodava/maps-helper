var address = 'проспект Мазепы 3, Вышгород, Киевская область, Украина';

function initGoogleMaps() {
    google.maps.visualRefresh = true;
    var map;

    function initialize() {
        var geocoder = new google.maps.Geocoder();
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        if (geocoder) {
            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow({
                            content: address,
                            map: map,
                            position: results[0].geometry.location
                        });

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: address
                        });
                    } else {
                        alert("No results found");
                    }
                }
            });
        }
    }

    google.maps.event.addDomListener(window, 'load', initialize);
}

function initValidator() {
    $('#contactForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'The username can only consist of alphabetical, number, dot and underscore'
                    }
                }
            },
            address: {
                message: 'The address is not valid',
                validators: {
                    notEmpty: {
                        message: 'The address is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The address must be more than 6 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_/,-\.]+$/,
                        message: 'The address can only consist of alphabetical, number, dot, comma, slash, hyphen and underscore'
                    }
                }
            },
            message: {
                message: 'The message is not valid',
                validators: {
                    notEmpty: {
                        message: 'The message is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The message must be more than 6 characters long'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    digits: {
                        message: 'The value can contain only digits'
                    }
                }
            }
        }
    });
}

function initSlidingPanel() {
    $('[data-toggle=offcanvas]').click(function () {
        var isActive = $('.row-offcanvas').hasClass('active');
        $('.row-offcanvas').toggleClass('active');

        var width = $('#map-canvas').width();
        var offsetTop = 350;

        var finalWidth;
        if (isActive) {
            finalWidth = width + offsetTop;
        } else {
            finalWidth = width - offsetTop;
        }
        $('#map-canvas').css('width', finalWidth);
        console.log("[before] width: " + width);
        console.log("[after] width: " + finalWidth);
    });
}

$(document).ready(function () {
    initGoogleMaps();

    $(window).resize(function () {
        var height = $(window).height();
        var offsetTop = 100;

        $('#map-canvas').css('height', (height - offsetTop));
    }).resize();

    initValidator();
    initSlidingPanel();
    $('.multiselect').multiselect();
});
