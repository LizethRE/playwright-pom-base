import {test} from '@playwright/test';
import {LogInPage} from '../pages-objects/LogInPage';
import {DashboardPage} from '../pages-objects/DashboardPage';

import user from '../test-data/login.json';
import incorrectUsers from '../test-data/incorrect_users.json';
import incompleteUsers from '../test-data/incomplete_users.json';

let logInPage: LogInPage;

test.describe('Inicio de Sesión en OrangeHRM', () => {
    //Skip auth setup
    test.use({storageState: {cookies: [], origins: []}})

    test.beforeEach(async ({page}) => {
        logInPage = new LogInPage(page);
        await test.step('Navega a la pagina Inicio de Sesión', async () => {
            await logInPage.goTo();
        })
    });

    test('Inicio de sesión exitoso', async ({page}) => {
        await test.step('Se autentica en el sistema', async () => {
            await logInPage.loginWithCredentials(user.username, user.password);
        })
        await test.step('Válida la autenticación exitosa', async () => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.checkDashboardPageVisibility();
        })
    });

    incorrectUsers.forEach(user => {
        test(`Inicio de sesión fallido con credenciales incorrectas ${user.key}`, async () => {
            await test.step('Se autentica en el sistema', async () => {
                await logInPage.loginWithCredentials(user.username, user.password);
            })
            await test.step('Válida la alerta de Invalid credentials y la permanencia en la página de Inicio de Sesión', async () => {
                await logInPage.checkFailedLoginAlert('Invalid credentials');
                await logInPage.checkLogInPageVisibility();
            })
        });
    })

    incompleteUsers.forEach(user => {
        test(`Inicio de sesión fallido con campos vacíos ${user.key}`, async () => {
            await test.step('Se autentica en el sistema', async () => {
                await logInPage.loginWithCredentials(user.username, user.password);
            })
            await test.step('Válida la alerta de Required y la permanencia en la página de Inicio de Sesión', async () => {
                await logInPage.checkRequiredFieldVisibility();
                await logInPage.checkLogInPageVisibility();
            })
        });
    })
});
