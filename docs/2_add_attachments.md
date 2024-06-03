# Add Attachments Service

## Setup

1. In the terminal, go to the project's root folder of the Incident Management application and run the following command:  
   
   ```bash
    npm add @cap-js/attachments
   ```
**Note** - To be able to use the Fiori uploadTable feature, you must ensure ^1.121.0 SAPUI5 version is updated in the application's index.html

2. Add an `{ attachments: { scan: true } }` code block to the `package.json` of the project to scan the attachments.

```jsonc hl_lines="4-6"
{
  ...
  "cds": {
    "attachments": {
      "scan": true
    },
    "requires": {
        ... 
    }
  }
}
```


## Use attachments
1. Create a new file attachments.cds in the db folder.

2. Copy the snippet to the newly created *attachments.cds* file

    ```cds
        using { sap.capire.incidents as my } from './schema';
        using { Attachments } from '@cap-js/attachments';

        extend my.Incidents with { attachments: Composition of many Attachments }
    ```

## Run and test the application locally

Below are the steps we have taken to establish asset management for our incident management application, successfully. Now, let's witness it in action by experimenting with scenarios where attachment contents are stored locally in the database.


1. Now Run the below command to run the application

   ```bash
    cds watch
   ```
2. Navigate to the object page of the incident `Solar panel broken`:


3. The `Attachments` type has generated an out-of-the-box Attachments table (see 1) at the bottom of the Object page:

![open BAS folder](./images/facet.png)
4. **Upload a file** by going into Edit mode and either using the **Upload** button on the Attachments table or by drag/drop. Then click the **Save** button to have that file stored that file in the dedicated resource (database, S3 bucket, etc.). We demonstrate this by uploading the PDF file from [Solar Panel Report.pdf_](./Solar_Panel_Report.pdf):

![Upload file](./images/upload.gif)
6. **Delete a file** by going into Edit mode and selecting the file(s) and by using the **Delete** button on the Attachments table. Then click the **Save** button to have that file deleted from the resource (database, S3 bucket, etc.). We demonstrate this by deleting the previously uploaded PDF file: `Solar Panel Report.pdf`

![delete file](./images/upload.gif)
