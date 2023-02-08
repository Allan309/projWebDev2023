<h1 align="center">Home Manager</h1>

## TECHNOLOGIES

-   Laravel v9: https://laravel.com
-   Bootstrap v5: https://getbootstrap.com
-   FontAwesome v6: https://fontawesome.com
-   Angular v15: https://angular.io
-   Angular Material v15: https://material.angular.io

## FIRST INSTALL

-   Clone this repo
-   `npm i`
-   `composer i`
-   `cp .env.example .env`
-   Update database config
-   `php artisan key:generate`
-   `php artisan migrate`
-   `php artisan db:seed --class=RoleSeeder`
-   `php artisan db:seed --class=UserSeeder`
-   `php artisan storage:link`
-   `cd ./resources/angular/workspace`
-   `npm i`


## RUN LARAVEL FOREGROUND

http://localhost:8000

-   `php artisan serve`

## RUN ANGULAR FOREGROUND

http://localhost:4200

-   `cd ./resources/angular/workspace`
-   (`npm i`)
-   `ng serve`

## GO TO PRODUCTION

-   `cd ./resources/angular/workspace`
-   `ng build` | `npm run build`
-   `cp public/assets/angular/index.html resources/views/angular.blade.php`
-   `cd ../../../`
-   `composer install --optimize-autoloader --no-dev`
-   `php artisan config:cache`
-   `php artisan route:cache`
-   `php artisan view:cache`
