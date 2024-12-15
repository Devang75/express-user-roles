const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    const { firstname, lastname } = req.body;

    if (!firstname || !lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname,
        lastname
    };

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
    const { id, firstname, lastname } = req.body;
    const employeeId = parseInt(id);
    
    const employee = data.employees.find(emp => emp.id === employeeId);
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${id} not found` });
    }

    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== employeeId);
    data.setEmployees([...filteredArray, employee].sort((a, b) => a.id - b.id));
    res.json(data.employees);
};

const deleteEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
    const employee = data.employees.find(emp => emp.id === employeeId);
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    data.setEmployees(data.employees.filter(emp => emp.id !== employeeId));
    res.json(data.employees);
};

const getEmployee = (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = data.employees.find(emp => emp.id === employeeId);
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};