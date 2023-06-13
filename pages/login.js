import LoginCard from '@/components/logincard'
import loginImg from '../public/loginImg.jpg'
import FoodImage from '../public/vercel.svg'


export default function Login() {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
            <div className="flex flex-col justify-center bg-slate-50">
                <LoginCard />
            </div>

            <div className="hidden sm:block h-screen w-screen">
                <img
                    className="object-fill "
                    alt="Picture of various dishes"
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                 />
            </div>
        </div>
    )
}