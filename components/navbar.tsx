import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/logo-landscape-transparent.png'

const navLinks = [
    { name: 'Samples', href: '/' },
    { name: 'Testimonials', href: '/' },
    { name: 'Contacts', href: '/' },
    { name: 'Log In', href: '/login' },
]
const Navbar = () => {
    return (
        <div className='flex w-full justify-between items-center p-4 px-32'>
            <Link href={"/"}>
                <Image src={Logo} alt="Logo" className='h-18 w-fit' />
            </Link>
            <div className='flex gap-8 items-center'>
                {
                    navLinks.map((item, index) => (
                        <Link href={item.href} key={index} >
                            {item.name}
                        </Link>
                    ))
                }
                <Link href={"/register"} className='btn-primary'>
                    Try It Now
                </Link>
            </div>
        </div>
    )
}

export default Navbar