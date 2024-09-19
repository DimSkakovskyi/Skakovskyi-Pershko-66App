import inquirer from "inquirer";

let todos: string[] = [];
let loop = true;

while(loop)
{
    const answers: {
        TODO: string,
        addMore: boolean
    } = await inquirer.prompt([
        {
            type: "input",
            name: "TODO",
            message: "What do you want to add in yout To-do list?"
        },
        {
            type: "confirm",
            name: "addMore",
            message: "Do you want to add it to your list?"
        },
    ])

    const{ TODO, addMore } = answers;

    loop = addMore;
    if(TODO){
        todos.push(TODO);
    } else {
        console.log("Add valid input");
    }
}
if(todos.length > 0){
    console.log("Your To-do list is: ");
    todos.forEach(todo => {
        console.log(todo);
    });
}
else {
    console.log("No tsaks found");
}