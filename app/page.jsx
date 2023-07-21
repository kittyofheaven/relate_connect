import Link from 'next/link'

import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(authOptions)

    if(!session){
        redirect('/profile')  
    }


  return (
    <div>
      <div>bsimillah menang</div>

      <div> 
        <Link href='/quiz'>Quiz</Link>
      </div>

    </div>

  )
}
