# Implement Change Tracking

In this tutorial, you will learn how to incorporate the change tracking feature into the existing Incident Management application.

## Set Up

Since you already have the Incident Mnagement application set up in your development environment, let's include the following *npm* dependency.

1. Open **Terminal** -> **New Terminal**
2. Run the following command

```sh
npm add @cap-js/change-tracking
```

## Annotate the Models

Once you've included the *plugin*, proceed to insert the `@changelog` annotations into the entities that you want to track changes for in the `srv/services.cds` file.

Add the below annotations into `srv/services.cds` file.

```cds
annotate ProcessorService.Incidents with @changelog: {
  keys: [ customer.name, createdAt ]
} {
  title    @changelog;
  status   @changelog;
  customer @changelog: [ customer.name ];
};

annotate ProcessorService.Incidents.conversation with @changelog: {
  keys: [ author, timestamp ]
} {
  message  @changelog;
}
```

In this context, the entities **Incidents** and **Conversations** have been annotated to monitor changes, specifying key fields and attributes to be tracked selectively. For instance, we have chosen to track modifications for the **title**, **status**, and **customer** attributes specifically, rather than monitoring all fields.

# View Change History

To test the functionality and flow of our change tracking feature, we will go through a simple scenario. In this section, we will make changes to a sample dataset, track those changes using the feature, and then explore the change history to observe how it captures and records modifications. 
Let's get started!


1. The incident management app displays a list of incidents. Open an incident and modify its details.

![List of Incidents](images/list-of-incidents.png)

2. Upon opening an incident, you can see an additional tab called **Change History**. This tab displays details about modifications made to the fields marked for change tracking during the **implementation** phase. To add a new conversation, choose **Edit**.

![Incident Overview](images/incident-overview.png)

3. Create a new conversation and choose **Save**.

![Add Conversation](images/add-conversation.png)

4. Since the **message** field of the **conversation** entity has been marked for change tracking, it should be visible in **Change History**. 

![Change History for Conversation](images/change-history-conversation.png)

Both the old and updated values of the message field are shown, along with the type of the change, user ID and the timestamp of the modification.

> [!NOTE]
> Should the the _Change History_ table be empty for you, click in the _Search_ field above it and press <kbd>Enter</kbd>.
> This is a UI bug that will be resolved soon.

5. In **Change History**, you have the option to modify the incident's title, status, or customer, and view the changes.

![Change the Incident](images/change-incident-details.png)

![Change History for Incident](images/change-history-overview.png)

# Summary

Congratulations, you have successfully implemented and tested the change tracking feature in your application.

![Quick poll: reCAP your experience!](https://forms.office.com/Pages/ResponsePage.aspx?id=bGf3QlX0PEKC9twtmXka914n6hNKFVlPml6fyiE6QrxUN1VSRTdVVDNPTE1LTlozTzU2ODFEUFRHNy4u)
