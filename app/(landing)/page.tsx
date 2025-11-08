import Navbar from '@/components/navbar'

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className='flex justify-between max-w-6xl mx-auto py-20 gap-8'>
                <div className='w-2/5 flex flex-col gap-8 justify-center'>
                    <h1 className='text-5xl'>
                        Tell your 
                        <span className='italic text-primary'> story </span>
                        , one day at a time. Capture moments.
                    </h1>
                    <p>Record your thoughts, experiences, and memories in a chronologically organized journal.</p>
                    <button className='btn-primary'>
                        Try It Now
                    </button>
                </div>
                <div className='w-3/5 font-playfair'>

                </div>
            </div>
        </div>
    )
}

export default LandingPage