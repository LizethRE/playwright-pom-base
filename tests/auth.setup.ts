import {test, test as setup} from "@playwright/test";
import {LogInPage} from "../pages-objects/LogInPage";
import {DashboardPage} from "../pages-objects/DashboardPage";

import user from '../test-data/login.json';

const authFile = '.auth/session.json';

setup('Inicio de sesión en OrangeHRM', async ({page}) => {
    await page.setViewportSize({width: 1505, height: 715});

    const logInPage = new LogInPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navega a la pagina Inicio de Sesión', async () => {
        await logInPage.goTo();
    });

    await test.step('Se autentica en el sistema', async () => {
        await logInPage.loginWithCredentials(user.username, user.password);
    });

    await test.step('Válida la autenticación exitosa', async () => {
        await dashboardPage.checkDashboardPageVisibility();
    });

    await page.context().storageState({path: authFile});
});