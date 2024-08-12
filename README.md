# Proyecto Automatización Web
Proyecto base para la automatización de pruebas de aplicaciones web utilizando Playwright y aplicando el patrón Page object models (POM).

## Contenido
* [Prerrequisitos](#prerrequisitos)
* [Instalación](#instalación)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Herramientas](#herramientas)
* [Ejecución de Pruebas](#ejecución-de-pruebas)
* [Reportería](#reportería)
* [Licencia](#licencia)

## Prerrequisitos
* Node.js 18 o superior
* IDE (Aqua o Visual Studio Code)

## Instalación
Clona el repositorio:
```shell
git clone https://github.com/LizethRE/playwright-pom-base.git
```
```shell
cd playwright-pom-base
```

## Estructura del Proyecto
```Gherkin
pages-objects               # Page object models
test-data                   # Data requerida para las pruebas
test                        # Pruebas
```

## Herramientas
### Codegen
Herramienta útil para la grabación de pruebas y generación de localizadores
```shell
npx playwright codegen
```

### Debug
Depuración de las pruebas
```shell
npx playwright test --debug
```

## Ejecución de Pruebas
### Ejecutar todo el proyecto
```shell
npx playwright test
```

### Ejecutar todos los test de un spec
```shell
npx playwright test nombre.spec.ts
```

### Ejecutar solo un test por nombre
```shell
npx playwright test nombre.spec.ts -g "nombre test"
```

### Ejecutar solo un test por número de línea
```shell
npx playwright test nombre.spec.ts:12
```

### Ejecutar solo un test y repetir varias veces 
```shell
npx playwright test nombre.spec.ts -g "nombre test" --repeact-each 3
```

## Reportería
El reporte se genera en la ruta `playwright-report`, archivo principal `index.html`

## Licencia
Open source project.


