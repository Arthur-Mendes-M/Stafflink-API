import { sql } from "../database/db.js";
import {randomUUID} from 'crypto'

class Database {
    async listEmployees() {
        const results = await sql`
            SELECT * FROM employees
        `

        return results
    }

    async createEmployee(employee) {
        const employeeId = randomUUID()
        const {
            name,
            birthday
        } = employee

        await sql`
            INSERT INTO employees (
                id, name, birthday
            ) VALUES (
                ${employeeId},
                ${name},
                ${birthday}
            );
        `.then((result) => console.log(`Deu certop. Status: ${result.statusText}`))
         .catch(e => console.log(e))
    }

    async updateEmployee(employeeId, newData) {
        await sql`
            UPDATE employees 
                SET 
                    name = ${newData.name},
                    birthday = ${newData.birthday}
                WHERE
                    id = ${employeeId}
        `
    }
}

export const DB = new Database()