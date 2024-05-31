# Plugin development: Initial setup

In this workshop you will create a new plugin based on the [criticality types](https://sap.github.io/odata-vocabularies/vocabularies/UI.html#CriticalityType), which the SAP Fiori UI interprets to render the criticality information in semantic colors.

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

## Develop the plugin

Now let's create a plugin that we can use to extend the functionality of the incidents application (and any other application).
Create a folder _criticality_ and run `npm init -y` in that folder:

```sh
mkdir criticality && cd criticality && npm init -y && cd ..
```

The command `npm init -y` creates a _package.json_ file in the new folder.

## Next Step

[Plugin development: Concepts](./2_concepts.md)
