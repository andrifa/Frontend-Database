
function getClassAll(){
    $.ajax({
        url: "http://127.0.0.1:5000/getAllClass",
        method: "GET",
        success: function(response){
            for (var i=0;i<response.data.length;i++){
                var ClassAll=`
                <div>
                    <div>
                        <a href="kelas.html?id=${response.data[i].kelas_id}">${response.data[i].kelasname}</a>
                    </div>
                    <div>Kelasroom</div>
                </div>
                `
                $('.content').append(ClassAll);
            };
        },
        error:function(){
            alert("Error");
        }
    })
}

function getClassTeacher(id_){
    $.ajax({
        url: "http://127.0.0.1:5000/teacher/"+id_,
        method: "GET",
        success: function(response){
            for (var i=0;i<response.teacher.length;i++){
                var ClassTeacher=`
                <div>
                    <div>
                        <a href="kelas.html?id=${response.teacher[i].kelas_id}">${response.teacher[i].kelasname}</a>
                    </div>
                    <div>Kelasroom</div>
                </div>
                `
                $('.content').append(ClassTeacher);
            };
        },
        error:function(){
            alert("Error");
        }
    })
}


idstatus = getCookie("status")
idtch = getCookie("userid")
if (idstatus=="student"){
    getClassAll()
}else{
    getClassTeacher(idtch)
    document.getElementById("createClass").style.display = "block"; 
}

// function loginStudent(){
//     var username = $('input#username').val();
//     var password = $('input#password').val();
//     $.ajax({
//         url:'http://127.0.0.1:5000/loginStudent',
//         method:'POST',

//         contentType:'application/json',
//         data:JSON.stringify({
//             username:username,
//             password:password
//         }),
//         success:function(response){
//             alert(response.message);
//             var name="userid";
//             var name1="username";
//             var status="status";
//             var value=response.data.user_id;
//             var value1=response.data.username;
//             var statusValue="student";
//             var days=1;
//             createCookie(name,value,days)
//             createCookie(name1,value1,days)
//             createCookie(status,statusValue,days)
//             window.location.href='../Templates/kelasroom.html';
//         },
//         error:function(){
//             alert("Login Failed Username / Password is Wrong")
//         }
//     });
// }
// function loginTeacher(){
//     var username = $('input#username').val();
//     var password = $('input#password').val();
//     $.ajax({
//         url:'http://127.0.0.1:5000/loginTeacher',
//         method:'POST',

//         contentType:'application/json',
//         data:JSON.stringify({
//             username:username,
//             password:password
//         }),
//         success:function(response){
//             alert(response.message);
//             var name="userid";
//             var name1="username";
//             var status="status";
//             var value=response.data.user_id;
//             var value1=response.data.username;
//             var statusValue="teacher";
//             var days=1;
//             createCookie(name,value,days)
//             createCookie(name1,value1,days)
//             createCookie(status,statusValue,days)
//             window.location.href='../Templates/kelasroom.html';
//         },
//         error:function(){
//             alert("Login Failed Username / Password is Wrong")
//         }
//     });
// }

function home(){
    window.location.href='../Templates/kelasroom.html';
}

function logout(){
    window.location.href='../index.html';
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function createclass(){
    var className = prompt("Please enter your class name:","MakersV");
    if (className == "" || className == null){
        alert("class name should not empty")
    } else {
        $.ajax({
            url:'http://127.0.0.1:5000/createClass',
            method:'POST',
    
            contentType:'application/json',
            data:JSON.stringify({
                "kelasname":className,
	            "user_id":parseInt(idtch)
            }),
            success:function(response){
                alert(response.message);
                window.location.href='../Templates/kelasroom.html';
            },
            error:function(){
                alert("create class failed")
            }
        });
    }
}