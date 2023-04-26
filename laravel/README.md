<h1 align="center">Home Manager</h1>

## TECHNOLOGIES

-   Laravel v9: https://laravel.com
-   Bootstrap v5: https://getbootstrap.com
-   FontAwesome v6: https://fontawesome.com
-   Angular v15: https://angular.io
-   Angular Material v15: https://material.angular.io

## Prerequises

- PHP <= 8.0
- PHP extensions listed here: https://laravel.com/docs/9.x/deployment#server-requirements
- Nodejs <= 14.20
- Angular installed (https://angular.io/guide/setup-local)
- deactivate any ad blocker

## FIRST INSTALL

-   Clone this repo
-   `cd ./laravel`
-   `npm i`
-   `composer i`
-   `cp .env.example .env`
-    Update `.env` at your needs
-   `php artisan key:generate`
-   `php artisan jwt:secret`
-   `php artisan migrate`
-   `php artisan storage:link`
-   `cd ./resources/angular/workspace`
-   `npm i`


## RUN LOCALLY

-   `cd ./laravel`
-   `php artisan serve` # http://localhost:8000
-   `cd ./resources/angular/workspace` # http://localhost:4200
-   `ng serve`

## GO TO PRODUCTION

-   make all steps from "FIRST INSTALL" on server
-   `cd ./laravel/resources/angular/workspace`
-   `ng build` | `npm run build`
-   `cd ../../../`
-   `cp public/assets/angular/index.html resources/views/angular.blade.php`
-   `composer install --optimize-autoloader --no-dev`
-   `php artisan config:cache`
-   `php artisan route:cache`
-   `php artisan view:cache`
