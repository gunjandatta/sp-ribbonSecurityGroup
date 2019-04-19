import { Configuration } from "./cfg";
import { RibbonButton } from "./ribbonBtn";

// Create a global variable to reference the configuration
window["RibbonSecurityGroup"] = { Configuration };

// Wait for the document to be loaded
window.addEventListener("load", () => {
    // Create an instance of the ribbon
    RibbonButton();
});