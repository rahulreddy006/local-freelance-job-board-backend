import {z} from "zod";

export const registerSchema = z.object({
    name:z.string({required_error: "Name  is required"})
    .min(2,"Name must be at least 2 characters"),

    email:z.string({required_error:"Email is required"})
    .email("Invalid email format"),

    password:z.string({required_error:"Password is required"})
    .min(6,"Password must be atleast 6 characters"),

    role:z.
    enum(["student","business"] ,{
         required_error:"role is required",
         invalid_type_error:"Role must be either student or business"
    })
});

export const loginSchema = z.object({
    email:z.string({required_error:"email is required"})
    .email("Invalid email format"),
    password:z.string({required_error:"Password is required"})
    .min(6,"Password must be atleast 6 characters")

})

