

# Develop the plugin

Now let's create a plugin that we can use to extend the functionality of the incidents application (and any other application).

In the `incidents-app` folder, create a folder _criticality_ and run `npm init -y` in that folder:

```sh
mkdir criticality && cd criticality && npm init -y && cd ..
```

The command `npm init -y` creates a _package.json_ file in the new folder.

> [!NOTE]
> Normally, you would create a plugin _outside_ of the application's folder.  In this tutorial, you do it inline though.  This is simpler and avoids a monorepo setup.


# Next Step

[Plugin development: Concepts](./2_concepts.md)
