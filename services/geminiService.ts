
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { FormState } from '../types';

const holdingVariations: string[] = [
  "holding the product in one hand, close to their chest, looking at the camera with a confident smile.",
  "presenting the product forward with one hand, as if showing it off.",
  "holding the product with both hands in front of them at chest level, with a look of satisfaction.",
  "holding the product casually at their side with one hand, looking relaxed and happy.",
  "with the product resting on a nearby table or counter, one hand gently placed on it.",
  "holding the product near their face with a joyful smile, highlighting both person and product.",
  "cradling the product in both hands, as if showing great care and appreciation for it.",
];

export const generateTestimonialImages = async (
  formState: FormState,
  productImageBase64: string,
  mimeType: string
): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const imagePart = {
    inlineData: {
      data: productImageBase64,
      mimeType: mimeType,
    },
  };

  const generationPromises = holdingVariations.map(variation => {
    const textPrompt = `
      Generate a photorealistic image of a ${formState.age}-year-old ${formState.gender} for a product testimonial.

      **Action:** The person should be ${variation}
      The product is the one in the provided image. It is CRITICAL that the product's design, shape, label, and all details remain completely unchanged and perfectly accurate. Do not alter the product in any way.

      **Scene:** The background should be a realistic ${formState.scene}.

      **Style:** The image must look like it was taken with a Hasselblad X2D 100C Medium Format Mirrorless Camera, using professional lighting to create sharp details and a cinematic quality. The person should look natural, confident, and genuinely happy with the product.
    `;

    const textPart = {
      text: textPrompt,
    };

    return ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
  });

  try {
    const responses = await Promise.all(generationPromises);
    const imageUrls: string[] = [];

    responses.forEach(response => {
      const imagePart = response.candidates?.[0]?.content?.parts.find(
        (part: Part) => part.inlineData
      );
      if (imagePart && imagePart.inlineData) {
        const base64Image = imagePart.inlineData.data;
        const imageMimeType = imagePart.inlineData.mimeType;
        imageUrls.push(`data:${imageMimeType};base64,${base64Image}`);
      }
    });

    if (imageUrls.length === 0) {
      throw new Error("The AI failed to generate images. Please try again with a different prompt or product image.");
    }

    return imageUrls;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate images due to an API error. Check the console for details.");
  }
};
