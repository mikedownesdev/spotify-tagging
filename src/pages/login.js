import { getProviders, signIn } from 'next-auth/react'

export default function Login(props) {
    return (
        <div className='flex flex-col items-center'>
            <img className='w-52 mb-5' src='https://links.papareact.com/9xl'></img>
            {Object.values(props.providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className='p-3 bg-[#18D860] rounded-lg text-black'
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}>Sign in with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}