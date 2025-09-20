import { useEffect } from "react";

export const useLogger = (componentName) => {
  return (level, scope, context, message) => {
    if (!import.meta.env.DEV) return;
    console.log(`[${level.toUpperCase()}] [${componentName}] [${scope}] [${context}] ${message}`);
  };
};
