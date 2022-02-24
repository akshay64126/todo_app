var addtask;
var close_modal;
var save_task;
var id = 0;
var maindiv1;
var del_button;
var count_name = 0;
var count_desc = 0;
var string;
var current = localStorage.getItem("start") || true
console.log(current)

fetch("../data.json")
    .then(response => {
   return response.json();
    })
    .then(jsondata => 
        {
            if(current==true){
            for (var i = 0;i<jsondata.length;i++)
            localStorage.setItem(i,JSON.stringify(jsondata[i]))
            current = false;
            localStorage.setItem("start",current);}
                addtask = () => {
                    let modal = document.getElementById("myModal");
                    modal.style.display = "block";
                }
                close_modal = () => {
                    let modal = document.getElementById("myModal");
                    modal.style.display = "none";
                }
                var arr = [];
                maindiv1 = document.getElementById("abc")
                console.log(maindiv1)
                save_task = () => {
                    console.log(localStorage)
                    var name = document.getElementById("task_name").value;
                    var description = document.getElementById("desc").value;
                    for(var i = 0;i<name.length;i++){
                        if(name[i]!=' ')
                        count_name ++;
                    }
                    for(var i = 0;i<description.length;i++){
                        if(description[i]!=' ')
                        count_desc ++;
                    }
                    if (name === '' || description === ''||count_name==0 || count_desc==0) {
                        alert("The fields cant be empty");
                    } else {
                        var len = localStorage.length
                        id = localStorage.getItem("lastData") || len
                        console.log(id)
                        arr.push({ id: id, task: {title: name, desc: description}, check: false });
                        var stringdata = JSON.stringify(arr[arr.length - 1]);
                        localStorage.setItem(id, stringdata);
                        localStorage.setItem("lastData", Number(id) +1)
                        document.getElementById("task_name").value = "";
                        document.getElementById("desc").value = "";
                        close_modal();
                    }
                    console.log(arr);
                    location.reload();
                }
                Object.keys(localStorage).sort().forEach((id)=>{
                    if(id!="lastData"&&id!="start"){
                    var retrieveddata = localStorage.getItem(id);
                    var parseddata = JSON.parse(retrieveddata);
                    var checked = parseddata.check
                    if(checked)
                    maindiv1.innerHTML += '<button value="'+parseddata.id+'" id = "del_id" onclick="del_button(event)" class="del_btn">DEL</button><input value="'+parseddata.id+'" type="checkbox" checked = ""onclick="check_btn(event)" id = "checkbox" class="done_btn" ><div class="card"><a style="text-decoration:none"  href="../taskpage/taskpage.html?id=' + parseddata.id + '">' + parseddata.task.title + '</a></div>'
                    else{
                        maindiv1.innerHTML += '<button value="'+parseddata.id+'" id = "del_id" onclick="del_button(event)" class="del_btn">DEL</button><input value = "' + parseddata.id + '" type="checkbox" unchecked = "" onclick="check_btn(event)" id = "checkbox" class="done_btn" ><div class="card"><a style="text-decoration:none"  href="../taskpage/taskpage.html?id=' + parseddata.id + '">' + parseddata.task.title + '</a></div>'
                    }
                }
                }) 
                del_button = (event) =>{
                    const val = event.target.value
                    localStorage.removeItem(val)
                    location.reload()
                    if(Object.keys(localStorage).length==1)
                        localStorage.setItem("lastData",0)
                }
                check_btn = (event)=>{
                    var val = event.target.value
                    localStorage.setItem(val,JSON.stringify({...JSON.parse(localStorage.getItem(val)),check:event.target.checked}))
                }   
            
        });
    
