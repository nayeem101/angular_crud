import { Employee } from './employee.model';

export class ResolvedEmployeeList {
  constructor(
    public employeeList: Employee[] | null,
    public error: any = null
  ) {}
}
