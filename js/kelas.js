function getClassId(id){
    $.ajax({
        url: "http://127.0.0.1:5000/kelas/"+id,
        method: "GET",
        success: function(response){
            var classHead=`${response.kelasname}`
                $('.head').append(classHead);
            // for (var i=0;i<response.data.student.length;i++){
            //     var classStudent=`${response.data.student[i]}, `
            //     $('.student').append(classStudent);
            // }
            var classTeacher=`${response.teachername}`
                $('.teacher').append(classTeacher);
            
            var statusTch = getCookie("status");
            for (var i=0;i<response.data.length;i++){
                var classClasswork=`
                <div class="classwork">
                    <p class="classworkid">Classwork id : ${response.data[i].kelaswork_id}</p>
                    <p class="questions">Question : ${response.data[i].question}</p>
                    <p class="key${response.data[i].kelaswork_id}"></p>
                    <button style="display : none" class="tampil3" onclick="delclasswork(${response.data[i].kelaswork_id})">Delete Classwork</button>
                    <button style="display : none" class="tampil3" onclick="updateclasswork(${response.data[i].kelaswork_id})">Update Classwork</button>
                    <div style="display : none" class="assignClasswork">
                        <span style="color:green" class="scrT${response.data[i].kelaswork_id}"></span><br>
                        <span style="color:red" class="scrF${response.data[i].kelaswork_id}"></span><br>
                        <textarea id="${response.data[i].kelaswork_id}"></textarea><br>
                        <button onclick="assign(${response.data[i].kelaswork_id},'${response.data[i].teacheranswer}')">Submit</button>
                    </div>
                </div>
                `
                if (statusTch=='teacher'){
                    answer(response.data[i].kelaswork_id)         
                }
                answerStudentbyId(response.data[i].kelaswork_id)
                $('.content').append(classClasswork);
            }
            
            if (statusTch=='teacher'){
                jawaban_open()     
            }
            // if (statusTch=='student'){
            //     studentScore(id)     
            // }


            },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function tolist(){
    var statusku = getCookie("status");
   
    if(statusku=='student'){
        $(".userList1").slideToggle();
        $(".content").slideToggle();
    }else{
        $(".userList1").slideToggle();
        $(".userList").slideToggle();
        $(".content").slideToggle();
    }
}

function listStudent(idKelas){
    $.ajax({
        url: "http://127.0.0.1:5000/student/"+idKelas,
        method: "GET",
        success: function(response){
            for (var i=0;i<response.student.length;i++){
                var userku =`
                <div class="hasil">${response.student[i].username} : ${response.student[i].fullname}</div>
                `
                $('.userList1').append(userku);
            }
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function sumScore(idkelas){
    $.ajax({
        url: "http://127.0.0.1:5000/sumByClass/"+idkelas,
        method: "GET",
        success: function(response){
            var statusku = getCookie("status");
            for (var i=0;i<response.data.length;i++){
                var userku =`
                <div class="hasil">username : ${response.data[i].username}</div>
                `
                var userScore =`
                <div class="hasil1">Total Score : ${response.data[i].sum_}</div>
                `
                $('.userList').append(userku);
                if (statusku=='teacher'){
                    $('.userList').append(userScore);
                }
            }
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function studentScore(cid){
    var userId = getCookie("userid");
    $.ajax({
        url: "http://127.0.0.1:5000/answer/"+userId,
        method: "GET",
        success: function(response){
            var x = 0;
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].user_id==userId && response.data[i].kelas_id==cid){
                    x = x + parseInt(response.data[i].score);
                }
            }
            var scoreku = `<br><br><div class="score">My Score : ${x}</div>`;
            $('.head').append(scoreku);
            console.log(x)
            },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function getJoinClassId(id){
    $.ajax({
        url: "http://127.0.0.1:5000/joinKelas/"+id,
        method: "GET",
        success: function(response){
            var userId = getCookie("userid");
            var status = getCookie("status");
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].user_id==userId && status == 'student'){
                    $(".assignClasswork").slideToggle();
                    studentScore(id); 
                }
            }
            },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function assign(workclassid,teacherAnswer){
    var answers = $('textarea#'+workclassid).val();
    console.log(teacherAnswer)
    var id = getCookie("userid")

    if (answers == teacherAnswer){
        score = '10';
    }else{
        score = '0';
    };

    $.ajax({
        url:'http://127.0.0.1:5000/answerKS',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            'user_id': parseInt(id),
            'answer': answers,
            'kelaswork_id': parseInt(workclassid),
            'score': score
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href;
        },
        error:function(){
            alert("Error")
        }
    });
}

var classId=(window.location.search).slice(4,(window.location.search).length);
getClassId(classId);
getJoinClassId(classId);
sumScore(classId)
listStudent(classId)

function home(){
    window.location.href='../Templates/kelasroom.html';
}

function logout(){
    window.location.href='../index.html';
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

function jawaban_open() {
    document.getElementById("tampil").style.display = "block";
    document.getElementById("tampil2").style.display = "none";
    // $(".tampil3").slideToggle();
}

function addclasswork(){
    var answers = $('textarea#question').val();
    var answerTeacher = $('textarea#answerTeacher').val();
    $.ajax({
        url:'http://127.0.0.1:5000/createKelaswork',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            "question":answers,
            "kelas_id":parseInt(classId),
            "answer":answerTeacher
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}

function joinClass(){
    var userid = getCookie("userid")
    $.ajax({
        url:'http://127.0.0.1:5000/joinKS',
        method:'POST',

        contentType:'application/json',
        data:JSON.stringify({
            "kelas_id":parseInt(classId),
            "user_id":parseInt(userid)
        }),
        success:function(response){
            alert(response.message)
            window.location.href=window.location.href
        },
        error:function(){
            alert("Error")
        }
    });
}

function answer(workclassid){
    $.ajax({
        url: "http://127.0.0.1:5000/answerStudent/"+workclassid,
        method: "GET",
        success: function(response){
            for (var i=0;i<response.data.length;i++){
                var classAnswer=`
                <div class="answerDesain">
                    <p class="answerUserId">Nama : ${response.data[i].username}</p>
                    <p class="answerId">Answer : ${response.data[i].answer}</p>
                    <p class="answerUserId">Score : ${response.data[i].score}</p>
                </div>
                `
                $('.key'+workclassid).append(classAnswer);
            }    
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

function answerStudentbyId(wcId){
    $.ajax({
        url: "http://127.0.0.1:5000/answerStudent/"+wcId,
        method: "GET",
        success: function(response){
            var id = getCookie("userid")
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].user_id==id && response.data[i].score=='10'){
                    var classAnswer=`Correct`
                    $('.scrT'+wcId).append(classAnswer);
                }else if (response.data[i].user_id==id && response.data[i].score!='10'){
                    var classAnswer=`False`
                    $('.scrF'+wcId).append(classAnswer);
                }                
            }    
        },
        error:function(errornya){
            alert("Error");
            console.log(errornya.responseText)
        }
    })
}

// function delClass(){
//     $.ajax({
//         url:'http://127.0.0.1:5000/class/'+classId,
//         method:'DELETE',
//         success:function(response){
//             alert(response.message)
//             window.location.href='../Templates/kelasroom.html'
//         },
//         error:function(){
//             alert("Error")
//         }
//     });
// }

// function delclasswork(idclasswork){
//     $.ajax({
//         url:'http://127.0.0.1:5000/classwork/'+idclasswork,
//         method:'DELETE',
//         success:function(response){
//             alert(response.message)
//             window.location.href=window.location.href
//         },
//         error:function(){
//             alert("Error")
//         }
//     });
// }

// function updateclasswork(idclasswork){
//     var question = prompt("Please enter your new question:","how much salt in the sea?");
//     if (question == "" || question == null){
//         alert("question should not empty")
//     } else {
//         $.ajax({
//             url:'http://127.0.0.1:5000/classwork/'+idclasswork,
//             method:'PUT',
    
//             contentType:'application/json',
//             data:JSON.stringify({
//                 "question":question,
//             }),
//             success:function(response){
//                 alert(response.message);
//                 window.location.href=window.location.href;
//             },
//             error:function(){
//                 alert("update classworks failed")
//             }
//         });
//     }
// }

// function outClass(){
//     var userid = getCookie("userid")
//     $.ajax({
//         url:'http://127.0.0.1:5000/outclass',
//         method:'DELETE',

//         contentType:'application/json',
//         data:JSON.stringify({
//             "user id": parseInt(userid),
//             "classid": parseInt(classId)
//         }),
//         success:function(response){
//             alert(response.message)
//             window.location.href=window.location.href
//         },
//         error:function(){
//             alert("Error")
//         }
//     });
// }