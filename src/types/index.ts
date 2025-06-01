// src/types/index.ts

export interface Essay {
    id: number;
    title: string;
    type: string;
    words: number;
    progress: number;
    status: string;
    lastEdited: string;
  }
  
  export interface Template {
    id: number;
    title: string;
    desc: string;
  }
  
  export interface Prompt {
    id: number;
    title: string;
    desc: string;
  }
  
  export interface LLMProvider {
    [company: string]: string[];
  }