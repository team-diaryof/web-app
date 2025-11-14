import { BookOpen, Facebook, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Join
            <span className='text-primary'> DiaryOf </span>
            Today.<br />
            Recall your memories<br />
            here.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <p className="text-gray-400">
              Anisabad Patna,<br />
              India
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Phone Number</h3>
              <p className="text-gray-400">(91) 6666 666666</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Email</h3>
              <p className="text-gray-400">teamdiaryof@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-400 transition-colors"
                aria-label="Blog"
              >
                <BookOpen size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer