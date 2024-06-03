# Plugin development

First, we will just show a simple log message. Create a new file `criticality/cds-plugin.js` and add the following:

```sh
console.log('my critical plugin')
```

This is where the magic happens: If we set a dependency in the _package.json_ of the base app (incidents application) to our criticality plugin, CDS will go and look for `cds-plugin.js` and execute the content. We're going to do that in the [last exercise](./4_extend_incidents_app.md).

>You can check the final version of [cds-plugin.js](./../cds-plugin.js) for the reference.

## Create a criticality object

It's time to work on our plugin now! Make the following changes in `criticality/cds-plugin.js` and add to what's already there.
Create an object with criticality values based on SAP Fiori [vocabulary.](https://sap.github.io/odata-vocabularies/vocabularies/UI.html#CriticalityType)

```js
const criticalities = {
  VeryNegative: -1,
  Neutral: 0,
  Negative: 1,
  Critical: 2,
  Positive: 3,
  VeryPositive: 4,
  Information: 5,
};
```

Add a function to return the criticality value for the given criticality type:

```js
function getCriticality(criticality) {
  return criticalities[criticality];
}
```

## Check for elements in the entity with @criticality annotation

Take a look at [cds lifecycle events!](https://cap.cloud.sap/docs/node.js/cds-server#lifecycle-events) By using [served event](https://cap.cloud.sap/docs/node.js/cds-server#served) lets try to look for the elements

- of an entity with `enum` and `@criticality` annotation and
- elements which are defined as an association to this entity.

```js
const cds = require("@sap/cds/lib");
cds.once("served", () => {
  // go through all services
  for (let srv of cds.services) {
    if (!(srv instanceof cds.ApplicationService)) continue;
    // go through all entities
    for (let entity of srv.entities) {
      // go through all elements in the entity and check for elements having association to the entity with enum and @criticality
      for (const key in entity.elements) {
        const element = entity.elements[key];
        //BLOCK 1 
        /**
         * Check if the element is an enum with criticality annotation
         */
        if (element.enum && element["@criticality"]) {
            
        }

        //BLOCK 2
        /**
         * Check if the element is an association to the entity with enum and @criticality annotation
         */
        if (element.type === "cds.Association" && Object.values(element._target.elements).some((e) => e.enum && e["@criticality"])) {

        }
      }
    }
  }
});
```

## Add read handlers

It's time to add the handlers to return the criticality data.

### For elements with enum entity

Based on the value provided for the enum element the data records read, fetch the corresponding criticality value using the function `getCriticality` you created earlier.

> Replace the code in `//Block 1` from the previous snippet with the following code.

```js
        //BLOCK 1 
        /**
         * Check if the element is an enum with criticality annotation, if yes, add a handler to the READ operation to add the criticality value of the entries
         */
        if (element.enum && element["@criticality"]) {
          srv.after("READ", entity, (data) => {
            if (!data) return;
            // go through all query read results
            for (let entry of data) {
              let enumValue = Object.values(element.enum).filter((e) => e.val === entry[element.name]);
              let criticalityAnnotation = Object.keys(enumValue[0]).filter((v) => /^@criticality./.test(v));
              if (criticalityAnnotation.length > 0) {
                let criticalityType = criticalityAnnotation[0].split(".")[1];
                entry["criticality"] = getCriticality(criticalityType);
              }
            }
          });
        }
```

### For elements which have an association to the entity with enum and @criticality

To make sure criticality indicators are visible in the UI, let's add UI annotations if not added already based on the configuration.

In addition we add the read handlers to return the criticality data when the enum entity is read with expand operator

> Replace the code in `//Block 2` from the previous snippet with the following code.

```js
        //BLOCK 2
        /**
         * Check if the element is an association to the entity with enum and @criticality annotation
         * if yes, add a handler to the READ operation with expand enum entity to return criticality information.
         * Also, if UI annotations are found for the parent entity, add the criticality to the UI LineItem
         */
        if (element.type === "cds.Association" && Object.values(element._target.elements).some((e) => e.enum && e["@criticality"])) {
          // check the configurations to add annotations to the UI LineItem
          if (cds.env.requires.criticality.fioriAnnotations === true){
            // add criticality to the UI LineItem if defined for the parent entity
            const regex = new RegExp(`${element.name}.`);
            element.parent["@UI.LineItem"]
              ?.filter((e) => !e.Criticality && regex.test(Object.values(e.Value)[0]))
              ?.forEach((e) => {
                e.Criticality = { "=": `${element.name}.criticality` };
              });
          }

          // Register a read handler for each relevant element. If the operation extends the enum entity, return the criticality value.
          srv.after("READ", entity, (data) => {
            if (!data) return;
            let assocElem = element;
            let assocElemName = assocElem.name;
            assocElem._target.elements.filter((e) => e.enum && e["@criticality"]).map((field) => {
              let fieldName = field.name;
              let enumElement = assocElem._target.elements[fieldName].enum;
              for (let entry of data) {
                if (entry[assocElemName] && entry[assocElemName][fieldName]) {
                  let enumForValue = Object.values(enumElement).filter((e) =>e.val === entry[assocElemName][fieldName]);
                  let critAnno = Object.keys(enumForValue[0]).filter((v) => /^@criticality./.test(v));
                  let critType = critAnno[0].split(".")[1];
                  entry[assocElemName]["criticality"] = getCriticality(critType);
                }
              }
            });
          });
        }

```

## Next Step

You've developed the plugin. In the next step you'll be wiring the plugin to the base app and do the necessary extensions.

[Update Incidents app](./4_extend_incidents_app.md)
