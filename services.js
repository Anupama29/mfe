const key = "employees";

async function findAll() {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return [];
  }
}

async function add(employee) {
  if (!employee || !employee.username || !employee.password)
    throw new Error("Bad Request!");

  const id = Date.now();
  const employeeObject = { ...employee, id};
  const employees = await findAll();

  const match = employees.find(
    (emp) => emp.email === employee.email || emp.username === employee.username
  );
  if (match)
    throw new Error(
      match.email === employee.email
        ? "Email Already Exist!"
        : "Username Already Exist!"
    );

  employees.push(employeeObject);
  localStorage.setItem(key, JSON.stringify(employees));

  return employeeObject;
}

async function findBy(criteria) {
  const employees = await findAll();
  const criteriaKeys = criteria ? Object.keys(criteria) : [];
  if (!criteriaKeys.length) throw new Error("Criteria is required!");

  return employees.find((emp) =>
    criteriaKeys.every((cKey) => criteria[cKey] === emp[cKey])
  );
}

if (!localStorage.getItem(key)) {
  const seed = [
    {
      username: "abc",
      email: "test@gmail.com",
      id: 0,
      password: ""
    },
  ];
  localStorage.setItem(key, JSON.stringify(seed));
}

export default {
  findAll,
  findBy,
  add,
};
