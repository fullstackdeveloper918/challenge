import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../api/apiConfig'

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const first_name = useRef()
    const last_name = useRef()
    const wallet_address = useRef()
    const email = useRef()
    const password = useRef()
    const password2 = useRef(undefined)


    async function onSubmitForm(event) {
        event.preventDefault()
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            wallet_address: wallet_address.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value
        };
        localStorage.setItem('etherdatauser', JSON.stringify(data));
        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify(data))

            setLoading(false)

            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2 className="text-center mb-4">Register</h2>
        <div className="form-container p-4" style={{ backgroundColor: 'white', borderRadius: '8px',  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5), 0px 4px 8px rgba(128, 128, 128, 0.2)', }}>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label" style={{ fontWeight: 'bold' }}>First Name</label>
                    <input type="text" placeholder='Enter First Name' autoComplete='off' className='form-control' id='first_name' ref={first_name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label" style={{ fontWeight: 'bold' }}>Last Name</label>
                    <input type="text" placeholder='Enter Last Name' autoComplete='off' className='form-control' id='last_name' ref={last_name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="wallet_address" className="form-label" style={{ fontWeight: 'bold' }}>Wallet Address</label>
                    <input type="text" placeholder='Enter Wallet Address' autoComplete='off' className='form-control' id='wallet_address' ref={wallet_address} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
                    <input type="email" placeholder='Enter Email' autoComplete='off' className='form-control' id="email" ref={email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ fontWeight: 'bold' }}>Password</label>
                    <input type="password" placeholder='Enter Password' autoComplete='off' className='form-control' id="password" ref={password} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirmation" className="form-label" style={{ fontWeight: 'bold' }}>Confirm Password</label>
                    <input type="password" placeholder='Enter Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" ref={password2} />
                </div>
                <div className="text-center">
                    <button disabled={loading} className='btn btn-success w-100' type="submit" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>Register</button>
                </div>
            </form>
        </div>
    </div>
    
    )
}
