const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let employees = [
  { name: "Alice", id: "E101" },
  { name: "Bob", id: "E102" },
  { name: "Charlie", id: "E103" },
];
let nextId = 104;

function showMenu() {
  console.log("\nEmployee Management System");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee");
  console.log("4. Exit");
}

function listEmployees() {
  if (employees.length === 0) {
    console.log("No employees to display.");
  } else {
    console.log("\nEmployee List:");
    employees.forEach((employee) => {
      console.log(`Name: ${employee.name}, ID: ${employee.id}`);
    });
  }
  main();
}

function addEmployee() {
  rl.question("Enter employee name: ", (name) => {
    const newEmployee = { name: name, id: `E${nextId++}` };
    employees.push(newEmployee);
    console.log(
      `Employee ${newEmployee.name} (ID: ${newEmployee.id}) added successfully.`
    );
    main();
  });
}

function removeEmployee() {
  rl.question("Enter employee ID to remove: ", (id) => {
    const index = employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      const removedEmployee = employees.splice(index, 1);
      console.log(
        `Employee ${removedEmployee[0].name} (ID: ${removedEmployee[0].id}) removed successfully.`
      );
    } else {
      console.log(`Employee with ID ${id} not found.`);
    }
    main();
  });
}

function main() {
  showMenu();
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        addEmployee();
        break;
      case "2":
        listEmployees();
        break;
      case "3":
        removeEmployee();
        break;
      case "4":
        console.log("Exiting application.");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 4.");
        main();
        break;
    }
  });
}

// Start the application
main();
