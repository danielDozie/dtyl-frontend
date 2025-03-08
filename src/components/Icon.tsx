import { IconType } from 'react-icons'
import * as LucideIcons from 'lucide-react'
import * as Ai from 'react-icons/ai' // Ant Design icons
import * as Bs from 'react-icons/bs' // Bootstrap icons
import * as Fa from 'react-icons/fa' // Font Awesome icons 
import * as Fa6 from 'react-icons/fa6' // Font Awesome 6 icons
import * as Fi from 'react-icons/fi' // Feather icons
import * as Gi from 'react-icons/gi' // Game icons
import * as Go from 'react-icons/go' // Github Octicons icons
import * as Gr from 'react-icons/gr' // Grommet icons
import * as Hi from 'react-icons/hi' // Heroicons
import * as Hi2 from 'react-icons/hi2' // Heroicons 2
import * as Im from 'react-icons/im' // IcoMoon icons
import * as Io from 'react-icons/io' // Ionicons 4
import * as Io5 from 'react-icons/io5' // Ionicons 5
import * as Md from 'react-icons/md' // Material Design icons
import * as Ri from 'react-icons/ri' // Remix icons
import * as Si from 'react-icons/si' // Simple Icons
import * as Ti from 'react-icons/ti' // Typicons
import * as Vsc from 'react-icons/vsc' // VS Code icons
import * as Wi from 'react-icons/wi' // Weather icons
import * as Ci from 'react-icons/ci' // Circum icons
import * as Tb from 'react-icons/tb' // Tabler icons

interface IconProps {
  name: string;
  className?: string;
}

const IconComponent = ({ name, className }: IconProps) => {
  try {
    // Check in Lucide icons first
    const LucideIcon = (LucideIcons as any)[name]
    if (LucideIcon) {
      return <LucideIcon className={className} />
    }

    // Map of icon libraries
    const iconLibraries: { [key: string]: any } = {
      Ai,
      Bs,
      Ci,
      Fa,
      Fa6,
      Fi,
      Gi,
      Go,
      Gr,
      Hi,
      Hi2,
      Im,
      Io,
      Io5,
      Md,
      Ri,
      Si,
      Ti,
      Vsc,
      Wi,
      Tb // Added Tabler icons
    }

    // Try to find the icon directly in the corresponding library
    for (const [prefix, library] of Object.entries(iconLibraries)) {
      if (name.startsWith(prefix) && library[name]) {
        const IconComponent = library[name]
        return <IconComponent className={className} />
      }
    }

    return null
  } catch (error) {
    console.error(`Error loading icon: ${name}`, error)
    return null
  }
}

export default IconComponent;