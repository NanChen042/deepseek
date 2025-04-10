export type ImageSize = 'square' | 'portrait' | 'landscape' | 'wide'

export interface GeneratedImage {
  url: string
  id: string
  favorite?: boolean
}

export interface ImageGenerationParams {
  prompt: string
  negative_prompt?: string
  image_size: ImageSize
  batch_size: number
  guidance_scale: number
  num_inference_steps: number
  seed?: number
  image?: string
}
