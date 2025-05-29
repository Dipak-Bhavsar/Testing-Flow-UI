export default {
    findElement: {
        blockId: "",
        methodId: "",
        type: "findElement",
        classObject: "SearchContext",
        name: "findElement",
        label: "Find Element",
        description: "It is used to locate a single web element on a webpage.",
        command: "findElement",
        methodSignature: "findElement(By): WebElement",
        fields: [
            {
                name: "WebElement",
                value: "",
                type: "select",
                label: "WebElement",
                subLabel: "",
                required: true,
                disabled: false,
                options: [
                    {
                        name: "browserWindow",
                        value: "browserWindow",
                        type: "window",
                        label: "Browser Window",
                        tooltip: "Select a browser window action",
                    },

                    {
                        name: "alertPopup",
                        value: "alertPopup",
                        type: "alert",
                        label: "Alert/Popup",
                        tooltip: "Choose an alert or popup type",
                    },

                    {
                        name: "cookies",
                        value: "cookies",
                        type: "cookie",
                        label: "Cookies",
                        tooltip: "Manage your cookie preferences",
                    },

                    {
                        name: "storage",
                        value: "storage",
                        type: "storage",
                        label: "Storage",
                        tooltip: "Choose between session and local storage",
                    },

                    {
                        name: "title",
                        value: "title",
                        type: "text",
                        label: "Title",
                        tooltip: "Provide a title for the content",
                    },

                    {
                        name: "pageSource",
                        value: "pageSource",
                        type: "text",
                        label: "Page Source",
                        tooltip: "Input the source code or URL of the page",
                    },

                    {
                        name: "currentURL",
                        value: "currentURL",
                        type: "text",
                        label: "Current URL",
                        tooltip: "Provide the current URL of the page",
                    },

                    {
                        name: "textField",
                        value: "textField",
                        type: "text",
                        label: "Text Field",
                        tooltip: "Enter plain text",
                    },
                    {
                        name: "passwordField",
                        value: "passwordField",
                        type: "password",
                        label: "Password Field",
                        tooltip: "Enter your password",
                    },
                    {
                        name: "searchInput",
                        value: "searchInput",
                        type: "search",
                        label: "Search",
                        tooltip: "Enter keywords and press enter to search",
                    },
                    {
                        name: "emailField",
                        value: "emailField",
                        type: "email",
                        label: "Email",
                        tooltip: "Enter your email address",
                    },
                    {
                        name: "numberInput",
                        value: "numberInput",
                        type: "number",
                        label: "Enter Number",
                        tooltip: "Input a valid number",
                    },
                    {
                        name: "textArea",
                        value: "textArea",
                        type: "textarea",
                        label: "Text Area",
                        tooltip: "Enter multi-line text",
                    },

                    {
                        name: "submitButton",
                        value: "submitButton",
                        type: "button",
                        label: "Custom Submit",
                        tooltip: "Click to trigger custom submission logic",
                    },

                    {
                        name: "submitButton",
                        value: "submitButton",
                        type: "submit",
                        label: "Submit Form",
                        tooltip: "Click to submit the form automatically",
                    },

                    {
                        name: "inputButton",
                        value: "Click Me",
                        type: "button",
                        label: "Input Button",
                        tooltip: "Click to perform the input action",
                    },

                    {
                        name: "link",
                        value: "Link",
                        type: "link",
                        label: "Input Link",
                        tooltip: "Click to perform the input action",
                    },

                    {
                        name: "checkbox",
                        value: "checkbox",
                        type: "checkbox",
                        label: "Checkbox",
                        tooltip: "Select the checkbox if applicable",
                    },

                    {
                        name: "radioButton",
                        value: "radioButton",
                        type: "radio",
                        label: "Radio Button",
                        tooltip: "Select one of the options",
                    },

                    {
                        name: "dropdownSelect",
                        value: "dropdownSelect",
                        type: "select",
                        label: "Dropdown",
                        tooltip: "Choose an option from the dropdown",
                    },

                    {
                        name: "fileUpload",
                        value: "fileUpload",
                        type: "file",
                        label: "File Upload",
                        tooltip: "Upload a file from your device",
                    },

                    {
                        name: "mainForm",
                        value: "mainForm",
                        type: "form",
                        label: "Main Form",
                        tooltip: "Fill out and submit the form",
                    },

                    {
                        name: "dateInput",
                        value: "dateInput",
                        type: "date",
                        label: "Select Date",
                        tooltip: "Choose a date from the calendar",
                    },

                    {
                        name: "rangeInput",
                        value: 100, // Default value, can be adjusted as needed
                        type: "range",
                        label: "Select Value",
                        tooltip: "Drag the slider to select a value",
                    },

                    {
                        name: "paragraphText",
                        value: "paragraphText",
                        type: "paragraph",
                        label: "Paragraph",
                        tooltip: "This content will be displayed as a paragraph",
                    },

                    {
                        name: "pageHeading",
                        value: "pageHeading",
                        type: "heading",
                        level: "h1", // can be 'h1', 'h2', 'h3', etc.
                        label: "Main Heading",
                        tooltip: "This heading is used for the main title of the page",
                    },

                    {
                        name: "formLabel",
                        value: "NaformLabelme:",
                        type: "label",
                        label: "Form Label",
                        tooltip: "This label identifies the associated form element",
                    },

                    {
                        name: "textSpan",
                        value: "textSpan",
                        type: "span",
                        label: "Inline Text",
                        tooltip: "This span element is used for inline text styling",
                    },

                    {
                        name: "linkAnchor",
                        value: "Click here",
                        type: "link",
                        label: "Navigation Link",
                        tooltip: "Click to visit the target page",
                        href: "https://www.example.com", // Destination URL
                        target: "_blank", // Opens link in a new tab
                    },

                    {
                        name: "mainMenu",
                        type: "menu",
                        label: "Main Menu",
                        subLabel: "Primary navigation",
                        tooltip: "Navigate through main sections",
                    },

                    {
                        name: "breadcrumbNavigation",
                        value: "breadcrumbNavigation",
                        type: "breadcrumbNavigation",
                        label: "Breadcrumb Navigation",
                    },

                    {
                        name: "dragDropContainer",
                        value: "dragDropContainer",
                        type: "dragAndDrop",
                        label: "Drag & Drop",
                    },

                    {
                        name: "volumeSlider",
                        value: 30, // Default slider value
                        type: "slider",
                        label: "Slider",
                        orientation: "horizontal", // could also be 'vertical'
                    },

                    {
                        name: "resizablePanel",
                        value: "resizablePanel",
                        type: "resizable",
                        label: "Resizable Panel",
                    },

                    {
                        name: "dataTable",
                        value: "dataTable",
                        type: "table",
                        label: "Data Table",
                    },

                    {
                        name: "tableRow1",
                        value: "tableRow1",
                        type: "tableRow",
                        label: "Table Row",
                    },

                    {
                        name: "tableCell1",
                        value: "tableCell1",
                        type: "tableCell",
                        label: "Table Cell",
                        tooltip: "This cell shows the user's name",
                    },

                    {
                        name: "tableHeader1",
                        value: "tableHeader1",
                        type: "tableHeader",
                        label: "Table Header",
                        subLabel: "Column header for Name",
                        tooltip: "This header defines the Name column",
                    },

                    {
                        name: "orderedList",
                        value: "orderedList",
                        type: "orderedList",
                        label: "Ordered List", //Steps to Follow
                    },

                    {
                        name: "unorderedList",
                        value: "unorderedList",
                        type: "unorderedList",
                        label: "Unordered List", //Features
                        tooltip: "Displays a list of features without a specific order",
                    },

                    {
                        name: "listOptions",
                        value: "listOptions",
                        type: "list",
                        label: "List Options",
                        tooltip: "This is list item ",
                    },

                    {
                        name: "imageElement",
                        value: "imageElement",
                        type: "image",
                        label: "Image Display",
                    },

                    {
                        name: "drawingCanvas",
                        value: "drawingCanvas",
                        type: "canvas",
                        label: "Drawing Canvas",
                        tooltip: "Canvas area for creating graphics",
                    },

                    {
                        name: "svgGraphic",
                        value: "svgGraphic",
                        type: "svg",
                        label: "SVG Graphic",
                        tooltip: "Displays a scalable vector graphic",
                    },

                    {
                        name: "videoPlayer",
                        value: "videoPlayer",
                        type: "video",
                        label: "Video Player",
                        tooltip: "Play the video content",
                    },

                    {
                        name: "audioPlayer",
                        value: "audioPlayer",
                        type: "audio",
                        label: "Audio Player",
                        tooltip: "Play the audio track",
                    },

                    {
                        name: "infoDialog",
                        value: "infoDialog",
                        type: "dialog",
                        label: "Information Dialog",
                        tooltip: "Click to open the information dialog",
                    },

                    {
                        name: "detailsElement",
                        value: "detailsElement",
                        type: "details",
                        label: "More Information",
                    },

                    {
                        name: "detailsSummary",
                        value: "detailsSummary",
                        type: "summary",
                        label: "View Details",
                        tooltip: "Click to reveal more details",
                    },

                    {
                        name: "mainSection",
                        value: "mainSection",
                        type: "section",
                        label: "Main Section",
                        tooltip: "This section contains the main content of the page",
                    },

                    {
                        name: "pageHeader",
                        value: "pageHeader",
                        type: "header",
                        label: "Page Header",
                        tooltip: "This is the header area of the page",
                    },

                    {
                        name: "pageFooter",
                        value: "pageFooter",
                        type: "footer",
                        label: "Page Footer",
                        tooltip: "This is the footer area of the page",
                    },

                    {
                        name: "shadowDomElement",
                        value: "shadowDomElement",
                        type: "shadowDOM",
                        label: "Shadow DOM Container",
                        tooltip: "This element uses Shadow DOM for encapsulation",
                    },

                    {
                        name: "myCustomComponent",
                        value: "myCustomComponent",
                        type: "webComponent",
                        label: "Custom Component",
                        tooltip: "This is a custom web component built with Shadow DOM",
                    },

                    {
                        name: "lazyImage",
                        value: "lazyImage",
                        type: "lazyLoad",
                        label: "Lazy Loaded Image",
                        tooltip: "This image will load once it enters the viewport",
                    },

                    {
                        name: "confirmationModal",
                        value: "confirmationModal",
                        type: "modal", // Can represent either a <dialog> or a JS modal
                        label: "Confirmation Modal",
                        tooltip: "This modal dialog is used for confirming actions",
                    },

                    {
                        name: "infoTooltip",
                        value: "infoTooltip",
                        type: "tooltip",
                        label: "Tooltip Info",
                        tooltip: "This tooltip is displayed when you hover over the target element.",
                    },

                    {
                        name: "toastMessage",
                        value: "toastMessage",
                        type: "toast",
                        label: "Notification Toast",
                        tooltip: "This toast appears to notify users of an action",
                    },

                    {
                        name: "autocompleteInput",
                        value: "autocompleteInput",
                        type: "autocomplete",
                        label: "Search with Suggestions",
                        tooltip: "Start typing to see suggestions",
                    },

                    {
                        name: "embeddedFrame",
                        value: "embeddedFrame",
                        type: "frame",
                        label: "Frame",
                        tooltip: "This frame displays content from an external URL",
                    },

                    {
                        name: "iframeElement",
                        value: "iframeElement",
                        type: "iframe",
                        label: "IFrame",
                        tooltip: "This iframe embeds external content securely",
                    },

                    {
                        name: "progressBar",
                        value: "progressBar",
                        type: "progress",
                        label: "Progress Bar",
                    },

                    {
                        name: "loadingSpinner",
                        value: "loadingSpinner",
                        type: "spinner",
                        label: "Loading Spinner",
                        tooltip: "This spinner appears while content is loading",
                    },

                    {
                        name: "batteryMeter",
                        value: "batteryMeter",
                        type: "meter",
                        label: "Battery Level",
                        tooltip: "Indicates battery level as a percentage of full charge",
                    },

                    {
                        name: "embeddedObject",
                        value: "embeddedObject",
                        type: "object",
                        label: "Embedded Content",
                        tooltip: "This object embeds external content like a PDF or multimedia",
                    },

                    {
                        name: "embeddedMedia",
                        value: "embeddedMedia",
                        type: "embed",
                        label: "Embedded Media",
                        tooltip: "This element embeds external media content, such as audio or video files.",
                    },

                    {
                        name: "hiddenToken",
                        value: "hiddenToken", // The token or hidden value
                        type: "hidden",
                        label: "Hidden Token", // Optional, for reference in code or documentation
                        tooltip: "This value is used for internal authentication and is hidden from the user",
                    },

                    {
                        name: "eventTime",
                        value: "eventTime",
                        type: "time",
                        label: "Event Time",
                        tooltip: "Displays the time when the event is scheduled",
                        datetime: "2023-03-10T15:30:00Z", // ISO 8601 format for machine-readable date/time
                        content: "3:30 PM", // Human-readable display of the time
                    },

                    {
                        name: "answerData",
                        value: "answerData",
                        type: "data",
                        label: "Answer Data",
                        tooltip: "Displays the underlying data value along with its descriptive text",
                    },

                    {
                        name: "calculationOutput",
                        value: "calculationOutput",
                        type: "output",
                        label: "Result Display",
                        tooltip: "This output element dynamically displays the computed result",
                    },
                    {
                        name: "dynamicElement",
                        value: "dynamicElement",
                        type: "div", // Can be any HTML element type (e.g., "span", "section", etc.)
                        label: "Dynamic Element",
                        tooltip: "This element's ID and classes can be updated dynamically",
                    },

                    {
                        name: "captchaImage",
                        value: "captchaImage",
                        type: "captcha",
                        label: "CAPTCHA",
                        tooltip: "This CAPTCHA image is generated by an external API. Click refresh if it's hard to read.",
                    },

                    {
                        name: "customAccessibleElement",
                        value: "customAccessibleElement",
                        type: "div",
                        label: "Custom Accessible Element",
                        tooltip: "This element includes custom data attributes and ARIA attributes for better accessibility",
                    },

                    {
                        name: "hiddenElement",
                        value: "hiddenElement",
                        type: "div",
                        label: "Hidden Element",
                        tooltip: "This element is hidden using CSS (display: none or visibility: hidden)",
                    },

                    {
                        name: "userFieldset",
                        value: "userFieldset",
                        type: "fieldset",
                        label: "User Details Group",
                        tooltip: "This container groups the input fields for user details",
                    },

                    {
                        name: "userFormLegend",
                        value: "userFormLegend",
                        type: "legend",
                        label: "Group Header: User Details",
                        tooltip: "This header describes the purpose of the user details group",
                    },
                ],
            },

            {
                name: "by",
                type: "select",
                label: "By",
                placeholder: "Select the locator Name",
                value: "",
                options: [
                    {
                        value: "id",
                        label: "ID",
                    },
                    {
                        value: "name",
                        label: "Name",
                    },
                    {
                        value: "className",
                        label: "Class Name",
                    },
                    {
                        value: "tagName",
                        label: "Tag Name",
                    },
                    {
                        value: "linkText",
                        label: "Link Text",
                    },
                    {
                        value: "partialLinkText",
                        label: "Partial LinkText",
                    },
                    {
                        value: "cssSelector",
                        label: "CSS Selctor",
                    },
                    {
                        value: "xpath",
                        label: "Xpath",
                    },
                ],
            },
            {
                name: "value",
                type: "text",
                label: "Value",
                placeholder: "Enter the value",
                value: "",
            },
        ],
        returnType: "WebElement",
    },

    findElements: {
        blockId: "",
        methodId: "",
        type: "findElements",
        classObject: "SearchContext",
        name: "findElements",
        label: "Find Elements",
        description: "It is used to locate a multiple web element on a webpage.",
        command: "findElements",
        methodSignature: "findElements(By): List<WebElement>",
        fields: [
            {
                name: "WebElement",
                value: "",
                type: "select",
                label: "List<WebElement>",
                subLabel: "",
                required: true,
                disabled: false,
                options: [
                    {
                        name: "browserWindow",
                        value: "browserWindow",
                        type: "window",
                        label: "Browser Window",
                        tooltip: "Select a browser window action",
                    },

                    {
                        name: "alertPopup",
                        value: "alertPopup",
                        type: "alert",
                        label: "Alert/Popup",
                        tooltip: "Choose an alert or popup type",
                    },

                    {
                        name: "cookies",
                        value: "cookies",
                        type: "cookie",
                        label: "Cookies",
                        tooltip: "Manage your cookie preferences",
                    },

                    {
                        name: "storage",
                        value: "storage",
                        type: "storage",
                        label: "Storage",
                        tooltip: "Choose between session and local storage",
                    },

                    {
                        name: "title",
                        value: "title",
                        type: "text",
                        label: "Title",
                        tooltip: "Provide a title for the content",
                    },

                    {
                        name: "pageSource",
                        value: "pageSource",
                        type: "text",
                        label: "Page Source",
                        tooltip: "Input the source code or URL of the page",
                    },

                    {
                        name: "currentURL",
                        value: "currentURL",
                        type: "text",
                        label: "Current URL",
                        tooltip: "Provide the current URL of the page",
                    },

                    {
                        name: "textField",
                        value: "textField",
                        type: "text",
                        label: "Text Field",
                        tooltip: "Enter plain text",
                    },
                    {
                        name: "passwordField",
                        value: "passwordField",
                        type: "password",
                        label: "Password Field",
                        tooltip: "Enter your password",
                    },
                    {
                        name: "searchInput",
                        value: "searchInput",
                        type: "search",
                        label: "Search",
                        tooltip: "Enter keywords and press enter to search",
                    },
                    {
                        name: "emailField",
                        value: "emailField",
                        type: "email",
                        label: "Email",
                        tooltip: "Enter your email address",
                    },
                    {
                        name: "numberInput",
                        value: "numberInput",
                        type: "number",
                        label: "Enter Number",
                        tooltip: "Input a valid number",
                    },
                    {
                        name: "textArea",
                        value: "textArea",
                        type: "textarea",
                        label: "Text Area",
                        tooltip: "Enter multi-line text",
                    },

                    {
                        name: "submitButton",
                        value: "submitButton",
                        type: "button",
                        label: "Custom Submit",
                        tooltip: "Click to trigger custom submission logic",
                    },

                    {
                        name: "submitButton",
                        value: "submitButton",
                        type: "submit",
                        label: "Submit Form",
                        tooltip: "Click to submit the form automatically",
                    },

                    {
                        name: "inputButton",
                        value: "Click Me",
                        type: "button",
                        label: "Input Button",
                        tooltip: "Click to perform the input action",
                    },

                    {
                        name: "link",
                        value: "Link",
                        type: "link",
                        label: "Input Link",
                        tooltip: "Click to perform the input action",
                    },

                    {
                        name: "checkbox",
                        value: "checkbox",
                        type: "checkbox",
                        label: "Checkbox",
                        tooltip: "Select the checkbox if applicable",
                    },

                    {
                        name: "radioButton",
                        value: "radioButton",
                        type: "radio",
                        label: "Radio Button",
                        tooltip: "Select one of the options",
                    },

                    {
                        name: "dropdownSelect",
                        value: "dropdownSelect",
                        type: "select",
                        label: "Dropdown",
                        tooltip: "Choose an option from the dropdown",
                    },

                    {
                        name: "fileUpload",
                        value: "fileUpload",
                        type: "file",
                        label: "File Upload",
                        tooltip: "Upload a file from your device",
                    },

                    {
                        name: "mainForm",
                        value: "mainForm",
                        type: "form",
                        label: "Main Form",
                        tooltip: "Fill out and submit the form",
                    },

                    {
                        name: "dateInput",
                        value: "dateInput",
                        type: "date",
                        label: "Select Date",
                        tooltip: "Choose a date from the calendar",
                    },

                    {
                        name: "rangeInput",
                        value: 100, // Default value, can be adjusted as needed
                        type: "range",
                        label: "Select Value",
                        tooltip: "Drag the slider to select a value",
                    },

                    {
                        name: "paragraphText",
                        value: "paragraphText",
                        type: "paragraph",
                        label: "Paragraph",
                        tooltip: "This content will be displayed as a paragraph",
                    },

                    {
                        name: "pageHeading",
                        value: "pageHeading",
                        type: "heading",
                        level: "h1", // can be 'h1', 'h2', 'h3', etc.
                        label: "Main Heading",
                        tooltip: "This heading is used for the main title of the page",
                    },

                    {
                        name: "formLabel",
                        value: "NaformLabelme:",
                        type: "label",
                        label: "Form Label",
                        tooltip: "This label identifies the associated form element",
                    },

                    {
                        name: "textSpan",
                        value: "textSpan",
                        type: "span",
                        label: "Inline Text",
                        tooltip: "This span element is used for inline text styling",
                    },

                    {
                        name: "linkAnchor",
                        value: "Click here",
                        type: "link",
                        label: "Navigation Link",
                        tooltip: "Click to visit the target page",
                        href: "https://www.example.com", // Destination URL
                        target: "_blank", // Opens link in a new tab
                    },

                    {
                        name: "mainMenu",
                        type: "menu",
                        label: "Main Menu",
                        subLabel: "Primary navigation",
                        tooltip: "Navigate through main sections",
                    },

                    {
                        name: "breadcrumbNavigation",
                        value: "breadcrumbNavigation",
                        type: "breadcrumbNavigation",
                        label: "Breadcrumb Navigation",
                    },

                    {
                        name: "dragDropContainer",
                        value: "dragDropContainer",
                        type: "dragAndDrop",
                        label: "Drag & Drop",
                    },

                    {
                        name: "volumeSlider",
                        value: 30, // Default slider value
                        type: "slider",
                        label: "Slider",
                        orientation: "horizontal", // could also be 'vertical'
                    },

                    {
                        name: "resizablePanel",
                        value: "resizablePanel",
                        type: "resizable",
                        label: "Resizable Panel",
                    },

                    {
                        name: "dataTable",
                        value: "dataTable",
                        type: "table",
                        label: "Data Table",
                    },

                    {
                        name: "tableRow1",
                        value: "tableRow1",
                        type: "tableRow",
                        label: "Table Row",
                    },

                    {
                        name: "tableCell1",
                        value: "tableCell1",
                        type: "tableCell",
                        label: "Table Cell",
                        tooltip: "This cell shows the user's name",
                    },

                    {
                        name: "tableHeader1",
                        value: "tableHeader1",
                        type: "tableHeader",
                        label: "Table Header",
                        subLabel: "Column header for Name",
                        tooltip: "This header defines the Name column",
                    },

                    {
                        name: "orderedList",
                        value: "orderedList",
                        type: "orderedList",
                        label: "Ordered List", //Steps to Follow
                    },

                    {
                        name: "unorderedList",
                        value: "unorderedList",
                        type: "unorderedList",
                        label: "Unordered List", //Features
                        tooltip: "Displays a list of features without a specific order",
                    },

                    {
                        name: "listOptions",
                        value: "listOptions",
                        type: "list",
                        label: "List Options",
                        tooltip: "This is list item ",
                    },

                    {
                        name: "imageElement",
                        value: "imageElement",
                        type: "image",
                        label: "Image Display",
                    },

                    {
                        name: "drawingCanvas",
                        value: "drawingCanvas",
                        type: "canvas",
                        label: "Drawing Canvas",
                        tooltip: "Canvas area for creating graphics",
                    },

                    {
                        name: "svgGraphic",
                        value: "svgGraphic",
                        type: "svg",
                        label: "SVG Graphic",
                        tooltip: "Displays a scalable vector graphic",
                    },

                    {
                        name: "videoPlayer",
                        value: "videoPlayer",
                        type: "video",
                        label: "Video Player",
                        tooltip: "Play the video content",
                    },

                    {
                        name: "audioPlayer",
                        value: "audioPlayer",
                        type: "audio",
                        label: "Audio Player",
                        tooltip: "Play the audio track",
                    },

                    {
                        name: "infoDialog",
                        value: "infoDialog",
                        type: "dialog",
                        label: "Information Dialog",
                        tooltip: "Click to open the information dialog",
                    },

                    {
                        name: "detailsElement",
                        value: "detailsElement",
                        type: "details",
                        label: "More Information",
                    },

                    {
                        name: "detailsSummary",
                        value: "detailsSummary",
                        type: "summary",
                        label: "View Details",
                        tooltip: "Click to reveal more details",
                    },

                    {
                        name: "mainSection",
                        value: "mainSection",
                        type: "section",
                        label: "Main Section",
                        tooltip: "This section contains the main content of the page",
                    },

                    {
                        name: "pageHeader",
                        value: "pageHeader",
                        type: "header",
                        label: "Page Header",
                        tooltip: "This is the header area of the page",
                    },

                    {
                        name: "pageFooter",
                        value: "pageFooter",
                        type: "footer",
                        label: "Page Footer",
                        tooltip: "This is the footer area of the page",
                    },

                    {
                        name: "shadowDomElement",
                        value: "shadowDomElement",
                        type: "shadowDOM",
                        label: "Shadow DOM Container",
                        tooltip: "This element uses Shadow DOM for encapsulation",
                    },

                    {
                        name: "myCustomComponent",
                        value: "myCustomComponent",
                        type: "webComponent",
                        label: "Custom Component",
                        tooltip: "This is a custom web component built with Shadow DOM",
                    },

                    {
                        name: "lazyImage",
                        value: "lazyImage",
                        type: "lazyLoad",
                        label: "Lazy Loaded Image",
                        tooltip: "This image will load once it enters the viewport",
                    },

                    {
                        name: "confirmationModal",
                        value: "confirmationModal",
                        type: "modal", // Can represent either a <dialog> or a JS modal
                        label: "Confirmation Modal",
                        tooltip: "This modal dialog is used for confirming actions",
                    },

                    {
                        name: "infoTooltip",
                        value: "infoTooltip",
                        type: "tooltip",
                        label: "Tooltip Info",
                        tooltip: "This tooltip is displayed when you hover over the target element.",
                    },

                    {
                        name: "toastMessage",
                        value: "toastMessage",
                        type: "toast",
                        label: "Notification Toast",
                        tooltip: "This toast appears to notify users of an action",
                    },

                    {
                        name: "autocompleteInput",
                        value: "autocompleteInput",
                        type: "autocomplete",
                        label: "Search with Suggestions",
                        tooltip: "Start typing to see suggestions",
                    },

                    {
                        name: "embeddedFrame",
                        value: "embeddedFrame",
                        type: "frame",
                        label: "Frame",
                        tooltip: "This frame displays content from an external URL",
                    },

                    {
                        name: "iframeElement",
                        value: "iframeElement",
                        type: "iframe",
                        label: "IFrame",
                        tooltip: "This iframe embeds external content securely",
                    },

                    {
                        name: "progressBar",
                        value: "progressBar",
                        type: "progress",
                        label: "Progress Bar",
                    },

                    {
                        name: "loadingSpinner",
                        value: "loadingSpinner",
                        type: "spinner",
                        label: "Loading Spinner",
                        tooltip: "This spinner appears while content is loading",
                    },

                    {
                        name: "batteryMeter",
                        value: "batteryMeter",
                        type: "meter",
                        label: "Battery Level",
                        tooltip: "Indicates battery level as a percentage of full charge",
                    },

                    {
                        name: "embeddedObject",
                        value: "embeddedObject",
                        type: "object",
                        label: "Embedded Content",
                        tooltip: "This object embeds external content like a PDF or multimedia",
                    },

                    {
                        name: "embeddedMedia",
                        value: "embeddedMedia",
                        type: "embed",
                        label: "Embedded Media",
                        tooltip: "This element embeds external media content, such as audio or video files.",
                    },

                    {
                        name: "hiddenToken",
                        value: "hiddenToken", // The token or hidden value
                        type: "hidden",
                        label: "Hidden Token", // Optional, for reference in code or documentation
                        tooltip: "This value is used for internal authentication and is hidden from the user",
                    },

                    {
                        name: "eventTime",
                        value: "eventTime",
                        type: "time",
                        label: "Event Time",
                        tooltip: "Displays the time when the event is scheduled",
                        datetime: "2023-03-10T15:30:00Z", // ISO 8601 format for machine-readable date/time
                        content: "3:30 PM", // Human-readable display of the time
                    },

                    {
                        name: "answerData",
                        value: "answerData",
                        type: "data",
                        label: "Answer Data",
                        tooltip: "Displays the underlying data value along with its descriptive text",
                    },

                    {
                        name: "calculationOutput",
                        value: "calculationOutput",
                        type: "output",
                        label: "Result Display",
                        tooltip: "This output element dynamically displays the computed result",
                    },
                    {
                        name: "dynamicElement",
                        value: "dynamicElement",
                        type: "div", // Can be any HTML element type (e.g., "span", "section", etc.)
                        label: "Dynamic Element",
                        tooltip: "This element's ID and classes can be updated dynamically",
                    },

                    {
                        name: "captchaImage",
                        value: "captchaImage",
                        type: "captcha",
                        label: "CAPTCHA",
                        tooltip: "This CAPTCHA image is generated by an external API. Click refresh if it's hard to read.",
                    },

                    {
                        name: "customAccessibleElement",
                        value: "customAccessibleElement",
                        type: "div",
                        label: "Custom Accessible Element",
                        tooltip: "This element includes custom data attributes and ARIA attributes for better accessibility",
                    },

                    {
                        name: "hiddenElement",
                        value: "hiddenElement",
                        type: "div",
                        label: "Hidden Element",
                        tooltip: "This element is hidden using CSS (display: none or visibility: hidden)",
                    },

                    {
                        name: "userFieldset",
                        value: "userFieldset",
                        type: "fieldset",
                        label: "User Details Group",
                        tooltip: "This container groups the input fields for user details",
                    },

                    {
                        name: "userFormLegend",
                        value: "userFormLegend",
                        type: "legend",
                        label: "Group Header: User Details",
                        tooltip: "This header describes the purpose of the user details group",
                    },
                ],
            },

            {
                name: "by",
                type: "select",
                label: "By",
                placeholder: "Select the locator Name",
                value: "",
                options: [
                    {
                        value: "id",
                        label: "ID",
                    },
                    {
                        value: "name",
                        label: "Name",
                    },
                    {
                        value: "className",
                        label: "Class Name",
                    },
                    {
                        value: "tagName",
                        label: "Tag Name",
                    },
                    {
                        value: "linkText",
                        label: "Link Text",
                    },
                    {
                        value: "partialLinkText",
                        label: "Partial LinkText",
                    },
                    {
                        value: "cssSelector",
                        label: "CSS Selctor",
                    },
                    {
                        value: "xpath",
                        label: "Xpath",
                    },
                ],
            },
            {
                name: "value",
                type: "text",
                label: "Value",
                placeholder: "Enter the value",
                value: "",
            },
        ],
        returnType: "	List<WebElement>",
    },
};
