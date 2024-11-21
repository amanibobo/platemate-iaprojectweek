import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
         text: "Generate a concise and detailed recipe for a possible meal using the following ingredients: [ingredients]. The recipe should include:\n\nYield: Number of servings.\n\nPrep time: Time to prepare ingredients.\n\nCook time: Time to cook the dish.\n\nIngredients: A bulleted list of ingredients with quantities specified (use standard measurements).\n\nInstructions: Clear, step-by-step instructions.",

        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "## Apple Crumble (Single Serving)\n\n**Yields:** 1 serving\n**Prep time:** 5 minutes\n**Cook time:** 15-20 minutes\n\n\n**Ingredients:**\n\n* 1 medium apple (e.g., Granny Smith, Honeycrisp), peeled, cored, and diced\n* 1 tablespoon rolled oats\n* 1 tablespoon brown sugar\n* ½ teaspoon cinnamon\n* 1 tablespoon flour (all-purpose or oat)\n* 1 tablespoon butter, cold and cut into small pieces\n\n\n**Instructions:**\n\n1. **Preheat oven to 375°F (190°C).** Lightly grease a small oven-safe dish (ramekin or small bowl).\n2. **Combine filling:** In the prepared dish, toss the diced apple with brown sugar and cinnamon.\n3. **Make the crumble topping:** In a small bowl, combine oats, flour, and cold butter. Use your fingers to rub the butter into the dry ingredients until it resembles coarse crumbs.\n4. **Assemble:** Sprinkle the crumble topping evenly over the apple filling.\n5. **Bake:** Bake for 15-20 minutes, or until the topping is golden brown and the apples are tender.\n6. **Serve:** Let cool slightly before enjoying.  Optional: serve with a dollop of Greek yogurt or a scoop of vanilla ice cream.\n",
        },
      ],
    },
  ],
});
