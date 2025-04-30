import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

async function getMetronData(endpoint: string) {
  const username = process.env.M_USERNAME;
  const password = process.env.M_PASSWORD;
  const base64Credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { results } = await response.json();

    return results;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const server = new McpServer({
  name: "Comic",
  version: "1.0.0",
});

server.tool(
  "comics_week",
  "Get a list of new comics that are available on a given Wednesday",
  { week: z.string().date() },
  async ({ week }) => {
    const endpoint = `https://metron.cloud/api/issue/?store_date=${week}`;
    const comics = await getMetronData(endpoint);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(comics),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
