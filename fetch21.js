
(async () => {
  try {
    const res = await fetch("https://21st.dev/api/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "21st_sk_76c3c2ef310e675405fe0c4de75af773dbd244231848201d99ebc0f5c22a6047"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/call",
        params: {
          name: "get_component",
          arguments: { id: 2437 }
        },
        id: 1
      })
    });
    const data = await res.text();
    require('fs').writeFileSync('stagger.json', data);
    console.log("Saved to stagger.json");
  } catch (e) {
    console.error(e);
  }
})();
