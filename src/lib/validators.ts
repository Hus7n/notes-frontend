import { z} from "zod";

export const loginSchema = z.object({
    email : z.string().email("Enter a valid email"),
    password : z.string().min(1,"Password is required"),
});

export const signupSchema = z.object({
    email : z.string().email("Enter a valid email"),
    password : z.string().min(8,"Password must be at least 8 characters"),
    displayName : z.string().min(1,"Name is required").max(100),
});

export const shareSchema = z.object({
    email : z.string().email("Enter a valid email"),
});