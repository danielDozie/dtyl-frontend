'use client'
import { Download, SquareX } from "lucide-react"
import { Text } from "./ui/text"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import PdfIcon from "./ui/icons/pdfIcon"
import RetroGrid from "./ui/retro-grid"
import AppButton from "./ui/app-button"
import { DialogTitle } from "@radix-ui/react-dialog"

interface ResearchItem {
  title: string;
  description: string;
  downloadUrl: string;
}

export function ResearchComponent({ researchItems }: { researchItems: ResearchItem[] }) {
  return (
    <div className='flex w-full'>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-none">
        <div className="grid md:grid-cols-4 gap-8 py-20 md:pt-12">
          {researchItems.map((item, idx) => (
            <Drawer key={idx} modal={false}>
              <DrawerTrigger asChild>
                <button>
                  <PdfIconWithText size={120} text={item.title} />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DialogTitle className="hidden items-center py-2 justify-center">{item.title}</DialogTitle>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerClose asChild className="absolute right-10">
                    <button className="text-white bg-red-500 hover:bg-red-700 text-sm font-bold py-2 px-4 rounded">
                      <SquareX className="text-foreground"/>
                    </button>
                  </DrawerClose>
                  <div className="my-12 uppercase text-center">
                    <Text className="text-red">Download</Text>
                    <Text size={'xl'} className="font-semibold">
                      {item.title}
                    </Text>
                  </div>
                  <label htmlFor="name" className="font-light text-sm mb-2 block">
                    Full name
                  </label>
                  <input
                    id="name"
                    className="border border-gray-200 w-full px-3 h-9 outline-none focus:ring-2 focus:ring-black/5"
                  />
                  <label htmlFor="email" className="font-light text-sm mt-4 mb-2 block">
                    Email address
                  </label>
                  <input
                    id="email"
                    className="border border-gray-200 w-full px-3 h-9 outline-none focus:ring-2 focus:ring-black/5"
                    type="email"
                  />
                  <label htmlFor="profession" className="font-light text-sm mt-4 mb-2 block">
                    Identify as
                  </label>
                  <select
                    id="profession"
                    className="border border-gray-200 w-full px-3 h-9 outline-none focus:ring-2 focus:ring-black/5"
                  >
                    <option value="">Select Profession</option>
                    <option value="architect">Architect</option>
                    <option value="accountant">Accountant</option>
                    <option value="business_analyst">Business Analyst</option>
                    <option value="hr_manager">Hr Manager</option>
                    <option value="investment_banker">Investment Banker</option>
                    <option value="engineer">Engineer</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="data_scientist">Data Scientist</option>
                    <option value="marketing_specialist">Marketing Specialist</option>
                  </select>

                  <DrawerFooter>
                    <div className="w-full flex justify-center pt-6 pb-12">
                      <AppButton title="Confirm & Download" icon={Download} />
                    </div>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
        {/* <RetroGrid /> */}
      </div>
    </div>
  )
}

interface PdfIconWithTextProps {
  size: number;
  text: string;
  disabled?: boolean;
}

const PdfIconWithText: React.FC<PdfIconWithTextProps> = ({ size, text, disabled }) => {
  return (
    <div className={`flex flex-col items-center space-y-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <PdfIcon size={size} />
      <Text size={'sm'}>{text}</Text>
      <Text className="text-xs line-clamp-3">This research document explores key insights and findings related to {text}. Fill in your details below to access the full document. Your information will be handled securely and confidentially.</Text>
    </div>
  )
}
