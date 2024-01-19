/*
 * Challenge 3 - JavaScript/TypeScript Development
 * This challenge is broken into a series of small tasks.
 * In general, you want to add code to each function below to accomplish the stated task.
 * Your code must pass the associated tests - you can use "npm run test" to run the tests.
 */

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  cities: string[];
}

const employees: Employee[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    rating: 4,
    cities: ["New York", "Chicago", "New Jersey"],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    rating: 2,
    cities: ["Virginia", "New Jersey"],
  },
  {
    id: 3,
    firstName: "Rick",
    lastName: "Flair",
    rating: 3,
    cities: ["Phoenix", "Chicago"],
  },
  {
    id: 4,
    firstName: "Hulk",
    lastName: "Hogan",
    rating: 1,
    cities: ["New York", "Boston"],
  },
  {
    id: 5,
    firstName: "Ricky",
    lastName: "Bobby",
    rating: 5,
    cities: ["New Hampshire"],
  },
];

//**********************************************************//
//*
//*  Goal: Order employees from the highest
//*  rating to the lowest, highest being 5
//*
//**********************************************************//
export const sortEmployeeByRating = (): Employee[] => {
  return employees.sort((a, b) => b.rating - a.rating);
};

//**********************************************************//
//*
//*  Goal: Get employee with the lowest rating. If ratings
//*  change, the method should still be able to return the employee
//*  with the lowest rating regardless of the previous data
//*
//**********************************************************//
export const getEmployeeWithLowestRating = (): Employee => {
  return employees.reduce((a, b) => (a.rating < b.rating ? a : b));
};

//**********************************************************//
//*
//*  Goal: Get average rating of all employees
//*
//**********************************************************//
export const getTheAverageRatingForEmployees = (): number => {
  return (
    employees.reduce((acc, empl) => acc + empl.rating, 0) / employees.length
  );
};

//**********************************************************//
//*
//*  Goal: Get cities starting with New
//*  Expected result: ['New Hampshire, New York', 'New Jersey']
//*
//**********************************************************//
export const getEmployeesCitiesStartingWithNew = (): string[] => {
  let citiesWithNew: Set<string> = new Set();
  employees.map((empl) => {
    const newCities = empl.cities.filter((city) => city.includes("New"));
    citiesWithNew = new Set([...citiesWithNew, ...newCities]);
  });

  return [...citiesWithNew];
};

//**********************************************************//
//*
//*  Goal: Get all unique cities from employee cities
//*
//**********************************************************//
export const getEmployeesDistinctCities = (): string[] => {
  return [
    ...new Set(
      employees.reduce(
        (cities: string[], empl) => [...cities, ...empl.cities],
        []
      )
    ),
  ];
};

//**********************************************************//
//*
//*  Goal: Sort employees unique cities in a one liner
//*
//**********************************************************//
export const sortEmployeesDistinctCities = (): string[] => {
  return employees
    .reduce(
      (cities: string[], empl) => [...new Set([...cities, ...empl.cities])],
      []
    )
    .sort((a, b) => a.localeCompare(b));
};

//**********************************************************//
//*
//*  Goal: Get employee full name for a specific city
//*  Expected result for New York: ['John Doe', 'Hulk Hogan'] in any order
//*
//**********************************************************//
export const getEmployeesFullNameForCity = (city: string): string[] => {
  return employees.reduce(
    (names: string[], empl) =>
      empl.cities.includes(city)
        ? [...names, `${empl.firstName} ${empl.lastName}`]
        : names,
    []
  );
};
