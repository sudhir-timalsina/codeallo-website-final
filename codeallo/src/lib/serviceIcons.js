import { Globe, Smartphone, ServerCog, GraduationCap, Compass, Code2, PenTool, Workflow, Sparkles } from 'lucide-react'

// Services reference icons by name (see src/data/services.js). Importing
// each icon explicitly, rather than `import * as Icons from 'lucide-react'`,
// keeps the rest of the library out of the production bundle.
export const serviceIconMap = {
  Globe,
  Smartphone,
  ServerCog,
  GraduationCap,
  Compass,
  Code2,
  PenTool,
  Workflow,
}

export const getServiceIcon = (name) => serviceIconMap[name] || Sparkles
