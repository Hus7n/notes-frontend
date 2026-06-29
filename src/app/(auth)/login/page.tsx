import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage (){
    return(
        <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-200/80">
            Welcome Back
            </p>
            <h1 className="mb-8 text-3xl font-semibold text-white">
                Sign In
            </h1>
            <LoginForm/>
        </div>
    );
}