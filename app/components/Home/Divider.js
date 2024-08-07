import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faLaptopCode, faScaleBalanced} from "@fortawesome/free-solid-svg-icons"

function Divider() {

    const keyWordsClasses = 'flex-1 flex flex-col justify-center items-center text-center space-y-4'
    const iconContainerClasses = 'w-14 h-14 bg-cpink flex items-center justify-center rounded-xl'

  return (
    <section className="bg-slate-800 w-full flex justify-center">
        <div className='w-full max-w-1440 flex flex-col justify-around md:flex-row min-h-2/3 px-5 py-16 md:p-10 space-y-10'>
            <div className='flex-1 flex flex-col justify-center items-center md:items-start space-y-2'>
                <h2 className='text-slate-50'>Impactful Tech with Care</h2>
                <p className='font-jost text-center md:text-left text-slate-50 font-normal text-xl md:text-2xl md:font-light'>
                    Our mission is to build impactful tech, with the forethought to protect users.
                </p>
            </div>
            <div className='flex-1 flex'>
                <div className={keyWordsClasses}>
                    <div className={iconContainerClasses}>
                        <FontAwesomeIcon icon={faLock} className='text-slate-50 text-2xl md:text-3xl' />
                    </div>
                    <p className='font-jost text-slate-50 font-normal text-lg md:text-2xl'>
                        User<br />Protection
                    </p>
                </div>
                <div className={keyWordsClasses}>
                    <div className={iconContainerClasses}>
                        <FontAwesomeIcon icon={faScaleBalanced} className='text-slate-50 text-2xl md:text-3xl' />
                    </div>
                    <p className='font-jost text-slate-50 font-normal text-lg md:text-2xl'>
                        Balanced<br />Progress
                    </p>
                </div>
                <div className={keyWordsClasses}>
                    <div className={iconContainerClasses}>
                        <FontAwesomeIcon icon={faLaptopCode} className='text-slate-50 text-2xl md:text-3xl' />
                    </div>
                    <p className='font-jost text-slate-50 font-normal text-lg md:text-2xl'>
                        Responsible<br />Development
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Divider