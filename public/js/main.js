const url = './';
let qrcode;

function topup(){
    $('.topup_from').collapse('hide');
    var amount = $('#topup_amount').val();
    var data ={
        'amount': amount,
    };
    $.ajax({
        type: 'POST',
        data: data,
        url:url + 'topup',
    })
        .done(function( json ) {
        })
        .fail(function( xhr, status, errorThrown ) {
        })
        .always(function( xhr, status ) {
            if(xhr.code == 'E016'){
                console.log(xhr);
            }else{
                console.log(xhr.data);
                $('#invoice').val(xhr.data.invoice);
                getQRcode(xhr.data.invoice);
            }
        });
}

function getQRcode(invoice){
    if(qrcode){
        qrcode.clear();
    }
    var options = {
        text: 'lightning:' + invoice,
        width: 158,
        height: 158,
        //logo: 'images/qr_asset.png',
        logoBackgroundTransparent: true,
        quietZone: 2,
        quietZoneColor: 'rgba(0,0,0,0)',
    };
    qrcode = new QRCode(document.getElementById('qr'), options);
    $('.make-payment').collapse('show');
    $('a[href^=\'lightning:\']').attr('href', 'lightning:'+ invoice);
}

function clickedCopyInvoice() {
    const target = $(this).data().target || '#invoice';
    $(target).select();
    document.execCommand('copy');
}