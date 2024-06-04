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

## Wire the plugin to the base app

In the _package.json_ of the incidents application (not the plugin!) we add a dependency to our criticality plugin and we also define criticality as an [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

```js
{
  ...,
  "workspaces": [
    "criticality"
  ],
  "dependencies": {
    ...
    "criticality": "*"
  },
  ...
}
```

Now you can install the dependencies and run the cds server locally:

```sh
npm i && cds w 
```

You should see something like this in the console:

```sh
...
my critical plugin
[cds] - loaded model from 5 file(s):
...
```

To see the output from the plugins in the logs, raise the log level on the plugin component with

```sh
DEBUG=plugins cds w
```

## Next Step

[Plugin development](./3_adding_more_features.md)
