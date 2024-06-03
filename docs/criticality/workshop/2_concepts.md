# Plugin development: Concepts

## CSN : Schema Notation

[CSN](https://cap.cloud.sap/docs/cds/csn) is a notation for compact representations of CDS models, You access CSN to interpet the models with all services, entities, fields and annotations defined, based on which you can add the functionality in the application.

## Plugin Configurations

You can provide [default configurations in the plugins](https://cap.cloud.sap/docs/node.js/cds-plugins#auto-configuration), and the applications using the plugin can overwrite the plugin configuration. You can use this configuration to change the behaviour that the plugin adds to the application.

The plugin we are creating can add the UI annotations to render the _criticality_ information. For now the scope is to add it in SAP Fiori UI's.

In `criticality/package.json` add the configuration as follows:

```json
"cds": {
  "requires": {
    "criticality": {
      "fioriAnnotations": true
    }
  }
}
```

> [!TIP]
> You can access the configurations by running `cds env get requires.criticality` in the application folder.

## Next Step

[Plugin development](./3_adding_more_features.md)
