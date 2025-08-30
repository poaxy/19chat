import { useMemo } from "react";
import { useAccessStore, useAppConfig } from "../store";
import { collectModelsWithDefaultModel } from "./model";

// Define the allowed models for the user
// Updated: 2024-12-19 - Model restriction implemented
const ALLOWED_MODELS = [
  // OpenAI models
  "gpt-5",
  "gpt-4",
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-0125",

  // Google models
  "gemini-2.5-pro",

  // Anthropic models
  "claude-3-7-sonnet-20250219",
  "claude-3-7-sonnet-latest",
  "claude-sonnet-4-20250514",

  // XAI models
  "grok-3",
  "grok-3-latest",
];

export function useAllModels() {
  const accessStore = useAccessStore();
  const configStore = useAppConfig();
  const models = useMemo(() => {
    const allModels = collectModelsWithDefaultModel(
      configStore.models,
      [configStore.customModels, accessStore.customModels].join(","),
      accessStore.defaultModel,
    );

    // Filter to only include allowed models
    return allModels.filter(
      (model) => ALLOWED_MODELS.includes(model.name) && model.available,
    );
  }, [
    accessStore.customModels,
    accessStore.defaultModel,
    configStore.customModels,
    configStore.models,
  ]);

  return models;
}
