import SignUpCard from '@/components/signupcard'

export default function Signup() {
    return(
        <div className="grid grid-cols-1 h-screen w-full">
            <div className="bg-slate-50 flex flex-col justify-center">
                <SignUpCard />
            </div>
        </div>
    )
}