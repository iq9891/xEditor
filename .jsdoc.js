module.exports = {
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc"]
  },
  "opts": {
    "destination": "./",
    "encoding": "utf8",
    "private": true,
    "recurse": true,
    "template": "./node_modules/minami"
  },
  "source": {
    "include": ["src", "package.json", "README.md"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    },
    "path": "ink-docstrap",
    "theme": "cerulean",
    "navType": "vertical",
    "linenums": true,
    "dateFormat": "MMMM Do YYYY, h:mm:ss a"
  }
}
