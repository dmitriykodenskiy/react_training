```mermaid
  sequenceDiagram
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
        server-->>browser: HTML-code
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        server-->>browser: main.css
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        server-->>browser: main.js

        Note over browser: browser starts <br> executing js-code that requests <br> JSON data from server 
```