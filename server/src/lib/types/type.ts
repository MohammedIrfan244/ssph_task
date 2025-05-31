import { Request } from "express"

export interface authenticatedRequest extends Request {
  user?: string
}