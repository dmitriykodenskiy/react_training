### The situation where the user creates a new note on page https://studies.cs.helsinki.fi/exampleapp/notes when writing something into the text field and clicking the submit button.

```mermaid
  sequenceDiagram
        browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

        Note over server: notes are updated on server

        server-->>browser: Redirect 302 to https://studies.cs.helsinki.fi/exampleapp/notes
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
        server-->>browser: page reload
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
        browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
        server-->>browser: main.css
        server-->>browser: main.js
        server-->>browser: data.json
```

### The situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
  sequenceDiagram
        browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

        Note over browser: notes list is updated <br> and rerendered
        Note over server: notes are updated on server

```