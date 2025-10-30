import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { HfInference } from '@huggingface/inference'

export type AIProvider = 'groq' | 'gemini' | 'huggingface'

export interface AIServiceConfig {
  provider: AIProvider
  model?: string
}

export class AIService {
  private groqClient?: Groq
  private geminiClient?: GoogleGenerativeAI
  private hfClient?: HfInference

  constructor() {
    if (process.env.GROQ_API_KEY) {
      this.groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY })
    }
    
    if (process.env.GEMINI_API_KEY) {
      this.geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    }
    
    if (process.env.HF_API_KEY) {
      this.hfClient = new HfInference(process.env.HF_API_KEY)
    }
  }

  async generateText(prompt: string, config: AIServiceConfig = { provider: 'groq' }): Promise<string> {
    try {
      switch (config.provider) {
        case 'groq':
          return await this.generateWithGroq(prompt, config.model)
        case 'gemini':
          return await this.generateWithGemini(prompt, config.model)
        case 'huggingface':
          return await this.generateWithHuggingFace(prompt, config.model)
        default:
          throw new Error(`Unsupported provider: ${config.provider}`)
      }
    } catch (error) {
      console.error(`Error with ${config.provider}:`, error)
      return this.fallbackGenerate(prompt, config)
    }
  }

  private async generateWithGroq(prompt: string, model = 'llama-3.3-70b-versatile'): Promise<string> {
    if (!this.groqClient) throw new Error('Groq client not initialized')
    
    const completion = await this.groqClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model,
      temperature: 0.7,
      max_tokens: 1024,
    })

    return completion.choices[0]?.message?.content || ''
  }

  private async generateWithGemini(prompt: string, model = 'gemini-pro'): Promise<string> {
    if (!this.geminiClient) throw new Error('Gemini client not initialized')
    
    const genModel = this.geminiClient.getGenerativeModel({ model })
    const result = await genModel.generateContent(prompt)
    const response = await result.response
    return response.text()
  }

  private async generateWithHuggingFace(prompt: string, model = 'mistralai/Mistral-7B-Instruct-v0.2'): Promise<string> {
    if (!this.hfClient) throw new Error('HuggingFace client not initialized')
    
    const response = await this.hfClient.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.7,
      }
    })

    return response.generated_text
  }

  private async fallbackGenerate(prompt: string, config: AIServiceConfig): Promise<string> {
    const providers: AIProvider[] = ['groq', 'gemini', 'huggingface']
    const remainingProviders = providers.filter(p => p !== config.provider)

    for (const provider of remainingProviders) {
      try {
        console.log(`Falling back to ${provider}...`)
        return await this.generateText(prompt, { provider })
      } catch (error) {
        console.error(`Fallback to ${provider} failed:`, error)
        continue
      }
    }

    throw new Error('All AI providers failed')
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.hfClient) throw new Error('HuggingFace client not initialized for image generation')

    try {
      const blob = await this.hfClient.textToImage({
        model: 'stabilityai/stable-diffusion-2-1',
        inputs: prompt,
      })

      const url = URL.createObjectURL(blob)
      return url
    } catch (error) {
      console.error('Image generation failed:', error)
      throw error
    }
  }
}

export const aiService = new AIService()
