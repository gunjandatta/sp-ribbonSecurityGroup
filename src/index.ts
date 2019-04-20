import { Helper } from "gd-sprest";
import { Configuration } from "./cfg";
import { RibbonButton } from "./ribbonBtn";

// Create a global variable to reference the configuration
window["RibbonSecurityGroup"] = { Configuration };

// Wait for the SP library to be available, before creating an instance of the ribbon button
Helper.SP.SOD.executeOrDelayUntilScriptLoaded(RibbonButton, "sp.js");