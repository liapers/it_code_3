let tasks=[]

let buttonSv = document.getElementById('save')
let buttonDel = document.getElementById('delete')
let numberTask = document.getElementById("taskNumber")


//Добавление новых задач


buttonSv.addEventListener("click",()=>{
    getTask()
})

function visibilityBtn(){ //проверяем, есть ли задачи и нужно ли показывать меню с удалением их
    if (tasks.length===0){
        buttonDel.style.visibility = "hidden";
        numberTask.style.visibility = "hidden";

    }else{
        //если они есть, то показывает кнопку
        buttonDel.style.visibility = "visible";
        //чтобы не было повтора цифр, удаляем старые и переписываем заново
        while (numberTask.firstChild){ 
        numberTask.removeChild(numberTask.firstChild)
        }
        //вырисовываем номера
        tasks.map((item, index)=>numberTask.insertAdjacentHTML("beforeend", "<option>" + (index+1) + "</option>"))
        numberTask.style.visibility = "visible";
    }
}

function getTask(){
    let nameTask=document.getElementById("task")
    let desc = document.getElementById("desc")

    obj={
        name: nameTask.value,
        description: desc.value
    }
    tasks.push(obj)
    //в качестве номера задачи берем длинну массива задач
    addTask(obj.name, obj.description,tasks.length)
    //вырисовываем кнопку и номера задач, доступных для удаления
    visibilityBtn()

} 

function addTask(task, desc, number){
    let taskList = document.getElementById("tasks")
    let div = document.createElement('div')
    let pTask = document.createElement("p")
    let pDesc = document.createElement("p")
    let pNum = document.createElement("p")
    pTask.innerHTML=task
    pDesc.innerHTML=desc
    pNum.innerHTML=("#" + number)
    div.classList.add("output-form")
    pTask.classList.add("out-text")
    pDesc.classList.add("out-text")
    pNum.classList.add("out-num")
    div.appendChild(pNum)
    div.appendChild(pTask)
    div.appendChild(pDesc)
    taskList.append(div)
}

//Удаление всех задач
buttonDel.addEventListener("click",()=>{
    delTasks()
})

function delTasks(){
    let deleteNumber=numberTask.value;
    let fullTasks = document.querySelector("#tasks") 
    fullTasks.childNodes[deleteNumber].remove()
    tasks.splice(deleteNumber-1,1)
    //перерисовываем номера задач
    if (fullTasks.hasChildNodes())
    {
        for (let index = 0; index < tasks.length; index++)
        {
            let numTask = document.querySelectorAll(".out-num")
            numTask[index].innerHTML = ("#"+ (index+1))          
        }
    }


    visibilityBtn()
}