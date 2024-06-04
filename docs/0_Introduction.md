# Welcome
Welcome to the recap Workshop on CAP Plugins!

## Purpose

CAP Plugins have gained a lot of traction in the last months and year(s).
The idea is to create a plugin once and use it many times, hence to reduce the total effort of development and operations, so CAP application developers can focus on their domain.

## Clone the incidents repository

We use the [incidents application](https://github.com/cap-js/incidents-app) as a base app. Using the base app, we test the plugin we are going to develop in this workshop.

- Start by opening a new terminal and go into the *incidents-app* folder of the repository:

    ```sh
    cd incidents-app
    ```

- Install the dependencies:

     ```sh
    npm i 
    ```

- Start the application:

   ```sh
   cds watch
   ```

This is how the [webapp](http://localhost:4004/incidents/webapp/index.html) looks right now:

![Screenshot of the Incidents app UI w/o the plugin](./images/Incidents-ui-before.png)

# Next Step

[Implement Change Tracking](./1_add_change_tracking.md)
