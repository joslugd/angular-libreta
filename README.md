# NotesApp - La aplicación de notas hecha con Angular

Esta es una aplicación desarrollada con Angular y Web Componentes 
para el Trabajo de Fin de Máster del Máster en Ingeniería del 
Software para la Web.

La aplicación consiste en una sencilla libreta donde el usuario 
puede tener sus notas, las cuales se almacenarán en el local
storage del navegador.
En esta libreta, el usuario podrá crear, leer, modificar y eliminar notas.

## Formato de las notas

Las notas soportan un subconjunto del lenguaje de marcado
Markdown. El soporte incluye *énfasis ligero*, **énfasis intenso**,
`formato de código`, títulos y párrafos.

## Puesta a punto de la aplicación

*Esta sección ha sido extraída directamente del Trabajo.*

Los siguientes pasos son necesarios para el iniciar la aplicación
a partir del código fuente de la misma.

#### Instalación de NodeJS y NPM
Lo primero es instalar
el entorno de ejecución JavaScript NodeJS, necesario para la
ejecución de las utilidades necesarias para el desarrollo
(como la CLI de Angular o el compilador de TypeScript).
La instalación de NodeJS será diferente en función del
sistema operativo utilizado. No obstante, se recomienda
el uso de NVM (*Node Version Manager*) para la instalación
de NodeJS y de NPM ([enlace a la página de NVM en GitHub](https://github.com/creationix/nvm)).
La ventaja de la
utilización de NVM es que permite la instalación de diferentes
versiones de NodeJS, incluso permitiendo el uso de 
una versión diferente para cada proyecto.

La instalación de la versión 8.4.0 de NodeJS y la versión
5.3.0 de NPM utilizando NVM se realiza con el siguiente comando:

```
$ nvm install 8.4.0
```

#### Instalación de la CLI de Angular y Bower

El siguiente paso
es la instalación de la CLI de Angular, utilizada para el
arranque de la aplicación, así como Bower, la herramienta
utilizada para la gestión de dependencias de lado de cliente.
Para la instalación de estas dos herramientas, se debe
utilizar el siguiente comando:

```
$ npm install -g @angular/cli bower
```

La bandera `-g` causa la instalación de los paquetes de forma
global al sistema, lo que ocasiona que no estén asociados a un
proyecto concreto. Esto es conveniente en este caso pues estas
herramientas pueden ser utilizadas potencialmente en múltiples proyectos.

#### Instalación de las dependencias

El tercer paso es la
instalación de las dependencias, tanto por parte de NodeJS mediante
NPM como las dependencias de lado de cliente (principalmente,
componentes web de terceros) con Bower. El comando requerido
para la descarga de dependencias es el siguiente:

```
$ npm install && bower install
```

#### Compilación y arranque de la aplicación

El último paso
consiste en la compilación de la aplicación y su ejecución
mediante el uso de la CLI de Angular. Para ello, es tan sencillo
como ejecutar el siguiente comando:

```
ng serve
```

Tras un breve periodo de tiempo, la aplicación se habrá compilado
y la CLI de Angular habrá lanzado un servidor local en el puerto
4200. Accediendo a
[http://localhost:4200](http://localhost:4200) se podrá hacer
uso de la aplicación.
