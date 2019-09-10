function daftar(){
    var username = $('input#username').val();
    var fullname = $('input#fullname').val();
    var email = $('input#email').val();
    var password = $('input#password').val();
    $.ajax({
        url:'http://127.0.0.1:5000/regStudent',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            username : username,
            fullname : fullname,
            email : email,
            password : password
        }),
        success:function(response){
            alert(response.message)
            window.location.href='../index.html'
        },
        error:function(response){
            alert(response.responseJSON.message)
        }
    });
}

function daftarTch(){
    var username = $('input#username').val();
    var fullname = $('input#fullname').val();
    var email = $('input#email').val();
    var password = $('input#password').val();
    $.ajax({
        url:'http://127.0.0.1:5000/regTeacher',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            username : username,
            fullname : fullname,
            email : email,
            password : password
        }),
        success:function(response){
            alert(response.message)
            window.location.href='../index.html'
        },
        error:function(response){
            alert(response.responseJSON.message)
        }
    });
}