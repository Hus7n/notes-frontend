import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage(){
    return(
        <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-200/80">
            Get Started
            </p>
            <h1 className="mb-8 text-3xl font-semibold text-white">
                Create account
            </h1>
            <SignupForm/>
        </div>
    )
}