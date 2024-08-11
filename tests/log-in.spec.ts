import {test} from '@playwright/test';
import {LogInPage} from '../pages-objects/LogInPage';
import {DashboardPage} from '../pages-objects/DashboardPage';

let logInPage: LogInPage;

test.describe('Inicio de Sesión en OrangeHRM', () => {
    test('Inicio de sesión exitoso', async ({page}) => {
        logInPage = new LogInPage(page);
        await test.step('Navega a la pagina Inicio de Sesión', async () => {
            await logInPage.goTo();
        })
        await test.step('Se autentica en el sistema', async () => {
            await logInPage.loginWithCredentials('Admin', 'admin123');
        })
        await test.step('Válida la autenticación exitosa', async () => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.checkDashboardPageVisibility();
        })
    });
});
