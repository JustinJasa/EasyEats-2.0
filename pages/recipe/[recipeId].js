import Recipe from '@/components/recipe'
import { useRouter } from 'next/router'
import Mainbar from '@/components/mainbar'
import MobileMenu from '@/components/mobilemenu'
import { useSession, getSession } from "next-auth/react";
import { useMediaQuery } from '@/hooks/hooks'

export default function RecipePage({session}) {
    // Getting recipe ID from URL path (pass it as props to Recipe)
    const router = useRouter()
    const recipeId = router.query.recipeId
    

    let isMobile = useMediaQuery(640)
    
    return(
        <div className='flex flex-col md:ml-52'>
            {isMobile && <MobileMenu/>}
            <Recipe recipeId={recipeId} session={session} />
        </div>
    )
}


//protect route
export async function getServerSideProps({ req }){
    const session = await getSession({ req })
  
    console.log(session)
    if(!session){
      return {
        redirect : {
          destination: '/login',
          permanent: false
        }
      }
    }
  
    return {
      props: { session }
    }
  }