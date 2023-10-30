export interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  archivedAt: string | null;
  email: string;
  phone: string;
  position: string;
  avatar: string | null;
}

export interface Avatar {
  link: string;
}

export interface Department {
  id: string;
  title: string;
  managerId: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone: string;
  roleId: number;
  managerId: string;
  address: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  subDepartment: string | null;
  manager: Manager;
  avatar: Avatar;
  department: Department;
  group: string | null;
  division: string | null;
}
