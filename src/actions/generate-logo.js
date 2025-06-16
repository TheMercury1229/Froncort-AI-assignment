"use server";

import { iconOptions } from "@/data";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAIClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function generateLogo(logoObject) {
  const {
    companyName,
    description,
    fontStyle,
    layoutType,
    logoShape,
    primaryColor,
    selectedIcon,
  } = logoObject;
  // Validate required fields
  if (!companyName?.trim()) {
    throw new Error("Company name is required");
  }

  if (!description?.trim()) {
    throw new Error("Description is required");
  }
  const iconSvg = iconOptions.find((icon) => icon.value === selectedIcon)?.svg;
  const SYSTEM_PROMPT = `You are a creative SVG logo generator. Create a professional, clean SVG logo based on the specifications below.

IMPORTANT: Return ONLY the SVG code. No explanations, no markdown, no code blocks, just the raw SVG.
Use this icon SVG within the logo: ${iconSvg}.

Specifications:
- Company Name: "${companyName}"
- Description: "${description || "Modern business"}"
 
- Font family: "${fontStyle || "Arial, sans-serif"}"
- Layout: "${layoutType || "icon-left"}" (position icon relative to text)
- Shape: "${logoShape || "none"}" (overall logo shape)
- Primary color: "${primaryColor}"

Requirements:
- SVG viewBox: "0 0 400 200" (400px wide, 200px tall)
- Use flat design with clean lines
- Ensure text is readable and properly sized
- Position elements according to layout type
- Use the primary color as the main color
- Include proper spacing and alignment
- Make it professional and business-appropriate
- No gradients, shadows, or complex effects
- Ensure proper contrast for readability
- Always include width and height attributes inside the <svg> tag.

Output format: Return only the complete SVG element starting with <svg and ending with </svg>.`;

  try {
    const model = genAIClient.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(SYSTEM_PROMPT);
    const response = await result.response;
    let svg = response.text().trim();

    svg = svg
      .replace(/```svg\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    if (!svg.startsWith("<svg")) {
      console.error("Invalid SVG response:", svg);

      const svgMatch = svg.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
      if (svgMatch) {
        svg = svgMatch[0];
      } else {
        throw new Error("No valid SVG found in response");
      }
    }

    // Additional validation - check if SVG ends properly
    if (!svg.endsWith("</svg>")) {
      throw new Error("Incomplete SVG generated");
    }

    // Basic SVG structure validation
    if (!svg.includes("viewBox")) {
      console.warn("SVG missing viewBox attribute");
    }
    console.log("Generated SVG:", svg);
    return svg;
  } catch (error) {
    console.error("Error generating logo:", error);

    // Return a fallback SVG instead of throwing
    const fallbackSVG = `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="${primaryColor}" rx="8" opacity="0.1"/>
  <rect x="20" y="20" width="60" height="60" fill="${primaryColor}" rx="8"/>
  <text x="100" y="45" font-family="${
    fontStyle || "Arial, sans-serif"
  }" font-size="24" font-weight="bold" fill="${primaryColor}">
    ${companyName}
  </text>
  <text x="100" y="65" font-family="${
    fontStyle || "Arial, sans-serif"
  }" font-size="14" fill="${primaryColor}" opacity="0.7">
    ${description || "Professional Services"}
  </text>
</svg>`;

    console.log("Using fallback SVG due to error:", error.message);
    return fallbackSVG;
  }
}
