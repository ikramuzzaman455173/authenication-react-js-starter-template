import  { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContex'
import { Link, useNavigate } from 'react-router-dom'

function loginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: siginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks');
  },[isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
          siginErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
              {error}
            </div>
          ))
        }
        <h1 className='text-2xl font-bold'>Login</h1>
        <form action="" onSubmit={onSubmit}
        >
          <input
            {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email' />
          {
            errors.email && (<p className='text-red-500'>Email is required</p>)
          }
          <input type="password"
            {...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='password' />
          {
            errors.password && (<p className='text-red-500'>Password is required</p>)
          }
          <button type='submit'>
            Login
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          Don't have an account? <Link to='/register'
            className='text-sky-500'>Singup</Link>
        </p>
      </div>
    </div>
  )
}

export default loginPage