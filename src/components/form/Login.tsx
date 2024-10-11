import * as React from 'react';
import Inputs from '../inputs/Iputs';
import { useForm, SubmitHandler } from "react-hook-form"
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


interface ILoginProps {
}
type Inputs = {
  example: string
  exampleRequired: string
}

//กำหนดเงื่อนไขในการกรอก Form จาก Zod
const FormSchema = z.object({
  email: z.string().email('Please fill email'),
  password: string()
    .min(6, "ไม่น้อยกว่า 6 ตัวอักษร")
    .max(12, "ไม่มากกว่า 12 ตัวอักษร"),
  ConPassword: string()
})

// กำหนด type FormSchema
type FormSchemaType = z.infer<typeof FormSchema>

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState<number>(0)
  const router = useRouter()
  const path = router.pathname; // 
  console.log(path)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema) // ตรวจสอบผลลัพท์
  }) // FormSchema Zod
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data)
  // console.log(passwordScore)

  return (
    <>
      <h1>Login Form</h1>
      <div className='w-full px-12 py-4'>
        <form className='my-8 text-sm' onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            name='email'
            label='Email'
            type='text'
            placeholder='email'
            register={register}
            error={errors?.email?.message}
            disable={isSubmitting}
          />
          <Inputs
            name='password'
            label='Password'
            type='password'
            placeholder='password'
            register={register}
            error={errors?.password?.message}
            disable={isSubmitting}
          />
          <p>You dont have an account ? {" "}
            <a className='cursor-pointer' onClick={() => router.push({
              pathname: path,
              query: {
                tab: "signup"
              }
            })}>
              Sign up
            </a>
          </p>
          <button type='submit'>Submit</button>
          <button onClick={() => toast.success('Hello')}>Test</button>
        </form>
      </div>
    </>
  );
};

export default Login;
