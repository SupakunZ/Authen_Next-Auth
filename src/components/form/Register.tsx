import * as React from 'react';
import Inputs from '../inputs/Iputs';
import { useForm, SubmitHandler } from "react-hook-form"
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn'
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';


interface IRegisterProps {
}
type Inputs = {
  example: string
  exampleRequired: string
}

//กำหนดเงื่อนไขในการกรอก Form จาก Zod
const FormSchema = z.object({
  first_name: z //กำหนดเงื่อนไขการกรอกชื่อ
    .string()
    .min(2, "First name must to be more than 2 character")
    .max(32, "First name must to be less than 32 character")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
  last_name: z //กำหนดเงื่อนไขการกรอกชื่อ
    .string()
    .min(2, "Last name must to be more than 2 character")
    .max(32, "Last name must to be less than 32 character")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
  email: z.string().email('Please fill email'),
  password: string()
    .min(6, "ไม่น้อยกว่า 6 ตัวอักษร")
    .max(12, "ไม่มากกว่า 12 ตัวอักษร"),
  ConPassword: string()
}).refine((data) => data.password === data.ConPassword, { //ตรวจสอบว่า password กับ ConPassword ตรงกันไหม
  message: 'Password dont match',
  path: ['ConPassword']
})

// กำหนด type FormSchema
type FormSchemaType = z.infer<typeof FormSchema>

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState<number>(0)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }, reset
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema) // ตรวจสอบผลลัพท์
  }) // FormSchema Zod
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/signup', values)
      reset()
      toast.success(data.message)
    } catch (error: any) {
      // console.log('error', error.response.data.message)
      toast.error(error.response.data.message)
    }
  }

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : "").score //return number score ของ password
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  // console.log(passwordScore)

  return (
    <>
      <h1>Register Form</h1>
      <div className='w-full px-12 py-4'>
        <form className='my-8 text-sm' onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            name='first_name'
            label='First name'
            type='text'
            placeholder='first name'
            register={register}
            error={errors?.first_name?.message}
            disable={isSubmitting}
          />
          <Inputs
            name='last_name'
            label='Last name'
            type='text'
            placeholder='last name'
            register={register}
            error={errors?.last_name?.message}
            disable={isSubmitting}
          />
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
          {watch().password?.length > 0 && (
            <div className='flex mt-2'>
              {
                Array.from(Array(5).keys()).map((span, i) => (
                  <span className='w-1/5 px-1' key={i}>
                    <div className={`h-2 
                      ${passwordScore <= 2
                        ? 'bg-red-500 '
                        : passwordScore < 4 ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}>
                    </div>
                  </span>
                ))
              }
            </div>
          )}
          <Inputs
            name='ConPassword'
            label='Confirm password'
            type='password'
            placeholder='confirm password'
            register={register}
            error={errors?.ConPassword?.message}
            disable={isSubmitting}
          />
          <p>You alredy have an account?<Link href={'/auth'}> Sign up</Link></p>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
