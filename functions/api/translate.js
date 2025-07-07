const worker = {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const url = new URL(request.url);

    // Handle GET requests to root - show API status
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(
        JSON.stringify({
          message: "Language Translator API is running!",
          usage:
            "Send POST requests to /api/translate with JSON body: {text: 'Hello', language: 'Spanish'}",
          status: "online",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Only handle POST requests to /api/translate
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method Not Allowed",
          message: "Use POST method to /api/translate",
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (url.pathname !== "/api/translate") {
      return new Response(
        JSON.stringify({
          error: "Not Found",
          message: "Use endpoint /api/translate",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    try {
      const { text, language } = await request.json();

      if (!text || !language) {
        return new Response(
          JSON.stringify({ error: "Text and language are required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      const messages = [
        { role: "system", content: "You are a helpful language translator." },
        {
          role: "user",
          content: `Translate the following text into ${language}: "${text}"`,
        },
      ];

      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
          }),
        }
      );

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        throw new Error(errorData.error?.message || "OpenAI API error");
      }

      const data = await openaiResponse.json();
      const translated = data.choices[0].message.content;

      return new Response(JSON.stringify({ translated }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Translation error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};

export default worker;
