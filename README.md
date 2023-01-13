# The situation where the user creates a new note on page https://studies.cs.helsinki.fi/exampleapp/notes when writing something into the text field and clicking the submit button.

```mermaid
  sequenceDiagram
        browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
        server-->>server: Redirect 302
        server-->>browser: HTML-code
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        server-->>browser: main.css
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        server-->>browser: main.js

        Note over browser: browser starts <br> executing js-code that requests <br> JSON data from server 
```