import React from "react";
import { getSession } from "next-auth/react";
import EditRecipe from "@/components/editrecipe";

function Edit({session}) {
  return (
    <div>
      <EditRecipe session={session}/>
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


export default Edit;