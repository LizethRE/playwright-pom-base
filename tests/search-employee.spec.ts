import {test} from '@playwright/test';
import {DashboardPage} from "../pages-objects/DashboardPage";
import {Menu} from "../pages-objects/Menu";
import {CommonPage} from "../pages-objects/CommonPage";

import employees from '../test-data/employees.json';
import nonExistentEmployee from '../test-data/non_existent_employee.json';
import toast from "../test-data/toast.json";

test.describe('Búsqueda de empleados en el sistema de OrangeHRM', () => {
    test.beforeEach(async ({page}) => {
        await test.step('Navega al módulo PIM', async () => {
            const dashboardPage = new DashboardPage(page);
            const menuPage = new Menu(page);

            await dashboardPage.goTo();
            await menuPage.navigateToThePimModule();
        });
    });

    test('Búsqueda de empleado existente por nombre', async ({page}) => {
        const commonPage = new CommonPage(page);

        await test.step('Busca el empleado por nombre', async () => {
            const randomIndex = Math.floor(Math.random() * employees.length);
            const fullname = employees[randomIndex].firstName + " " + employees[randomIndex].middleName + " " + employees[randomIndex].lastName;
            await commonPage.searchByName(fullname.split("  ").join(" "));
        });

        await test.step('Válida la obtención de resultados de la búsqueda', async () => {
            await commonPage.checkRecordsFound();
        });
    });

    test('Búsqueda de empleado existente por ID', async ({page}) => {
        const commonPage = new CommonPage(page);

        await test.step('Busca el empleado por ID', async () => {
            const randomIndex = Math.floor(Math.random() * employees.length);
            await commonPage.searchById(employees[randomIndex].id);
        });

        await test.step('Válida la obtención de resultados de la búsqueda', async () => {
            await commonPage.checkRecordsFound();
        });
    });

    test('Búsqueda de empleado no existente por nombre', async ({page}) => {
        const commonPage = new CommonPage(page);

        await test.step('Busca el empleado por nombre', async () => {
            const fullname = nonExistentEmployee.firstName + " " + nonExistentEmployee.middleName + " " + nonExistentEmployee.lastName;
            await commonPage.searchByName(fullname.split("  ").join(" "));
        });

        await test.step('Válida el mensaje del toast', async () => {
            await commonPage.checkToastMessage(toast.noRecordsFound);
        });
    });

    test('Búsqueda de empleado no existente por ID', async ({page}) => {
        const commonPage = new CommonPage(page);

        await test.step('Busca el empleado por ID', async () => {
            await commonPage.searchById(nonExistentEmployee.id);
        });

        await test.step('Válida el mensaje del toast', async () => {
            await commonPage.checkToastMessage(toast.noRecordsFound);
        });
    });
});
