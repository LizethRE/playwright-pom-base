import {test} from '@playwright/test';
import {DashboardPage} from "../pages-objects/DashboardPage";
import {Menu} from "../pages-objects/Menu";
import {CommonPage} from "../pages-objects/CommonPage";
import {EditEmployeePage} from "../pages-objects/EditEmployeePage";

import employees from '../test-data/employees.json';
import toast from "../test-data/toast.json";

test.describe('Edición de empleados en el sistema de OrangeHRM', () => {
    const randomIndex = Math.floor(Math.random() * employees.length);

    test('Edición de un empleado de manera exitosa', async ({page}) => {
        const commonPage = new CommonPage(page);

        await test.step('Navega al módulo PIM', async () => {
            const dashboardPage = new DashboardPage(page);
            const menuPage = new Menu(page);

            await dashboardPage.goTo();
            await menuPage.navigateToThePimModule();
        });

        await test.step('Busca el empleado por ID', async () => {
            await commonPage.searchById(employees[randomIndex].id);
        });

        await test.step('Edita la información', async () => {
            const editEmployeePage = new EditEmployeePage(page);

            await commonPage.clickOnEdit();
            await editEmployeePage.fillOutEditEmployeeForm(employees[randomIndex].firstName, employees[randomIndex].middleName, employees[randomIndex].lastName);
        });

        await test.step('Válida el mensaje del toast', async () => {
            await commonPage.checkToastMessage(toast.updated);
        });
    });
});
