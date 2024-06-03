console.log('my critical plugin')

const criticalities = {
  VeryNegative: -1,
  Neutral: 0,
  Negative: 1,
  Critical: 2,
  Positive: 3,
  VeryPositive: 4,
  Information: 5,
};

function getCriticality(criticality) {
  return criticalities[criticality];
}

const cds = require("@sap/cds");
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
      }
    }
  }
});
