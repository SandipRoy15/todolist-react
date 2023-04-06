import { useState, useReducer } from "react";
import './ToDoList.css'
let GLOBAL_TASK_ID = 42;

function todoListReducer(CurrentValue, actionObj) {
    // const whatToDo=actionObj.type;
    let copy = CurrentValue.slice();
    if (actionObj.type === 'Add_To_Task') {
 // GLOBAL_TASK_ID++
        const taskObj = {
            task: actionObj.val,
            completed: false,
            id: GLOBAL_TASK_ID++
        }
        copy.push(taskObj);
        return copy;
    }

    else if (actionObj.type === "Delete_Task") {
        const copy = CurrentValue.filter((obj) => {
            return obj.id !== actionObj.current_id;
        })
        return copy

    }
    else if (actionObj.type === "Edit_task") {
        //     const copy =data.filter( (obj)=>{
        //         return obj.id !==current_id;
        //   })
        //   setData(copy);

    }
    else if (actionObj.type === "MarkComplete_Task") {

        for(const obj of copy){
            if (obj.id === actionObj.current_id) {
                obj.completed =true;

            }
        }
        return copy;

    }
    else {
        throw new Error("dfghj");

    }

}

function Todo(props) {
    const task =props .task;
    const completed = props.completed;
    const current_id = props.id;


    let taskEl = task;
    if (completed) {
        taskEl = <del>{task}</del>

    }
    return (<>
    
       
    
        <li key={current_id}>{taskEl}</li>

        <button className="mark" onClick={function () {

        //    props. setData(todoListReducer(props.data, { type: 'MarkComplete_Task', current_id: current_id }))
        props.dispatchFn({ type: 'MarkComplete_Task', current_id: current_id });

        }}>Mark </button>

        <button className="delete" onClick={function () {
        //    props. setData(todoListReducer(props.data, { type: 'Delete_Task', current_id }))
        props.dispatchFn({ type: 'Delete_Task', current_id });
        }}>Delete</button>

        <button className="edit" onClick={function () {
        }}>Edit</button>

    </>
    );

}
function TodoInput(props){
    const [inputVal, setInputVal]=useState();
   
    return(<>
    
    <form onSubmit={function (event) {
        event.preventDefault();

    //    props. setData(todoListReducer(props.data, { type: "Add_To_Task", val: inputVal }));
           props.dispatchFn({ type: "Add_To_Task", val: inputVal });
            setInputVal("");}}>
                <div className="all">



        <input className="input" type="text" required={true} value={inputVal} onChange={function (event) {
            setInputVal(event.target.value);
        }} />
        
        

        <button className="add" type="submit" >Add</button>
        
        </div>
    </form>

    </>);

}


function ToDoList() {

    // const [data, setData] = useState([]);
    const [data, dispatchFn]=useReducer(todoListReducer,[]);

    let elm = data.map((TodoData) => {
        return <Todo task={TodoData.task}
                     id={TodoData.id}
                     completed={TodoData.completed}
                      // setData={setData}
                      dispatchFn={dispatchFn}
                      data={data} />
    });


    return (
        <>
        <TodoInput dispatchFn={dispatchFn} data={data} />
           
            <ol className="display">
                {elm}
            </ol>
        </>
    );
}
export default ToDoList;
