import React from "react";
import CreateRecipe from "@/components/createrecipe";
import { getSession } from "next-auth/react";

function Create({session}) {
  return (
    <div>
      <CreateRecipe session={session}/>
    </div>
  );
}


//protect route
export async function getServerSideProps({ req }){
  const session = await getSession({ req })

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


export default Create;



