Lab layout can be used to set a default layout in which the lab boots. We currently support the following layout types:

#### Terminal + IDE + Browser

This would include everything codedamn has to offer - a terminal at the bottom, an IDE in center (powered by Monaco on desktops, and CodeMirror on mobile phones), and a browser preview of (ideally) what user is working on. This is best if your playground runs a HTTP server.

#### Terminal + Browser

This layout is for times when you don't need IDE in place, and only want something hosted inside a browser - like a XSS challenge.

#### Terminal + IDE

This layout is for backend programming without website UI. This would only include a terminal and an IDE - like VS Code. For example - headless E2E testing, writing Python scripts, discord bots, etc.

#### Terminal only

This would not include anything, except for a terminal. Best for Linux/bash labs where you want users to exclusively work with terminals only.

:::tip
You can configure the layout through `.cdmrc` file too. More information [here](/docs/concepts/cdmrc#playground-view)
:::
