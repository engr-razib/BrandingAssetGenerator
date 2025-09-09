// Implemented Gemini API service to resolve placeholder file errors.
import { GoogleGenAI } from "@google/genai";
import type { FormData } from '../types';
import { GeneratorType } from '../types';

// Per instructions, API key must be from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

function constructPrompt(formData: FormData, generatorType: GeneratorType, size: string): string {
    const { logoText, copyTitle, copyText, features, description, buttonText } = formData;
    
    let prompt = `Generate a high-resolution, professional branding asset for a brand described as: "${description}". The target size is approximately ${size}. The asset must be visually appealing, modern, and follow best design practices.`;

    switch (generatorType) {
        case GeneratorType.Logo:
            prompt += ` This asset is a logo. The logo must feature the brand name "${logoText}".`;
            prompt += ` Design a clean, memorable, and scalable logo. Avoid clutter. A transparent background is preferred unless a solid color background is essential for the design.`;
            break;
        case GeneratorType.Banner:
        case GeneratorType.SocialPoster:
            prompt += ` This asset is a ${generatorType === GeneratorType.Banner ? 'website banner' : 'social media post'}.`;
            if (copyTitle) prompt += ` It must include the main headline text: "${copyTitle}".`;
            if (copyText) prompt += ` It should also include the secondary slogan text: "${copyText}".`;
            if (features) prompt += ` Key features to highlight visually or with text are: ${features}.`;
            if (buttonText) prompt += ` There must be a clear call-to-action (CTA) button with the text: "${buttonText}".`;
            prompt += " Ensure all text is legible and well-placed. The design should have a strong visual hierarchy that guides the viewer's attention to the headline and then the CTA. Use colors and imagery that align with the brand description.";
            break;
    }

    return prompt;
}

export async function generateImage(formData: FormData, generatorType: GeneratorType, sizeLabel: string): Promise<string> {
    const prompt = constructPrompt(formData, generatorType, sizeLabel);
    
    const sizeParts = sizeLabel.match(/(\d+)\s*[×x]\s*(\d+)/);
    let aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1";

    if (sizeParts) {
        const width = parseInt(sizeParts[1], 10);
        const height = parseInt(sizeParts[2], 10);
        if (height > 0) {
            const ratio = width / height;

            const supportedRatios: Record<typeof aspectRatio, number> = {
                "1:1": 1, "16:9": 16/9, "9:16": 9/16, "4:3": 4/3, "3:4": 3/4,
            };
            
            let closestRatioKey = "1:1" as keyof typeof supportedRatios;
            let minDiff = Math.abs(ratio - supportedRatios[closestRatioKey]);

            for (const r of Object.keys(supportedRatios) as (keyof typeof supportedRatios)[]) {
                const diff = Math.abs(ratio - supportedRatios[r]);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestRatioKey = r;
                }
            }
            aspectRatio = closestRatioKey;
        }
    }

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: aspectRatio,
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("API returned no images.");
        }

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
}
