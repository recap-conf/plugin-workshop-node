# Welcome
Welcome to the recap Workshop on CAP Plugins!

## Purpose

CAP Plugins have gained a lot of traction in the last months and year(s).
The idea is to create a plugin once and use it many times, hence to reduce the total

## Clone the incidents repository

We use the [incidents application](https://github.com/cap-js/incidents-app) as a base app. Using the base app, we test the plugin we are going to develop in this workshop.

- Start by cloning the repository:

    ```sh
    git clone https://github.com/cap-js/incidents-app.git && cd incidents-app && git checkout criticality-plugin-workshop
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