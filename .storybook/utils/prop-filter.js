const whitelistedLibs = [
  /@mui/
]

const NODE_MODULES_REGEX = /node_modules/;

const blacklistedProps = [
  "className",
  "classes",
  "key",
  "style",
  "ref"
]

const blacklistedParents = [
  "DOMAttributes", "HTMLAttributes", "AriaAttributes"
]

/**
*  Method for validating props that can be extracted from external libraries
*
*  Whitelisted props:
*  - From whitelisted libraries (ex. @mui/*)
*
*  Blacklisted props:
*  - From node_modules
*  - From blacklistedProps array
*  - default HTML attributes (DOMAttributes, HTMLAttributes, AriaAttributes)
*  @param {import("react-docgen-typescript").PropItem} prop - PropItem from "react-docgen-typescript" options
*/
module.exports = function propFilter(prop) {

  /* Less expensive validation first */
  const isInvalidProp = blacklistedProps.some(blacklistProp => blacklistProp === prop.name);

  if(isInvalidProp) return false;

  if(prop.parent) {
    const isFromValidLib = whitelistedLibs.some(lib => lib.test(prop.parent.fileName)) || !NODE_MODULES_REGEX.test(prop.parent.fileName);

    if(!isFromValidLib) return false;

    const isFromValidParent = !blacklistedParents.some(parent => parent === prop.parent.name);

    if(!isFromValidParent) return false;
  }

  return true;
}



