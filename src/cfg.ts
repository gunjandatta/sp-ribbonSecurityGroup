import { Helper, Web } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * Configuration
 */
export const Configuration = {
    // Custom Action - References the script in the web
    CustomAction: Helper.SPConfig({
        CustomActionCfg: {
            Web: [{
                Name: "RibbonSecurityGroup",
                Title: "Ribbon Security Group",
                Description: "Displays a ribbon button, if the user belongs to the group",
                Location: "ScriptLink",
                ScriptSrc: "~site/siteassets/demoSecurityGroup.js",
                Scope: 100000
            }]
        }
    }),

    // Adds the security group
    AddSecurityGroup: () => {
        // See if the security group exists
        Web().SiteGroups().getByName(Strings.SecurityGroupName).execute(
            // Group exists
            group => {
                // Log
                console.log("The security group '" + Strings.SecurityGroupName + "' already exists.");
            },

            // Create it if it exists
            () => {
                // Create the security group
                Web().SiteGroups().add({
                    Title: Strings.SecurityGroupName
                }).execute(group => {
                    // Log
                    console.log("The security group '" + Strings.SecurityGroupName + "' was created successfully.");
                });
            }
        );
    },

    // Removes the security group
    RemoveSecurityGroup: () => {
        // Get the security group
        Web().SiteGroups().getByName(Strings.SecurityGroupName).execute(
            // Group Exists
            group => {
                // Remove it
                Web().SiteGroups().removeById(group.Id).execute(() => {
                    // Log
                    console.log("The security group '" + Strings.SecurityGroupName + "' was removed successfully.");
                });
            },

            // Group doesn't exist
            () => {
                // Log
                console.log("The security group '" + Strings.SecurityGroupName + "' doesn't exist.");
            }
        );
    }
}