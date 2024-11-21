import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="w-16 h-16 mb-6">
                <Image 
                    src="/platemate.png" 
                    alt="PlateMate Logo" 
                    width={64} 
                    height={64}
                />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-center">Welcome to PlateMate</h1>
            <p className="text-gray-600 text-center mb-8 max-w-xs">
                Turn your fridge leftovers into delicious meals with AI-powered recipe generation.
            </p>
            <Link href={"/aichat"}>
            <Button className="bg-[#388E3C] hover:bg-green-600 text-white px-20 py-2 rounded-sm">
                Get Started
            </Button>
            </Link>
        </div>
    )
}
