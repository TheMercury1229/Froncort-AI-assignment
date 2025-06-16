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
  console.log("Selected icon SVG:", iconSvg);
  const SYSTEM_PROMPT = `Create a professional SVG business logo with these exact specs:

COMPANY: "${companyName}"
BUSINESS: "${description}"
COLOR: ${primaryColor}
LAYOUT: ${layoutType}
FONT: ${fontStyle || "Inter, sans-serif"}

CANVAS: <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">

DESIGN RULES:
1. Company name in bold, size 32px, primary color
2. ${
    layoutType === "icon-left"
      ? "Icon left (x:30), text right (x:120)"
      : layoutType === "icon-top"
      ? "Icon top (y:40), text bottom (y:140)"
      : layoutType === "icon-right"
      ? "Text left (x:30), icon right (x:320)"
      : "Center both horizontally"
  }
3. ${
    iconSvg ? `Use this icon: ${iconSvg}` : "Create simple geometric icon 50px"
  }
4. Clean, modern, professional appearance
5. High contrast, readable text
6. Balanced spacing and alignment

Return ONLY the SVG code - no explanations or formatting.`;

  try {
    const model = genAIClient.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(SYSTEM_PROMPT);
    const response = await result.response;
    let svg = response.text().trim();
    console.log("Generated SVG response:", svg);

    // Enhanced SVG extraction to handle multiple code block formats
    svg = svg
      .replace(/```(?:svg|xml)\n?/gi, "") // Handle both ```svg and ```xml
      .replace(/```\n?/g, "") // Remove any remaining code blocks
      .trim();

    // Try to extract SVG if it's still wrapped in other content
    if (!svg.startsWith("<svg")) {
      console.log("SVG doesn't start with <svg, attempting to extract...");

      // Try to find SVG content within the response
      const svgMatch = svg.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
      if (svgMatch) {
        svg = svgMatch[0];
        console.log("Extracted SVG from response");
      } else {
        console.error("No valid SVG found in response:", svg);
        throw new Error("No valid SVG found in response");
      }
    }

    // Additional validation - check if SVG ends properly
    if (!svg.endsWith("</svg>")) {
      console.error("Incomplete SVG generated:", svg);
      throw new Error("Incomplete SVG generated");
    }

    // Basic SVG structure validation
    if (!svg.includes("viewBox")) {
      console.warn("SVG missing viewBox attribute");
    }

    // Clean up any extra whitespace and ensure proper formatting
    svg = svg.replace(/\s+/g, " ").trim();

    console.log("Final cleaned SVG:", svg);
    return svg;
  } catch (error) {
    console.error("Error generating logo:", error);

    // Return a fallback SVG instead of throwing
    const fallbackSVG = `<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
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
