# mcp-metron-comics

To install dependencies:

```bash
bun install
```

To locally develop with Claude desktop, get a username and password from [metron.cloud](https://metron.cloud)

In your `claude_desktop_config.json`

```
 "comics": {
      "command": "/Users/<YOUR BUN LOCATION from which bun>/bun",
      "args": ["--directory", "/Users/<YOUR FOLDER>/mcp-metron-comics", "run", "index.ts"],
      "env": {
        "M_USERNAME": <YOUR METRON USERNAME>,
        "M_PASSWORD": <YOUR METRON PASSWORD>
      }
    }

```
