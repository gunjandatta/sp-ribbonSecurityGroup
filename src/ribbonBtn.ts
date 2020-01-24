import { Components, ContextInfo, Helper, Types, Web } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * Ribbon Button
 */
export const RibbonButton = () => {
    let _users: Array<Types.SP.User> = null;

    // Method to determine if the current user belongs to the security group
    let isInSecurityGroup = (): PromiseLike<boolean> => {
        return new Promise((resolve, reject) => {
            // Get the target security group users
            Web().SiteGroups().getByName(Strings.SecurityGroupName).Users().execute(users => {
                let isInGroup = false;

                // If the group is public, the user can get the data but may not belong to the group
                // Parse the users
                for (let i = 0; i < users.results.length; i++) {
                    let user = users.results[i];

                    // See if this is the current user
                    if (user.Id == ContextInfo.userId) {
                        // Set the flag
                        isInGroup = true;
                        break;
                    }
                }

                // See if the user is in the group
                if (isInGroup) {
                    // Set the users
                    _users = users.results;

                    // Resolve the request
                    resolve();
                } else {
                    // Reject the request
                    reject();
                }
            }, reject); // Reject -> User doesn't have access or group doesn't exist
        });
    };

    // See if the user belongs to the group
    isInSecurityGroup().then(
        // Success
        () => {
            // Create the ribbon button
            Helper.RibbonLink({
                id: "GroupUsers",
                title: "Group Users",
                onClick: () => {
                    let el = document.createElement("div");

                    // See if the users exist
                    if (_users) {
                        // Render the table
                        Components.Table({
                            el,
                            rows: _users,
                            columns: [
                                {
                                    name: "Id",
                                    title: "Item Id"
                                },
                                {
                                    name: "Title",
                                    title: "Full Name"
                                },
                                {
                                    name: "Email",
                                    title: "Email"
                                }
                            ]
                        });
                    } else {
                        // Display a message
                        Components.Alert({
                            el,
                            header: "Access Denied",
                            content: "You do not belong to the '" + Strings.SecurityGroupName + "' security group.",
                            type: Components.AlertTypes.Danger
                        }).el;
                    }

                    // Display the user's information in a modal dialog
                    Helper.SP.ModalDialog.showModalDialog({
                        title: "Security Group Users",
                        html: el,
                        height: 350,
                        width: 500
                    });
                }
            });
        },
        // Error
        () => {
            // Do nothing, the user doesn't belong in the security group
        }
    );
}
