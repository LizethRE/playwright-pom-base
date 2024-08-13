import {test} from '@playwright/test';
import {DashboardPage} from "../pages-objects/DashboardPage";
import {Menu} from "../pages-objects/Menu";
import {CommonPage} from "../pages-objects/CommonPage";
import {AddEmployeePage} from "../pages-objects/AddEmployeePage";
import {EditEmployeePage} from "../pages-objects/EditEmployeePage";

import fs from 'fs';
import path from "node:path";
import employees from '../test-data/employees.json';
import toast from '../test-data/toast.json';

const filePath = path.join(__dirname, '../test-data', 'employees.json');

test.describe('Creación de nuevos empleados en el sistema de OrangeHRM', () => {
    employees.forEach(employee => {
        test(`Creación de un nuevo empleado de manera exitosa ${employee.key}`, async ({page}) => {
            let commonPage: CommonPage;
            await test.step('Navega al módulo PIM', async () => {
                const dashboardPage = new DashboardPage(page);
                const menuPage = new Menu(page);

                await dashboardPage.goTo();
                await menuPage.navigateToThePimModule();
            })
            await test.step('Va a agregar nuevo empleado', async () => {
                commonPage = new CommonPage(page);
                await commonPage.clickOnAdd();
            })
            await test.step('Diligencia el formulario de creación de empleado', async () => {
                const addEmployeePage = new AddEmployeePage(page);
                await addEmployeePage.fillOutNewEmployeeForm(employee.firstName, employee.middleName, employee.lastName);

                employee.id = await addEmployeePage.getIdEmployee();
                fs.writeFileSync(filePath, JSON.stringify(employees));
            })
            await test.step('Válida el mensaje del toast', async () => {
                await commonPage.checkToastMessage(toast.Saved)
            })
            await test.step('Válida la redirección a la página de Editar Información del Nuevo Empleado', async () => {
                const editEmployeePage = new EditEmployeePage(page);
                await editEmployeePage.checkFullNameText(employee.firstName + " " + employee.lastName);
            })
        });
    })
});
