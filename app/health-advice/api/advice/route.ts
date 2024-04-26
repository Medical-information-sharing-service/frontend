import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw Error("You are now allowed . . .");
}

const openai = new OpenAI({ apiKey });

export async function POST(req: Request) {
  const { mode, body, prompt } = await req.json();

  let info: string[] = [];
  body?.forEach((el: string, idx: number) => info.push(`${idx + 1}: ` + el));

  const content =
    mode === 0
      ? `Please give me some general advice about my health based on the following information: ${
          body ? body : "<No additional information>"
        }`
      : prompt;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who helps people get information about their health.",
        },
        {
          role: "user",
          content,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      // max_tokens: 320,
    });

    const response = completion.choices[0].message.content;
    return Response.json({ response }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Error occured while requesting a response from AI . . ." },
      { status: 500 }
    );
  }
}
